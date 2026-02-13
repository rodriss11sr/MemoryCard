# 📦 Base de Datos - Memory Card

## 🚀 Instalación Inicial

Para configurar la base de datos en tu PC local, sigue estos pasos en orden:

### 1. Crear la base de datos
Abre phpMyAdmin (`http://localhost/phpmyadmin`) y ejecuta:

```sql
CREATE DATABASE memory_card CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Importar la estructura
1. Selecciona la base de datos `memory_card`
2. Ve a la pestaña "SQL"
3. Copia y pega el contenido de `01_schema.sql`
4. Ejecuta el script

### 3. Importar datos de ejemplo (opcional)
Si quieres datos de prueba para desarrollar:
1. Ve a la pestaña "SQL"
2. Copia y pega el contenido de `02_datos_ejemplo.sql`
3. Ejecuta el script

**Usuario de prueba creado:**
- **Email:** `gordon@example.com`
- **Contraseña:** `123456`

## 📋 Archivos SQL

### Archivos esenciales (ejecutar en orden):
1. **`01_schema.sql`** - Estructura completa de la base de datos (tablas, vistas, relaciones)
2. **`02_datos_ejemplo.sql`** - Datos de ejemplo (juegos, usuarios, reseñas, listas)

### Archivos opcionales:
- **`03_reseñas_multiples_usuarios.sql`** - Añade más reseñas de diferentes usuarios para probar
- **`04_asociar_datos_gordon.sql`** - Asocia datos existentes al usuario "Gordon Freeman"

## 🔄 Actualizaciones de la Base de Datos (Migraciones)

Cuando se añaden nuevas funcionalidades que requieren cambios en la BD:

### Proceso:

1. **Crea un archivo de migración** en `migrations/`:
   - Nombre: `YYYYMMDD_descripcion.sql` (ej: `20240215_añadir_tabla_notificaciones.sql`)
   - Incluye SOLO los cambios nuevos (no toda la estructura)

2. **Actualiza `01_schema.sql`** con los cambios para que nuevos desarrolladores tengan la estructura completa

3. **Comunica a tus compañeros** que hay una nueva migración

4. **Tus compañeros ejecutan la migración** en su BD local:
   - Abren phpMyAdmin → Seleccionan `memory_card` → Pestaña "SQL"
   - Copian y pegan el contenido del archivo de migración
   - Ejecutan

### Ejemplo práctico:

**Situación:** Quieres añadir notificaciones cuando alguien te sigue

1. Creas `migrations/20240215_añadir_notificaciones.sql`:
```sql
-- migrations/20240215_añadir_notificaciones.sql
CREATE TABLE IF NOT EXISTS notificacion (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    mensaje TEXT,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);
```

2. Actualizas `01_schema.sql` añadiendo esta tabla también

3. Tus compañeros ejecutan solo el archivo de migración

### Ejemplo de migración:
```sql
-- migrations/20240215_añadir_tabla_notificaciones.sql
-- Fecha: 15/02/2024
-- Descripción: Añade tabla de notificaciones

CREATE TABLE IF NOT EXISTS notificacion (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    mensaje TEXT,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);
```

## ⚠️ Importante

- **Siempre haz backup** antes de ejecutar migraciones en producción
- **Ejecuta las migraciones en orden** (por fecha)
- **No modifiques** `01_schema.sql` directamente si ya está en producción, usa migraciones

## 🛠️ Solución de Problemas

Si tienes errores al importar:
1. Verifica que MySQL esté corriendo
2. Asegúrate de que la base de datos `memory_card` existe
3. Revisa que no haya conflictos con datos existentes
4. Consulta `SOLUCION_ERRORES.md` para errores comunes
