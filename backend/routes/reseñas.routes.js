import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/reseñas - Obtener todas las reseñas (formato compatible con PHP)
router.get('/', async (req, res) => {
  try {
    const { id_juego } = req.query;
    
    let reseñas;
    try {
      if (id_juego) {
        [reseñas] = await pool.query(
          'SELECT * FROM vista_reseñas_completas WHERE id_juego = ? ORDER BY fecha_publicacion DESC',
          [id_juego]
        );
      } else {
        [reseñas] = await pool.query('SELECT * FROM vista_reseñas_completas ORDER BY fecha_publicacion DESC');
      }
    } catch (error) {
      // Si la vista no existe, usar consulta directa
      if (id_juego) {
        [reseñas] = await pool.query(`
          SELECT 
            r.id_reseña,
            r.id_juego,
            r.texto,
            r.nota,
            r.fecha_publicacion,
            r.likes,
            u.id_usuario AS id_usuario,
            u.nombre AS nombre_usuario,
            u.avatar AS avatar_usuario,
            j.titulo AS titulo_juego,
            j.portada AS portada_juego
          FROM reseña r
          INNER JOIN usuario u ON r.id_usuario = u.id_usuario
          INNER JOIN juego j ON r.id_juego = j.id_juego
          WHERE r.id_juego = ?
          ORDER BY r.fecha_publicacion DESC
        `, [id_juego]);
      } else {
        [reseñas] = await pool.query(`
          SELECT 
            r.id_reseña,
            r.id_juego,
            r.texto,
            r.nota,
            r.fecha_publicacion,
            r.likes,
            u.id_usuario AS id_usuario,
            u.nombre AS nombre_usuario,
            u.avatar AS avatar_usuario,
            j.titulo AS titulo_juego,
            j.portada AS portada_juego
          FROM reseña r
          INNER JOIN usuario u ON r.id_usuario = u.id_usuario
          INNER JOIN juego j ON r.id_juego = j.id_juego
          ORDER BY r.fecha_publicacion DESC
        `);
      }
    }

    // Formatear para que coincida con el formato PHP
    const reseñasFormateadas = reseñas.map(row => {
      let fecha = null;
      if (row.fecha_publicacion) {
        const date = new Date(row.fecha_publicacion);
        fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }

      return {
        id: row.id_reseña,
        juegoId: row.id_juego,
        id_usuario: row.id_usuario || null,
        usuario: row.nombre_usuario || null,
        avatar: row.avatar_usuario || null,
        titulo: row.titulo_juego || null,
        contenido: row.texto || '',
        puntuacion: row.nota !== null ? parseFloat(row.nota) : null,
        imagen: row.portada_juego || null,
        likes: row.likes || 0,
        fecha: fecha,
      };
    });
    
    res.json(reseñasFormateadas);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error al obtener las reseñas', detalle: error.message });
  }
});

