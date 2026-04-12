# 🎮 Memory Card Backend API

Backend REST API para la aplicación Memory Card(tipo Letterboxd para videojuegos).

## 🚀 Instalación

Sigue estos pasos en orden para configurar tu entorno local:

1. **Instalar y arrancar XAMPP**
- Instala **XAMPP** (asegúrate de incluir MySQL).
- Abre el Panel de Control de XAMPP como administrador e inicia los módulos **Apache** y **MySQL**.

2. **Crear la base de datos**
Abre phpMyAdmin (`http://localhost/phpmyadmin`) o tu cliente de MySQL preferido y ejecuta:

```sql
CREATE DATABASE memory_card CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Importar la estructura**
- Selecciona la base de datos `memory_card`
- Ve a la pestaña "SQL"
- Copia y pega el contenido de `schema.sql`

3. **Importar los datos**
- En el terminal ve al directorio del backend
- Ejecuta el script con el comando `node importar_igdb.js`

4. **Ejecucion del backend**
- En el terminal ve al directorio del backend
- Instala las dependencias con el comando `npm install`
- Ejecuta el backend con el comando `npm run start`

El servidor estará disponible en `http://localhost:3000`

## 📡 Endpoints Disponibles

### Juegos
- `GET /api/juegos` - Obtener todos los juegos
- `GET /api/juegos/:id` - Obtener un juego por ID
- `POST /api/juegos` - Crear un nuevo juego
- `PUT /api/juegos/:id` - Actualizar información de un juego
- `DELETE /api/juegos/:id` - Eliminar un juego
- `GET /api/juegos/:id/reseñas` - Obtener reseñas de un juego

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario (Registro)
- `PUT /api/usuarios/:id` - Actualizar perfil de usuario
- `DELETE /api/usuarios/:id` - Eliminar cuenta de usuario
- `GET /api/usuarios/:id/juegos` - Obtener juegos guardados por un usuario

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

### Listas
- `GET /api/listas` - Obtener todas las listas públicas
- `GET /api/listas/:id` - Obtener una lista por ID (con sus juegos)
- `POST /api/listas` - Crear una nueva lista
- `PUT /api/listas/:id` - Editar el nombre o detalles de la lista
- `DELETE /api/listas/:id` - Eliminar una lista
- `POST /api/listas/:id/juegos` - Agregar un juego a una lista
- `DELETE /api/listas/:id/juegos/:juegoId` - Eliminar un juego específico de una lista

### Reseñas
- `GET /api/reseñas` - Obtener todas las reseñas
- `GET /api/reseñas/:id` - Obtener una reseña por ID
- `POST /api/reseñas` - Crear una nueva reseña
- `PUT /api/reseñas/:id` - Editar el texto/nota de una reseña
- `DELETE /api/reseñas/:id` - Eliminar una reseña
- `PUT /api/reseñas/:id/like` - Dar like a una reseña

### Utilidades
- `GET /` - Información de la API
- `GET /api/health` - Estado de la API y conexión a BD
