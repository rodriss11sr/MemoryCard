-- ============================================
-- SCRIPT PARA RENOMBRAR BASE DE DATOS
-- De gameboxd a memory_card
-- ============================================
-- IMPORTANTE: MySQL no permite renombrar bases de datos directamente
-- Este script crea la nueva BD y copia los datos

-- 1. Crear la nueva base de datos
CREATE DATABASE IF NOT EXISTS memory_card CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Copiar todas las tablas (ejecuta esto para cada tabla)
-- Puedes hacerlo manualmente desde phpMyAdmin:
-- - Selecciona la tabla en gameboxd
-- - Ve a "Operaciones" → "Copiar tabla a (base de datos.memory_card)"
-- - O usa el script mysqldump desde terminal

-- ============================================
-- OPCIÓN MÁS FÁCIL: Usar phpMyAdmin
-- ============================================
-- 1. Selecciona la base de datos "gameboxd"
-- 2. Ve a la pestaña "Exportar"
-- 3. Selecciona "Método personalizado"
-- 4. Marca "Crear base de datos"
-- 5. En "Nombre de la base de datos", escribe: memory_card
-- 6. Haz clic en "Continuar"
-- 7. Guarda el archivo SQL
-- 8. Crea la nueva BD "memory_card" en phpMyAdmin
-- 9. Selecciona "memory_card" → Pestaña "Importar"
-- 10. Selecciona el archivo SQL que guardaste
-- 11. Ejecuta

-- ============================================
-- OPCIÓN ALTERNATIVA: Ejecutar los scripts desde docs/
-- ============================================
-- Si prefieres empezar de cero:
-- 1. Crea la BD "memory_card"
-- 2. Ejecuta 01_schema.sql
-- 3. Ejecuta 02_datos_ejemplo.sql (opcional)