// GET /api/resenas/populares - Obtener reseñas populares (más likes)
router.get('/populares', async (req, res) => {
  try {
    const [reseñas] = await pool.query(`
      SELECT 
        r.id_reseña,
        r.id_juego,
        r.texto,
        r.nota,
        r.fecha_publicacion,
        r.likes,
        u.nombre AS nombre_usuario,
        u.avatar AS avatar_usuario,
        u.id_usuario,
        j.titulo AS titulo_juego,
        j.portada AS portada_juego
      FROM reseña r
      INNER JOIN usuario u ON r.id_usuario = u.id_usuario
      INNER JOIN juego j ON r.id_juego = j.id_juego
      ORDER BY r.likes DESC, r.fecha_publicacion DESC
      LIMIT 20
    `);

    const reseñasFormateadas = reseñas.map(row => {
      let fecha = null;
      if (row.fecha_publicacion) {
        const date = new Date(row.fecha_publicacion);
        fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
      return {
        id: row.id_reseña,
        juegoId: row.id_juego,
        id_usuario: row.id_usuario,
        usuario: row.nombre_usuario || null,
        usuarioId: row.id_usuario,
        avatar: row.avatar_usuario || null,
        titulo: row.titulo_juego || null,
        contenido: row.texto || '',
        puntuacion: row.nota !== null ? parseFloat(row.nota) : null,
        imagen: row.portada_juego || null,
        likes: row.likes || 0,
        fecha: fecha,
      };
    });

    res.json(reseñasFormateadas);
  } catch (error) {
    console.error('Error al obtener reseñas populares:', error);
    res.status(500).json({ error: 'Error al obtener reseñas populares' });
  }
});

// GET /api/reseñas/:id - Obtener una reseña por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [reseñas] = await pool.query(`
      SELECT 
        r.*,
        u.nombre AS nombre_usuario,
        u.avatar AS avatar_usuario,
        j.titulo AS titulo_juego,
        j.portada AS portada_juego
      FROM reseña r
      INNER JOIN usuario u ON r.id_usuario = u.id_usuario
      INNER JOIN juego j ON r.id_juego = j.id_juego
      WHERE r.id_reseña = ?
    `, [id]);
    
    if (reseñas.length === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    
    res.json(reseñas[0]);
  } catch (error) {
    console.error('Error al obtener reseña:', error);
    res.status(500).json({ error: 'Error al obtener la reseña' });
  }
});

// POST /api/reseñas - Crear o actualizar una reseña (formato compatible con PHP)
router.post('/', async (req, res) => {
  try {
    const { texto, nota, spoilers, id_usuario, id_juego } = req.body;
    
    if (!id_usuario || !id_juego) {
      return res.status(400).json({ ok: false, message: 'Usuario y juego son obligatorios' });
    }

    if (nota !== null && nota !== undefined && (nota < 0 || nota > 10)) {
      return res.status(400).json({ ok: false, message: 'La nota debe estar entre 0 y 10' });
    }
    
    // Verificar si el usuario ya tiene una reseña para este juego
    const [reseñasExistentes] = await pool.query(
      'SELECT id_reseña FROM reseña WHERE id_usuario = ? AND id_juego = ?',
      [id_usuario, id_juego]
    );
    
    if (reseñasExistentes.length > 0) {
      // Actualizar reseña existente
      await pool.query(
        'UPDATE reseña SET texto = ?, nota = ?, spoilers = ? WHERE id_usuario = ? AND id_juego = ?',
        [texto || '', nota || null, spoilers || false, id_usuario, id_juego]
      );
      
      return res.json({ 
        ok: true,
        message: 'Reseña actualizada correctamente'
      });
    } else {
      // Crear nueva reseña
      const [result] = await pool.query(
        'INSERT INTO reseña (texto, nota, spoilers, id_usuario, id_juego) VALUES (?, ?, ?, ?, ?)',
        [texto || '', nota || null, spoilers || false, id_usuario, id_juego]
      );
      
      return res.json({ 
        ok: true,
        message: 'Reseña creada correctamente'
      });
    }
  } catch (error) {
    console.error('Error al crear/actualizar reseña:', error);
    res.status(500).json({ ok: false, message: 'Error al crear/actualizar la reseña', detalle: error.message });
  }
});

// PUT /api/reseñas/:id/like - Dar like a una reseña
router.put('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query(
      'UPDATE reseña SET likes = likes + 1 WHERE id_reseña = ?',
      [id]
    );
    
    res.json({ ok: true, message: 'Like agregado exitosamente' });
  } catch (error) {
    console.error('Error al dar like:', error);
    res.status(500).json({ error: 'Error al dar like' });
  }
});

// PUT /api/reseñas/:id/unlike - Quitar like de una reseña
router.put('/:id/unlike', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query(
      'UPDATE reseña SET likes = GREATEST(likes - 1, 0) WHERE id_reseña = ?',
      [id]
    );
    
    res.json({ ok: true, message: 'Like eliminado exitosamente' });
  } catch (error) {
    console.error('Error al quitar like:', error);
    res.status(500).json({ error: 'Error al quitar like' });
  }
});

export default router;
