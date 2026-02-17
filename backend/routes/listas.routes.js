import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/listas - Obtener todas las listas públicas
router.get('/', async (req, res) => {
  try {
    const [listas] = await pool.query(`
      SELECT 
        l.*,
        u.nombre AS nombre_usuario,
        COUNT(c.id_juego) AS total_juegos
      FROM lista l
      INNER JOIN usuario u ON l.id_usuario = u.id_usuario
      LEFT JOIN contiene c ON l.id_lista = c.id_lista
      WHERE l.publica = TRUE
      GROUP BY l.id_lista
      ORDER BY l.fecha_creacion DESC
    `);
    
    res.json(listas);
  } catch (error) {
    console.error('Error al obtener listas:', error);
    res.status(500).json({ error: 'Error al obtener las listas' });
  }
});

// GET /api/listas/:id - Obtener una lista por ID (formato compatible con PHP)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [listas] = await pool.query(`
      SELECT 
        l.id_lista,
        l.nombre,
        l.descripcion,
        l.fecha_creacion,
        l.publica,
        u.id_usuario AS id_autor,
        u.nombre AS nombre_autor,
        u.avatar AS avatar_autor
      FROM lista l
      INNER JOIN usuario u ON l.id_usuario = u.id_usuario
      WHERE l.id_lista = ?
    `, [id]);
    
    if (listas.length === 0) {
      return res.status(404).json({ ok: false, message: 'Lista no encontrada' });
    }
    
    const lista = listas[0];
    
    // Obtener todos los juegos de la lista
    const [juegos] = await pool.query(`
      SELECT 
        j.id_juego,
        j.titulo AS nombre,
        j.portada AS imagen,
        j.fecha_lanzamiento,
        (SELECT AVG(nota) FROM reseña WHERE id_juego = j.id_juego) AS rating
      FROM contiene c
      INNER JOIN juego j ON c.id_juego = j.id_juego
      WHERE c.id_lista = ?
      ORDER BY c.orden ASC, c.fecha_agregado ASC
    `, [id]);
    
    // Formatear fecha
    let fechaCreacion = null;
    if (lista.fecha_creacion) {
      const date = new Date(lista.fecha_creacion);
      fechaCreacion = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    
    const juegosFormateados = juegos.map(juego => {
      let fecha = null;
      if (juego.fecha_lanzamiento) {
        const date = new Date(juego.fecha_lanzamiento);
        fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
      
      return {
        id: juego.id_juego,
        nombre: juego.nombre,
        imagen: juego.imagen,
        fecha: fecha,
        rating: juego.rating ? Math.round(juego.rating * 10) / 10 : null,
      };
    });
    
    res.json({
      ok: true,
      lista: {
        id: lista.id_lista,
        nombre: lista.nombre,
        descripcion: lista.descripcion,
        fecha_creacion: fechaCreacion,
        publica: Boolean(lista.publica),
        autor: {
          id: lista.id_autor,
          nombre: lista.nombre_autor,
          avatar: lista.avatar_autor,
        },
        juegos: juegosFormateados,
      },
    });
  } catch (error) {
    console.error('Error al obtener lista:', error);
    res.status(500).json({ ok: false, message: 'Error al obtener el detalle de la lista', detalle: error.message });
  }
});

// POST /api/listas - Crear una nueva lista (formato compatible con PHP)
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, publica, id_usuario } = req.body;
    
    if (!nombre || !id_usuario) {
      return res.status(400).json({ ok: false, message: 'Nombre e id_usuario son obligatorios' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO lista (nombre, descripcion, publica, id_usuario) VALUES (?, ?, ?, ?)',
      [nombre, descripcion || null, publica !== undefined ? publica : true, id_usuario]
    );
    
    res.json({ 
      ok: true,
      message: 'Lista creada correctamente',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error al crear lista:', error);
    res.status(500).json({ ok: false, message: 'Error al crear la lista', detalle: error.message });
  }
});

// POST /api/listas/:id/juegos - Agregar un juego a una lista (formato compatible con PHP)
router.post('/:id/juegos', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_juego, orden } = req.body;
    
    if (!id_juego) {
      return res.status(400).json({ ok: false, message: 'id_juego es obligatorio' });
    }
    
    await pool.query(
      'INSERT INTO contiene (id_lista, id_juego, orden) VALUES (?, ?, ?)',
      [id, id_juego, orden || 0]
    );
    
    res.json({ ok: true, message: 'Juego agregado a la lista exitosamente' });
  } catch (error) {
    console.error('Error al agregar juego a la lista:', error);
    res.status(500).json({ ok: false, message: 'Error al agregar el juego a la lista', detalle: error.message });
  }
});

// GET /api/listas/usuario/:id - Obtener listas de un usuario (formato compatible con PHP)
router.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [listas] = await pool.query(`
      SELECT 
        l.id_lista,
        l.nombre,
        l.descripcion,
        l.fecha_creacion,
        u.nombre AS autor
      FROM lista l
      INNER JOIN usuario u ON l.id_usuario = u.id_usuario
      WHERE l.id_usuario = ?
      ORDER BY l.fecha_creacion DESC
    `, [id]);
    
    const resultado = [];
    
    for (const lista of listas) {
      // Obtener primeros juegos de cada lista
      const [juegos] = await pool.query(`
        SELECT 
          j.id_juego,
          j.titulo AS nombre,
          j.portada AS imagen
        FROM contiene c
        INNER JOIN juego j ON c.id_juego = j.id_juego
        WHERE c.id_lista = ?
        ORDER BY c.orden, c.fecha_agregado
        LIMIT 10
      `, [lista.id_lista]);
      
      const juegosArray = juegos.map(juego => ({
        id: juego.id_juego,
        nombre: juego.nombre,
        imagen: juego.imagen,
      }));
      
      resultado.push({
        id: lista.id_lista,
        nombre: lista.nombre,
        descripcion: lista.descripcion,
        autor: lista.autor,
        juegos: juegosArray,
      });
    }
    
    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener listas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener las listas del usuario', detalle: error.message });
  }
});

export default router;
