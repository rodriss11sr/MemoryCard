import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/juegos - Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const [juegos] = await pool.query(`
      SELECT 
        j.*,
        GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') AS plataformas,
        GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ') AS generos,
        GROUP_CONCAT(DISTINCT d.nombre SEPARATOR ', ') AS desarrolladoras
      FROM juego j
      LEFT JOIN lanza l ON j.id_juego = l.id_juego
      LEFT JOIN plataforma p ON l.nombre_plataforma = p.nombre
      LEFT JOIN pertenece pe ON j.id_juego = pe.id_juego
      LEFT JOIN genero g ON pe.nombre_genero = g.nombre
      LEFT JOIN desarrolla de ON j.id_juego = de.id_juego
      LEFT JOIN desarrolladora d ON de.nombre_desarrolladora = d.nombre
      GROUP BY j.id_juego
      ORDER BY j.titulo ASC
    `);
    
    res.json(juegos);
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
});

// GET /api/juegos/:id - Obtener un juego por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [juegos] = await pool.query(`
      SELECT 
        j.*,
        GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') AS plataformas,
        GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ') AS generos,
        GROUP_CONCAT(DISTINCT d.nombre SEPARATOR ', ') AS desarrolladoras
      FROM juego j
      LEFT JOIN lanza l ON j.id_juego = l.id_juego
      LEFT JOIN plataforma p ON l.nombre_plataforma = p.nombre
      LEFT JOIN pertenece pe ON j.id_juego = pe.id_juego
      LEFT JOIN genero g ON pe.nombre_genero = g.nombre
      LEFT JOIN desarrolla de ON j.id_juego = de.id_juego
      LEFT JOIN desarrolladora d ON de.nombre_desarrolladora = d.nombre
      WHERE j.id_juego = ?
      GROUP BY j.id_juego
    `, [id]);
    
    if (juegos.length === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    
    res.json(juegos[0]);
  } catch (error) {
    console.error('Error al obtener juego:', error);
    res.status(500).json({ error: 'Error al obtener el juego' });
  }
});

// POST /api/juegos - Crear un nuevo juego
router.post('/', async (req, res) => {
  try {
    const { titulo, fecha_lanzamiento, descripcion, portada, plataformas, generos, desarrolladoras } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }
    
    // Insertar el juego
    const [result] = await pool.query(
      'INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (?, ?, ?, ?)',
      [titulo, fecha_lanzamiento || null, descripcion || null, portada || null]
    );
    
    const idJuego = result.insertId;
    
    // Insertar plataformas
    if (plataformas && plataformas.length > 0) {
      const valoresPlataformas = plataformas.map(p => [idJuego, p]);
      await pool.query(
        'INSERT INTO lanza (id_juego, nombre_plataforma) VALUES ?',
        [valoresPlataformas]
      );
    }
    
    // Insertar géneros
    if (generos && generos.length > 0) {
      const valoresGeneros = generos.map(g => [idJuego, g]);
      await pool.query(
        'INSERT INTO pertenece (id_juego, nombre_genero) VALUES ?',
        [valoresGeneros]
      );
    }
    
    // Insertar desarrolladoras
    if (desarrolladoras && desarrolladoras.length > 0) {
      const valoresDesarrolladoras = desarrolladoras.map(d => [idJuego, d]);
      await pool.query(
        'INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES ?',
        [valoresDesarrolladoras]
      );
    }
    
    res.status(201).json({ 
      message: 'Juego creado exitosamente',
      id: idJuego 
    });
  } catch (error) {
    console.error('Error al crear juego:', error);
    res.status(500).json({ error: 'Error al crear el juego' });
  }
});

// GET /api/juegos/:id/reseñas - Obtener reseñas de un juego
router.get('/:id/reseñas', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [reseñas] = await pool.query(`
      SELECT 
        r.*,
        u.nombre AS nombre_usuario,
        u.avatar AS avatar_usuario
      FROM reseña r
      INNER JOIN usuario u ON r.id_usuario = u.id_usuario
      WHERE r.id_juego = ?
      ORDER BY r.fecha_publicacion DESC
    `, [id]);
    
    res.json(reseñas);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error al obtener las reseñas' });
  }
});

export default router;
