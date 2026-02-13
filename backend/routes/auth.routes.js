import express from 'express';
import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST /api/auth/login - Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Faltan correo o contraseña' });
    }

    const [users] = await pool.query(
      'SELECT id_usuario, nombre, correo, contraseña, avatar FROM usuario WHERE correo = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ ok: false, message: 'Credenciales incorrectas' });
    }

    const user = users[0];

    // Verificar contraseña
    // PHP usa $2y$ como prefijo de bcrypt, bcryptjs espera $2a$ o $2b$
    // Reemplazamos $2y$ por $2a$ para compatibilidad
    let hashToCompare = user.contraseña;
    if (hashToCompare && hashToCompare.startsWith('$2y$')) {
      hashToCompare = '$2a$' + hashToCompare.substring(4);
    }
    const passwordMatch = await bcrypt.compare(password, hashToCompare);

    if (!passwordMatch) {
      return res.status(401).json({ ok: false, message: 'Credenciales incorrectas' });
    }

    res.json({
      ok: true,
      message: 'Login correcto',
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ ok: false, message: 'Error al iniciar sesión', detalle: error.message });
  }
});

// POST /api/auth/register - Registrar nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, nombre } = req.body;

    if (!email || !password || !nombre) {
      return res.status(400).json({ ok: false, message: 'Faltan datos requeridos' });
    }

    // Verificar si el usuario ya existe
    const [existingUsers] = await pool.query(
      'SELECT id_usuario FROM usuario WHERE correo = ? OR nombre = ?',
      [email, nombre]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ ok: false, message: 'El correo o nombre ya está en uso' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
    const [result] = await pool.query(
      'INSERT INTO usuario (nombre, correo, contraseña) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );

    res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      user: {
        id: result.insertId,
        nombre: nombre,
        correo: email,
        avatar: null,
      },
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ ok: false, message: 'Error al registrar usuario', detalle: error.message });
  }
});

export default router;
