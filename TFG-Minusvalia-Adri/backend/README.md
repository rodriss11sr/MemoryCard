# 🎮 GameBoxd Backend API

Backend REST API para la aplicación GameBoxd (tipo Letterboxd para videojuegos).

## 🚀 Instalación

1. **Instalar dependencias:**
```bash
cd backend
npm install
```

2. **Configurar variables de entorno:**
   - Copia `.env.example` a `.env`
   - Ajusta los valores según tu configuración de MySQL:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=tu_contraseña
     DB_NAME=gameboxd
     DB_PORT=3306
     ```

3. **Iniciar el servidor:**
```bash
npm start
# o para desarrollo con auto-reload:
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📡 Endpoints Disponibles

### Juegos
- `GET /api/juegos` - Obtener todos los juegos
- `GET /api/juegos/:id` - Obtener un juego por ID
- `POST /api/juegos` - Crear un nuevo juego
- `GET /api/juegos/:id/reseñas` - Obtener reseñas de un juego

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario
- `GET /api/usuarios/:id/juegos` - Obtener juegos guardados por un usuario

### Listas
- `GET /api/listas` - Obtener todas las listas públicas
- `GET /api/listas/:id` - Obtener una lista por ID (con sus juegos)
- `POST /api/listas` - Crear una nueva lista
- `POST /api/listas/:id/juegos` - Agregar un juego a una lista

### Reseñas
- `GET /api/reseñas` - Obtener todas las reseñas
- `GET /api/reseñas/:id` - Obtener una reseña por ID
- `POST /api/reseñas` - Crear una nueva reseña
- `PUT /api/reseñas/:id/like` - Dar like a una reseña

### Utilidades
- `GET /` - Información de la API
- `GET /api/health` - Estado de la API y conexión a BD

## 🧪 Probar la API

Puedes probar los endpoints con:
- **Postman**
- **Thunder Client** (extensión de VS Code)
- **curl** desde la terminal
- **Tu aplicación React**

### Ejemplo con curl:
```bash
# Obtener todos los juegos
curl http://localhost:3000/api/juegos

# Obtener un juego específico
curl http://localhost:3000/api/juegos/1

# Crear un nuevo juego
curl -X POST http://localhost:3000/api/juegos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "The Legend of Zelda: Breath of the Wild",
    "fecha_lanzamiento": "2017-03-03",
    "descripcion": "Un juego de aventura épico",
    "plataformas": ["Nintendo Switch", "Wii U"],
    "generos": ["Aventura", "RPG"],
    "desarrolladoras": ["Nintendo"]
  }'
```

## 🔒 Seguridad

⚠️ **IMPORTANTE**: Este es un backend básico para desarrollo. Para producción necesitas:
- Hashear contraseñas con bcrypt
- Implementar autenticación JWT
- Validar y sanitizar inputs
- Agregar rate limiting
- Usar HTTPS
- Validar permisos de usuario

## 📝 Próximos Pasos

1. ✅ Backend básico creado
2. ⬜ Implementar autenticación JWT
3. ⬜ Hashear contraseñas
4. ⬜ Validación de datos
5. ⬜ Conectar con el frontend React
