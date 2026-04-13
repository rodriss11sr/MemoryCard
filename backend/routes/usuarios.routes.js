import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// ⚠️ IMPORTANTE: Las rutas con paths fijos (/buscar) DEBEN ir ANTES de las rutas con parámetros (/:id)
// Si no, Express interpreta "buscar" como un ID

// GET /api/usuarios/buscar - Buscar usuarios (DEBE ir ANTES de /:id)
router.get('/buscar', async (req, res) => {
  try {
    const { query, q, id_usuario_actual } = req.query;
    const searchQuery = query || q || ''; // Acepta tanto 'query' como 'q'

    if (!searchQuery) {
      return res.status(400).json({ ok: false, message: 'Query de búsqueda requerido' });
    }

    const [usuarios] = await pool.query(
      `SELECT 
        u.id_usuario,
        u.nombre,
        u.avatar,
        (SELECT COUNT(*) FROM guarda WHERE id_usuario = u.id_usuario) AS total_juegos,
        (SELECT COUNT(*) FROM sigue WHERE id_usuario_seguidor = ? AND id_usuario_seguido = u.id_usuario) AS ya_sigues
      FROM usuario u
      WHERE (u.nombre LIKE ? OR u.correo LIKE ?)
      ORDER BY u.nombre ASC
      LIMIT 20`,
      [id_usuario_actual || 0, `%${searchQuery}%`, `%${searchQuery}%`]
    );

    const usuariosFormateados = usuarios.map(user => ({
      id: user.id_usuario,
      nombre: user.nombre,
      avatar: user.avatar,
      juegos: user.total_juegos,
      ya_sigues: Boolean(user.ya_sigues),
    }));

    res.json({ ok: true, usuarios: usuariosFormateados });
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ ok: false, message: 'Error al buscar usuarios', detalle: error.message });
  }
});

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [usuarios] = await pool.query(`
      SELECT 
        id_usuario,
        nombre,
        correo,
        fecha_creacion,
        avatar
      FROM usuario
      ORDER BY nombre ASC
    `);
    
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// GET /api/usuarios/:id - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [usuarios] = await pool.query(`
      SELECT 
        id_usuario,
        nombre,
        correo,
        fecha_creacion,
        avatar
      FROM usuario
      WHERE id_usuario = ?
    `, [id]);
    
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(usuarios[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// GET /api/usuarios/:id/juegos - Obtener juegos guardados por un usuario (formato PHP)
router.get('/:id/juegos', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.query;
    
    let query = `
      SELECT 
        j.id_juego,
        j.titulo,
        j.portada,
        j.fecha_lanzamiento,
        g.estado,
        g.horas_jugadas,
        g.fecha_agregado,
        (SELECT AVG(nota) FROM reseña WHERE id_juego = j.id_juego) AS rating
      FROM guarda g
      INNER JOIN juego j ON g.id_juego = j.id_juego
      WHERE g.id_usuario = ?
    `;
    
    const params = [id];
    if (estado) {
      query += ' AND g.estado = ?';
      params.push(estado);
    }
    
    query += ' ORDER BY g.fecha_agregado DESC';
    
    const [juegos] = await pool.query(query, params);
    
    const juegosFormateados = juegos.map(row => {
      const rating = row.rating ? Math.round(row.rating * 10) / 10 : null;
      
      let fechaLanzamiento = null;
      if (row.fecha_lanzamiento) {
        const date = new Date(row.fecha_lanzamiento);
        fechaLanzamiento = date.toISOString();
      }
      
      let fechaAgregado = null;
      if (row.fecha_agregado) {
        const date = new Date(row.fecha_agregado);
        fechaAgregado = date.toISOString();
      }
      
      return {
        id: row.id_juego,
        nombre: row.titulo,
        imagen: row.portada,
        estado: row.estado,
        horas_jugadas: parseFloat(row.horas_jugadas) || 0,
        rating: rating,
        fecha_lanzamiento: fechaLanzamiento,
        fecha_agregado: fechaAgregado,
      };
    });
    
    res.json(juegosFormateados);
  } catch (error) {
    console.error('Error al obtener juegos del usuario:', error);
    res.status(500).json({ error: 'Error al obtener los juegos del usuario', detalle: error.message });
  }
});

// GET /api/usuarios/:id/wishlist - Obtener wishlist (juegos con estado "pendiente")
router.get('/:id/wishlist', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [juegos] = await pool.query(`
      SELECT 
        j.id_juego,
        j.titulo,
        j.portada,
        (SELECT AVG(nota) FROM reseña WHERE id_juego = j.id_juego) AS rating
      FROM guarda g
      INNER JOIN juego j ON g.id_juego = j.id_juego
      WHERE g.id_usuario = ? AND g.estado = 'pendiente'
      ORDER BY g.fecha_agregado DESC
    `, [id]);
    
    const juegosFormateados = juegos.map(row => {
      const rating = row.rating ? Math.round(row.rating * 10) / 10 : null;
      
      return {
        id: row.id_juego,
        nombre: row.titulo,
        imagen: row.portada,
        rating: rating,
      };
    });
    
    res.json(juegosFormateados);
  } catch (error) {
    console.error('Error al obtener wishlist:', error);
    res.status(500).json({ error: 'Error al obtener la wishlist', detalle: error.message });
  }
});

// GET /api/usuarios/:id/resenas - Obtener reseñas de un usuario
router.get('/:id/resenas', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [resenas] = await pool.query(`
      SELECT 
        r.id_reseña,
        r.id_juego,
        r.texto,
        r.nota,
        r.fecha_publicacion,
        j.titulo AS titulo_juego,
        j.portada AS portada_juego
      FROM reseña r
      INNER JOIN juego j ON r.id_juego = j.id_juego
      WHERE r.id_usuario = ?
      ORDER BY r.fecha_publicacion DESC
    `, [id]);
    
    const resenasFormateadas = resenas.map(row => {
      let fecha = null;
      if (row.fecha_publicacion) {
        const date = new Date(row.fecha_publicacion);
        fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
      
      return {
        id: row.id_reseña,
        juegoId: row.id_juego,
        titulo: row.titulo_juego,
        contenido: row.texto,
        puntuacion: row.nota !== null ? parseFloat(row.nota) : null,
        imagen: row.portada_juego,
        fecha: fecha,
      };
    });
    
    res.json(resenasFormateadas);
  } catch (error) {
    console.error('Error al obtener reseñas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener las reseñas del usuario', detalle: error.message });
  }
});

// GET /api/usuarios/:id/amigos - Obtener amigos (seguidos/seguidores)
router.get('/:id/amigos', async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo = 'siguiendo' } = req.query;
    
    let query;
    if (tipo === 'seguidores') {
      query = `
        SELECT 
          u.id_usuario,
          u.nombre,
          u.avatar,
          (SELECT COUNT(*) FROM guarda WHERE id_usuario = u.id_usuario) AS juegos
        FROM sigue s
        INNER JOIN usuario u ON s.id_usuario_seguidor = u.id_usuario
        WHERE s.id_usuario_seguido = ?
      `;
    } else {
      query = `
        SELECT 
          u.id_usuario,
          u.nombre,
          u.avatar,
          (SELECT COUNT(*) FROM guarda WHERE id_usuario = u.id_usuario) AS juegos
        FROM sigue s
        INNER JOIN usuario u ON s.id_usuario_seguido = u.id_usuario
        WHERE s.id_usuario_seguidor = ?
      `;
    }
    
    const [amigos] = await pool.query(query, [id]);
    
    const amigosFormateados = amigos.map(row => ({
      id: row.id_usuario,
      nombre: row.nombre,
      avatar: row.avatar,
      juegos: row.juegos,
    }));
    
    res.json(amigosFormateados);
  } catch (error) {
    console.error('Error al obtener amigos:', error);
    res.status(500).json({ error: 'Error al obtener los amigos', detalle: error.message });
  }
});

// POST /api/usuarios/:id/juegos - Añadir juego a la biblioteca del usuario
router.post('/:id/juegos', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_juego, estado = 'pendiente' } = req.body;
    
    if (!id_juego) {
      return res.status(400).json({ ok: false, message: 'ID de juego requerido' });
    }
    
    if (!['pendiente', 'jugando', 'completado', 'favorito', 'en_pausa'].includes(estado)) {
      return res.status(400).json({ ok: false, message: 'Estado inválido' });
    }
    
    // Verificar que el juego existe
    const [juegos] = await pool.query('SELECT id_juego FROM juego WHERE id_juego = ?', [id_juego]);
    if (juegos.length === 0) {
      return res.status(404).json({ ok: false, message: 'Juego no encontrado' });
    }
    
    // Insertar o actualizar
    await pool.query(
      `INSERT INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
       VALUES (?, ?, ?, 0)
       ON DUPLICATE KEY UPDATE estado = ?`,
      [id, id_juego, estado, estado]
    );
    
    res.json({ ok: true, message: 'Juego añadido correctamente' });
  } catch (error) {
    console.error('Error al añadir juego:', error);
    res.status(500).json({ ok: false, message: 'Error al añadir el juego', detalle: error.message });
  }
});

// DELETE /api/usuarios/:id/juegos/:idJuego - Eliminar juego de la biblioteca
router.delete('/:id/juegos/:idJuego', async (req, res) => {
  try {
    const { id, idJuego } = req.params;
    
    await pool.query(
      'DELETE FROM guarda WHERE id_usuario = ? AND id_juego = ?',
      [id, idJuego]
    );
    
    res.json({ ok: true, message: 'Juego eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    res.status(500).json({ ok: false, message: 'Error al eliminar el juego', detalle: error.message });
  }
});

// POST /api/usuarios/:id/seguir - Seguir a un usuario
router.post('/:id/seguir', async (req, res) => {
  try {
    const { id } = req.params;
    // Acepta tanto id_seguido como id_usuario_seguido (compatibilidad PHP)
    const id_seguido = req.body.id_seguido || req.body.id_usuario_seguido;
    
    if (!id_seguido) {
      return res.status(400).json({ ok: false, message: 'ID de usuario a seguir requerido' });
    }
    
    if (parseInt(id) === parseInt(id_seguido)) {
      return res.status(400).json({ ok: false, message: 'No puedes seguirte a ti mismo' });
    }
    
    // Verificar que el usuario a seguir existe
    const [usuarios] = await pool.query('SELECT id_usuario FROM usuario WHERE id_usuario = ?', [id_seguido]);
    if (usuarios.length === 0) {
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }
    
    await pool.query(
      `INSERT INTO sigue (id_usuario_seguidor, id_usuario_seguido)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE id_usuario_seguidor = id_usuario_seguidor`,
      [id, id_seguido]
    );
    
    res.json({ ok: true, message: 'Usuario seguido correctamente' });
  } catch (error) {
    console.error('Error al seguir usuario:', error);
    res.status(500).json({ ok: false, message: 'Error al seguir al usuario', detalle: error.message });
  }
});

// DELETE /api/usuarios/:id/seguir/:idSeguido - Dejar de seguir a un usuario
router.delete('/:id/seguir/:idSeguido', async (req, res) => {
  try {
    const { id, idSeguido } = req.params;
    
    await pool.query(
      'DELETE FROM sigue WHERE id_usuario_seguidor = ? AND id_usuario_seguido = ?',
      [id, idSeguido]
    );
    
    res.json({ ok: true, message: 'Dejaste de seguir al usuario' });
  } catch (error) {
    console.error('Error al dejar de seguir usuario:', error);
    res.status(500).json({ ok: false, message: 'Error al dejar de seguir al usuario', detalle: error.message });
  }
});

// PUT /api/usuarios/:id/avatar - Actualizar avatar del usuario
router.put('/:id/avatar', async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;
    
    if (!avatar) {
      return res.status(400).json({ ok: false, message: 'URL de avatar requerida' });
    }
    
    await pool.query(
      'UPDATE usuario SET avatar = ? WHERE id_usuario = ?',
      [avatar, id]
    );
    
    res.json({ ok: true, message: 'Avatar actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar avatar:', error);
    res.status(500).json({ ok: false, message: 'Error al actualizar el avatar', detalle: error.message });
  }
});

// POST /api/usuarios - Crear un nuevo usuario (por si se usa directamente)
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contraseña, avatar } = req.body;
    
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ error: 'Nombre, correo y contraseña son obligatorios' });
    }
    
    const [usuariosExistentes] = await pool.query(
      'SELECT id_usuario FROM usuario WHERE correo = ? OR nombre = ?',
      [correo, nombre]
    );
    
    if (usuariosExistentes.length > 0) {
      return res.status(400).json({ error: 'El correo o nombre ya está en uso' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO usuario (nombre, correo, contraseña, avatar) VALUES (?, ?, ?, ?)',
      [nombre, correo, contraseña, avatar || null]
    );
    
    res.status(201).json({ 
      message: 'Usuario creado exitosamente',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

export default router;
