import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/reseñas - Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
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
      ORDER BY r.fecha_publicacion DESC
    `);
    
    res.json(reseñas);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error al obtener las reseñas' });
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

// POST /api/reseñas - Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const { texto, nota, spoilers, id_usuario, id_juego } = req.body;
    
    if (!texto || !id_usuario || !id_juego) {
      return res.status(400).json({ error: 'Texto, id_usuario e id_juego son obligatorios' });
    }
    
    // Verificar si el usuario ya tiene una reseña para este juego
    const [reseñasExistentes] = await pool.query(
      'SELECT id_reseña FROM reseña WHERE id_usuario = ? AND id_juego = ?',
      [id_usuario, id_juego]
    );
    
    if (reseñasExistentes.length > 0) {
      return res.status(400).json({ error: 'Ya existe una reseña de este usuario para este juego' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO reseña (texto, nota, spoilers, id_usuario, id_juego) VALUES (?, ?, ?, ?, ?)',
      [texto, nota || null, spoilers || false, id_usuario, id_juego]
    );
    
    res.status(201).json({ 
      message: 'Reseña creada exitosamente',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ error: 'Error al crear la reseña' });
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
    
    res.json({ message: 'Like agregado exitosamente' });
  } catch (error) {
    console.error('Error al dar like:', error);
    res.status(500).json({ error: 'Error al dar like' });
  }
});

export default router;
