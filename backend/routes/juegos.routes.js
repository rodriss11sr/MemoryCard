import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/juegos - Obtener todos los juegos (formato compatible con PHP)
router.get('/', async (req, res) => {
  try {
    // Intentar usar la vista primero
    let juegos;
    try {
      [juegos] = await pool.query('SELECT * FROM vista_juegos_completos ORDER BY titulo ASC');
    } catch (error) {
      // Si la vista no existe, usar consulta directa
      [juegos] = await pool.query(`
        SELECT 
          j.*,
          GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') AS plataformas,
          GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ') AS generos,
          GROUP_CONCAT(DISTINCT d.nombre SEPARATOR ', ') AS desarrolladoras,
          (SELECT AVG(nota) FROM reseña WHERE id_juego = j.id_juego) AS nota_promedio
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
    }

    // Formatear para que coincida con el formato PHP
    const juegosFormateados = juegos.map(row => {
      // Formatear fecha
      let fecha = null;
      if (row.fecha_lanzamiento) {
        const date = new Date(row.fecha_lanzamiento);
        fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }

      // Plataformas como array
      const plataformas = row.plataformas ? row.plataformas.split(', ').map(p => p.trim()) : [];

      // Rating
      const rating = row.nota_promedio ? Math.round(row.nota_promedio * 10) / 10 : null;

      return {
        id: row.id_juego,
        titulo: row.titulo,
        imagen: row.portada,
        fecha: fecha,
        plataforma: plataformas,
        desarrollador: row.desarrolladoras || null,
        genero: row.generos || null,
        descripcion: row.descripcion || null,
        rating: rating,
      };
    });

    res.json(juegosFormateados);
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    res.status(500).json({ error: 'Error al obtener los juegos', detalle: error.message });
  }
});

// GET /api/juegos/buscar?q=texto - Buscar juegos por título
router.get('/buscar', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    const [juegos] = await pool.query(`
      SELECT 
        j.id_juego,
        j.titulo,
        j.portada,
        j.fecha_lanzamiento,
        (SELECT AVG(nota) FROM reseña WHERE id_juego = j.id_juego) AS nota_promedio
      FROM juego j
      WHERE j.titulo LIKE ?
      ORDER BY j.titulo ASC
      LIMIT 10
    `, [`%${q.trim()}%`]);

    const resultados = juegos.map(row => ({
      id: row.id_juego,
      titulo: row.titulo,
      imagen: row.portada,
      rating: row.nota_promedio ? Math.round(row.nota_promedio * 10) / 10 : null,
    }));

    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar juegos:', error);
    res.status(500).json({ error: 'Error al buscar juegos', detalle: error.message });
  }
});

// GET /api/juegos/:id/relacionados - Obtener juegos relacionados por género
router.get('/:id/relacionados', async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Obtener los géneros del juego actual
    const [generos] = await pool.query(
      'SELECT nombre_genero FROM pertenece WHERE id_juego = ?',
      [id]
    );

    if (generos.length === 0) {
      // Si no tiene géneros, devolver juegos aleatorios (excepto el actual)
      const [aleatorios] = await pool.query(`
        SELECT j.id_juego, j.titulo, j.portada
        FROM juego j
        WHERE j.id_juego != ?
        ORDER BY RAND()
        LIMIT 10
      `, [id]);

      return res.json(aleatorios.map(r => ({
        id: r.id_juego,
        nombre: r.titulo,
        imagen: r.portada,
      })));
    }

    // 2. Buscar juegos que compartan al menos un género, excluyendo el actual
    const nombresGeneros = generos.map(g => g.nombre_genero);
    const placeholders = nombresGeneros.map(() => '?').join(',');

    const [relacionados] = await pool.query(`
      SELECT j.id_juego, j.titulo, j.portada, COUNT(*) AS coincidencias
      FROM juego j
      INNER JOIN pertenece p ON j.id_juego = p.id_juego
      WHERE p.nombre_genero IN (${placeholders})
        AND j.id_juego != ?
      GROUP BY j.id_juego
      ORDER BY coincidencias DESC, RAND()
      LIMIT 12
    `, [...nombresGeneros, id]);

    res.json(relacionados.map(r => ({
      id: r.id_juego,
      nombre: r.titulo,
      imagen: r.portada,
    })));
  } catch (error) {
    console.error('Error al obtener juegos relacionados:', error);
    res.status(500).json({ error: 'Error al obtener juegos relacionados' });
  }
});

// GET /api/juegos/:id - Obtener un juego por ID (formato compatible con PHP)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    let juego;
    try {
      [juego] = await pool.query('SELECT * FROM vista_juegos_completos WHERE id_juego = ?', [id]);
    } catch (error) {
      // Si la vista no existe, usar consulta directa
      [juego] = await pool.query(`
        SELECT 
          j.*,
          GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') AS plataformas,
          GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ') AS generos,
          GROUP_CONCAT(DISTINCT d.nombre SEPARATOR ', ') AS desarrolladoras,
          (SELECT AVG(nota) FROM reseña WHERE id_juego = j.id_juego) AS nota_promedio
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
    }
    
    if (juego.length === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    const row = juego[0];

    // Formatear fecha
    let fecha = null;
    if (row.fecha_lanzamiento) {
      const date = new Date(row.fecha_lanzamiento);
      fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    // Plataformas como array
    const plataformas = row.plataformas ? row.plataformas.split(', ').map(p => p.trim()) : [];

    // Rating
    const rating = row.nota_promedio ? Math.round(row.nota_promedio * 10) / 10 : null;

    res.json({
      id: row.id_juego,
      titulo: row.titulo,
      imagen: row.portada,
      fecha: fecha,
      plataforma: plataformas,
      desarrollador: row.desarrolladoras || null,
      genero: row.generos || null,
      descripcion: row.descripcion || null,
      rating: rating,
    });
  } catch (error) {
    console.error('Error al obtener juego:', error);
    res.status(500).json({ error: 'Error al obtener el juego', detalle: error.message });
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
