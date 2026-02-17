import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/perfil/:id - Obtener perfil de usuario con estadísticas
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const idUsuario = parseInt(id);

    if (idUsuario <= 0) {
      return res.status(400).json({ ok: false, message: 'ID de usuario requerido' });
    }

    // Obtener datos del usuario
    const [users] = await pool.query(
      'SELECT id_usuario, nombre, correo, fecha_creacion, avatar FROM usuario WHERE id_usuario = ?',
      [idUsuario]
    );

    if (users.length === 0) {
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }

    const user = users[0];

    // Formatear fecha
    let fecha = null;
    if (user.fecha_creacion) {
      const date = new Date(user.fecha_creacion);
      fecha = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    // Contar estadísticas
    const [juegosCount] = await pool.query('SELECT COUNT(*) as total FROM guarda WHERE id_usuario = ?', [idUsuario]);
    const [reseñasCount] = await pool.query('SELECT COUNT(*) as total FROM reseña WHERE id_usuario = ?', [idUsuario]);
    const [listasCount] = await pool.query('SELECT COUNT(*) as total FROM lista WHERE id_usuario = ?', [idUsuario]);
    const [seguidoresCount] = await pool.query('SELECT COUNT(*) as total FROM sigue WHERE id_usuario_seguido = ?', [idUsuario]);
    const [siguiendoCount] = await pool.query('SELECT COUNT(*) as total FROM sigue WHERE id_usuario_seguidor = ?', [idUsuario]);

    const stats = {
      juegos: juegosCount[0].total,
      reseñas: reseñasCount[0].total,
      listas: listasCount[0].total,
      seguidores: seguidoresCount[0].total,
      siguiendo: siguiendoCount[0].total,
    };

    res.json({
      ok: true,
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        avatar: user.avatar,
        fecha_creacion: fecha,
      },
      stats: stats,
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ ok: false, message: 'Error al obtener el perfil', detalle: error.message });
  }
});

export default router;
