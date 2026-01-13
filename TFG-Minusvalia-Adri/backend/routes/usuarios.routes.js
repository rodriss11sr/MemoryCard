import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/usuarios - Obtener todos los usuarios (limitado para no exponer contraseñas)
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

// GET /api/usuarios/:id/juegos - Obtener juegos guardados por un usuario
router.get('/:id/juegos', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [juegos] = await pool.query(`
      SELECT 
        j.*,
        g.estado,
        g.horas_jugadas,
        g.fecha_agregado
      FROM juego j
      INNER JOIN guarda g ON j.id_juego = g.id_juego
      WHERE g.id_usuario = ?
      ORDER BY g.fecha_agregado DESC
    `, [id]);
    
    res.json(juegos);
  } catch (error) {
    console.error('Error al obtener juegos del usuario:', error);
    res.status(500).json({ error: 'Error al obtener los juegos del usuario' });
  }
});

// POST /api/usuarios - Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contraseña, avatar } = req.body;
    
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ error: 'Nombre, correo y contraseña son obligatorios' });
    }
    
    // Verificar si el usuario ya existe
    const [usuariosExistentes] = await pool.query(
      'SELECT id_usuario FROM usuario WHERE correo = ? OR nombre = ?',
      [correo, nombre]
    );
    
    if (usuariosExistentes.length > 0) {
      return res.status(400).json({ error: 'El correo o nombre ya está en uso' });
    }
    
    // TODO: Hashear la contraseña con bcrypt antes de guardarla
    // Por ahora la guardamos en texto plano (NO HACER EN PRODUCCIÓN)
    
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
