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

// GET /api/listas/:id - Obtener una lista por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [listas] = await pool.query(`
      SELECT 
        l.*,
        u.nombre AS nombre_usuario,
        u.avatar AS avatar_usuario
      FROM lista l
      INNER JOIN usuario u ON l.id_usuario = u.id_usuario
      WHERE l.id_lista = ?
    `, [id]);
    
    if (listas.length === 0) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }
    
    // Obtener los juegos de la lista
    const [juegos] = await pool.query(`
      SELECT 
        j.*,
        c.orden,
        c.fecha_agregado
      FROM juego j
      INNER JOIN contiene c ON j.id_juego = c.id_juego
      WHERE c.id_lista = ?
      ORDER BY c.orden ASC, c.fecha_agregado ASC
    `, [id]);
    
    res.json({
      ...listas[0],
      juegos
    });
  } catch (error) {
    console.error('Error al obtener lista:', error);
    res.status(500).json({ error: 'Error al obtener la lista' });
  }
});

// POST /api/listas - Crear una nueva lista
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, publica, id_usuario } = req.body;
    
    if (!nombre || !id_usuario) {
      return res.status(400).json({ error: 'Nombre e id_usuario son obligatorios' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO lista (nombre, descripcion, publica, id_usuario) VALUES (?, ?, ?, ?)',
      [nombre, descripcion || null, publica !== undefined ? publica : true, id_usuario]
    );
    
    res.status(201).json({ 
      message: 'Lista creada exitosamente',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error al crear lista:', error);
    res.status(500).json({ error: 'Error al crear la lista' });
  }
});

// POST /api/listas/:id/juegos - Agregar un juego a una lista
router.post('/:id/juegos', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_juego, orden } = req.body;
    
    if (!id_juego) {
      return res.status(400).json({ error: 'id_juego es obligatorio' });
    }
    
    await pool.query(
      'INSERT INTO contiene (id_lista, id_juego, orden) VALUES (?, ?, ?)',
      [id, id_juego, orden || 0]
    );
    
    res.status(201).json({ message: 'Juego agregado a la lista exitosamente' });
  } catch (error) {
    console.error('Error al agregar juego a la lista:', error);
    res.status(500).json({ error: 'Error al agregar el juego a la lista' });
  }
});

export default router;
