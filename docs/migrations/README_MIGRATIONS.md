# 🔄 Migraciones de Base de Datos

Esta carpeta contiene los archivos SQL para actualizar la base de datos cuando se añaden nuevas funcionalidades.

## 📋 Cómo usar las migraciones

1. **Cuando se añade una nueva funcionalidad** que requiere cambios en la BD:
   - Crea un nuevo archivo SQL aquí con el formato: `YYYYMMDD_descripcion.sql`
   - Ejemplo: `20240215_añadir_tabla_notificaciones.sql`

2. **Comunica a tus compañeros** que hay una nueva migración

3. **Ellos ejecutan la migración** en su base de datos local:
   - Abren phpMyAdmin
   - Seleccionan la base de datos `memory_card`
   - Van a la pestaña "SQL"
   - Copian y pegan el contenido del archivo de migración
   - Ejecutan

## 📝 Formato de archivo de migración

```sql
-- migrations/YYYYMMDD_descripcion.sql
-- Fecha: DD/MM/YYYY
-- Descripción: Breve descripción de los cambios
-- Autor: Tu nombre

-- Ejemplo: Añadir nueva tabla
CREATE TABLE IF NOT EXISTS nueva_tabla (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campo VARCHAR(255)
);

-- Ejemplo: Añadir columna a tabla existente
ALTER TABLE tabla_existente 
ADD COLUMN nueva_columna VARCHAR(100) DEFAULT NULL;
```

## ⚠️ Importante

- **Siempre usa `IF NOT EXISTS`** o `ON DUPLICATE KEY UPDATE` para evitar errores si se ejecuta dos veces
- **No elimines datos** sin avisar primero
- **Actualiza también** `01_schema.sql` con los cambios para que nuevos desarrolladores tengan la estructura completa
