import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import juegosRoutes from './routes/juegos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import listasRoutes from './routes/listas.routes.js';
import reseñasRoutes from './routes/reseñas.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Para parsear JSON en las peticiones
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/juegos', juegosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/listas', listasRoutes);
app.use('/api/reseñas', reseñasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🎮 GameBoxd API está funcionando!',
    version: '1.0.0',
    endpoints: {
      juegos: '/api/juegos',
      usuarios: '/api/usuarios',
      listas: '/api/listas',
      reseñas: '/api/reseñas'
    }
  });
});

// Ruta de salud
app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({
    status: 'ok',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  await testConnection();
});
