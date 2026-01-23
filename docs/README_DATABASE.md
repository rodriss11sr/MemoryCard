# Guía de Base de Datos - GameBoxd

## 📋 Descripción

Este es el esquema de base de datos para **GameBoxd**, una aplicación tipo Letterboxd pero para videojuegos. Los usuarios pueden registrar juegos, crear listas, escribir reseñas y seguir a otros usuarios.

## 🗄️ Estructura de la Base de Datos

### Tablas Principales

1. **usuario** - Información de los usuarios
2. **juego** - Catálogo de videojuegos
3. **lista** - Listas de juegos creadas por usuarios
4. **plataforma** - Plataformas disponibles (PC, PS5, Xbox, etc.)
5. **genero** - Géneros de videojuegos
6. **desarrolladora** - Empresas desarrolladoras
7. **reseña** - Reseñas escritas por usuarios sobre juegos

### Tablas de Relación (N:M)

1. **guarda** - Relación Usuario ↔ Juego (con estado y horas jugadas)
2. **contiene** - Relación Lista ↔ Juego
3. **lanza** - Relación Juego ↔ Plataforma
4. **pertenece** - Relación Juego ↔ Genero
5. **desarrolla** - Relación Juego ↔ Desarrolladora
6. **sigue** - Relación Usuario ↔ Usuario (auto-relación para seguir usuarios)

## 🚀 Cómo usar este esquema

### Opción 1: MySQL/MariaDB (phpMyAdmin)

1. Abre phpMyAdmin
2. Crea una nueva base de datos llamada `gameboxd`
3. Selecciona la base de datos
4. Ve a la pestaña "SQL"
5. Copia y pega el contenido de `schema.sql`
6. Ejecuta el script

### Opción 2: Línea de comandos

```bash
# Conectar a MySQL
mysql -u root -p

# Crear la base de datos
CREATE DATABASE gameboxd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gameboxd;

# Ejecutar el script
SOURCE docs/schema.sql;
```

### Opción 3: Desde tu aplicación

Si estás usando Node.js con un ORM como Sequelize o TypeORM, puedes importar este esquema o crear los modelos basándote en estas tablas.

## 📊 Relaciones Explicadas

### Guarda (Usuario ↔ Juego)
- Un usuario puede guardar múltiples juegos
- Un juego puede ser guardado por múltiples usuarios
- Incluye:
  - **estado**: pendiente, jugando, completado, abandonado, en_pausa
  - **horas_jugadas**: tiempo invertido en el juego

### Contiene (Lista ↔ Juego)
- Una lista puede contener múltiples juegos
- Un juego puede estar en múltiples listas
- Incluye **orden** para organizar los juegos en la lista

### Crea (Usuario → Lista)
- Un usuario puede crear múltiples listas
- Una lista pertenece a un solo usuario
- Relación 1:N (ya está en la tabla `lista` con `id_usuario`)

### Escribe (Usuario → Reseña)
- Un usuario puede escribir múltiples reseñas
- Una reseña pertenece a un solo usuario
- Un usuario solo puede escribir **una reseña por juego** (UNIQUE constraint)
- Relación 1:N (ya está en la tabla `reseña` con `id_usuario`)

### Recibe (Juego → Reseña)
- Un juego puede recibir múltiples reseñas
- Una reseña es sobre un solo juego
- Relación 1:N (ya está en la tabla `reseña` con `id_juego`)

### Lanza (Juego ↔ Plataforma)
- Un juego puede estar en múltiples plataformas
- Una plataforma tiene múltiples juegos

### Pertenece (Juego ↔ Genero)
- Un juego puede tener múltiples géneros
- Un género puede aplicarse a múltiples juegos

### Desarrolla (Juego ↔ Desarrolladora)
- Un juego puede ser desarrollado por múltiples desarrolladoras
- Una desarrolladora puede tener múltiples juegos

### Sigue (Usuario ↔ Usuario)
- Un usuario puede seguir a múltiples usuarios
- Un usuario puede ser seguido por múltiples usuarios
- Auto-relación (un usuario no puede seguirse a sí mismo)

## 🔐 Seguridad

⚠️ **IMPORTANTE**: 
- La columna `contraseña` debe almacenar contraseñas **hasheadas** (nunca en texto plano)
- Usa algoritmos como bcrypt, argon2 o scrypt
- En producción, considera usar variables de entorno para credenciales de BD

## 📝 Consultas Útiles

### Obtener todos los juegos de un usuario
```sql
SELECT j.*, g.estado, g.horas_jugadas
FROM juego j
INNER JOIN guarda g ON j.id_juego = g.id_juego
WHERE g.id_usuario = 1;
```

### Obtener reseñas de un juego
```sql
SELECT r.*, u.nombre AS nombre_usuario, u.avatar
FROM reseña r
INNER JOIN usuario u ON r.id_usuario = u.id_usuario
WHERE r.id_juego = 1
ORDER BY r.fecha_publicacion DESC;
```

### Obtener listas públicas de un usuario
```sql
SELECT l.*, COUNT(c.id_juego) AS total_juegos
FROM lista l
LEFT JOIN contiene c ON l.id_lista = c.id_lista
WHERE l.id_usuario = 1 AND l.publica = TRUE
GROUP BY l.id_lista;
```

### Obtener juegos más populares (por número de usuarios que los tienen)
```sql
SELECT j.*, COUNT(g.id_usuario) AS total_usuarios
FROM juego j
LEFT JOIN guarda g ON j.id_juego = g.id_juego
GROUP BY j.id_juego
ORDER BY total_usuarios DESC
LIMIT 10;
```

## 🔄 Próximos Pasos

1. ✅ Crear las tablas en tu base de datos
2. ⬜ Conectar tu aplicación web (React) con la base de datos
3. ⬜ Crear un backend (API REST) para interactuar con la BD
4. ⬜ Implementar autenticación de usuarios
5. ⬜ Crear endpoints para CRUD de juegos, listas, reseñas, etc.

## 🛠️ Tecnologías Recomendadas

- **Backend**: Node.js + Express, Python + Flask/Django, PHP + Laravel
- **ORM**: Sequelize (Node.js), SQLAlchemy (Python), Eloquent (PHP)
- **Base de datos**: MySQL 8.0+ o MariaDB 10.3+

## 📚 Recursos

- [Documentación MySQL](https://dev.mysql.com/doc/)
- [SQL Tutorial](https://www.w3schools.com/sql/)
- [Database Design Best Practices](https://www.lucidchart.com/pages/database-diagram/database-design)
