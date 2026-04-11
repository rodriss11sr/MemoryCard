import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/home - Devuelve los 10 juegos más recientes y las 10 últimas reseñas
router.get('/', async (req, res) => {
  try {
    const gamesLimit = 10;
    const reviewsLimit = 10;

    // Juegos: intentar usar la vista, si no existe usar consulta
    let juegos;
    try {
      [juegos] = await pool.query('SELECT * FROM vista_juegos_completos ORDER BY fecha_lanzamiento DESC LIMIT ?', [gamesLimit]);
    } catch (err) {
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
        ORDER BY j.fecha_lanzamiento DESC
        LIMIT ?
      `, [gamesLimit]);
    }

    // Formatear juegos al mismo formato que /api/juegos
    const juegosFormateados = juegos.map(row => {
      let fecha = null;
      if (row.fecha_lanzamiento) {
        const date = new Date(row.fecha_lanzamiento);
        fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
      const plataformas = row.plataformas ? row.plataformas.split(', ').map(p => p.trim()) : [];
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

    // Reseñas: intentar usar la vista
    let reseñas;
    try {
      [reseñas] = await pool.query('SELECT * FROM vista_reseñas_completas ORDER BY fecha_publicacion DESC LIMIT ?', [reviewsLimit]);
    } catch (err) {
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
        LIMIT ?
      `, [reviewsLimit]);
    }

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

    // Devolver ambos conjuntos
    res.json({ juegos: juegosFormateados, reviews: reseñasFormateadas });
  } catch (error) {
    console.error('Error al obtener datos de home:', error);
    res.status(500).json({ error: 'Error al obtener datos de home', detalle: error.message });
  }
});

export default router;
