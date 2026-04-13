import express from 'express';
import crypto from 'crypto';
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

    // Debug: ver qué hash se está leyendo de la BD
    console.log('🔐 Login intento:', {
      email,
      hashPrefix: hashToCompare ? hashToCompare.substring(0, 7) : 'NULL/UNDEFINED',
      hashLength: hashToCompare ? hashToCompare.length : 0
    });

    if (!hashToCompare) {
      return res.status(401).json({ ok: false, message: 'Credenciales incorrectas' });
    }

    if (hashToCompare.startsWith('$2y$')) {
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

// POST /api/auth/forgot-password - Solicitar recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ ok: false, message: 'El correo es obligatorio' });
    }

    // Buscar usuario por correo
    const [users] = await pool.query(
      'SELECT id_usuario, nombre, correo FROM usuario WHERE correo = ?',
      [email]
    );

    // Por seguridad, siempre respondemos lo mismo (no revelamos si el email existe)
    if (users.length === 0) {
      return res.json({ ok: true, message: 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña' });
    }

    const user = users[0];

    // Eliminar tokens anteriores de este usuario
    await pool.query('DELETE FROM password_reset_tokens WHERE id_usuario = ?', [user.id_usuario]);

    // Generar token aleatorio
    const token = crypto.randomBytes(32).toString('hex');

    // Guardar token con expiración de 1 hora
    const expiracion = new Date(Date.now() + 60 * 60 * 1000);
    await pool.query(
      'INSERT INTO password_reset_tokens (id_usuario, token, fecha_expiracion) VALUES (?, ?, ?)',
      [user.id_usuario, token, expiracion]
    );

    // Generar enlace de recuperación
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // Mostrar en consola (para desarrollo/TFG)
    console.log('===========================================');
    console.log('🔑 ENLACE DE RECUPERACIÓN DE CONTRASEÑA:');
    console.log(`   Usuario: ${user.nombre} (${user.correo})`);
    console.log(`   Enlace: ${resetLink}`);
    console.log('===========================================');

    res.json({
      ok: true,
      message: 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña',
      // Solo para desarrollo/TFG - en producción NO incluir esto:
      dev_reset_link: resetLink
    });
  } catch (error) {
    console.error('Error en forgot-password:', error);
    res.status(500).json({ ok: false, message: 'Error al procesar la solicitud' });
  }
});

// POST /api/auth/reset-password - Cambiar contraseña con token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ ok: false, message: 'Token y contraseña son obligatorios' });
    }

    // Buscar token válido (no expirado)
    const [tokens] = await pool.query(
      'SELECT * FROM password_reset_tokens WHERE token = ? AND fecha_expiracion > NOW()',
      [token]
    );

    if (tokens.length === 0) {
      return res.status(400).json({ ok: false, message: 'El enlace ha expirado o no es válido' });
    }

    const resetToken = tokens[0];

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar contraseña del usuario (backticks en contraseña por seguridad con ñ)
    const [updateResult] = await pool.query(
      'UPDATE usuario SET `contraseña` = ? WHERE id_usuario = ?',
      [hashedPassword, resetToken.id_usuario]
    );

    console.log('🔄 Resultado UPDATE contraseña:', {
      affectedRows: updateResult.affectedRows,
      changedRows: updateResult.changedRows,
      id_usuario: resetToken.id_usuario
    });

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({ ok: false, message: 'No se pudo actualizar la contraseña' });
    }

    // Eliminar el token usado
    await pool.query('DELETE FROM password_reset_tokens WHERE id_usuario = ?', [resetToken.id_usuario]);

    console.log('✅ Contraseña actualizada correctamente para usuario ID:', resetToken.id_usuario);

    res.json({ ok: true, message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error en reset-password:', error);
    res.status(500).json({ ok: false, message: 'Error al cambiar la contraseña' });
  }
});

export default router;
