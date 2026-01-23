# 📋 Instrucciones para ejecutar el esquema en phpMyAdmin

## ⚠️ Error común

**NO uses comandos de terminal** como `mysql -u root -p` en phpMyAdmin. phpMyAdmin solo acepta **comandos SQL puros**.

## ✅ Pasos correctos

### 1. Asegúrate de tener la base de datos seleccionada

En phpMyAdmin:
- Ve a la base de datos `gameboxd` (debería estar seleccionada en el panel izquierdo)
- Si no existe, créala primero:
  - Haz clic en "Nueva" (New) en el panel izquierdo
  - Nombre: `gameboxd`
  - Intercalación: `utf8mb4_unicode_ci`
  - Haz clic en "Crear"

### 2. Abre la pestaña SQL

- Con la base de datos `gameboxd` seleccionada
- Haz clic en la pestaña **"SQL"** en la parte superior

### 3. Copia y pega el script

1. Abre el archivo `docs/schema_phpmyadmin.sql`
2. **Selecciona TODO** el contenido (Ctrl+A)
3. **Copia** el contenido (Ctrl+C)
4. **Pega** en el cuadro de texto de phpMyAdmin (Ctrl+V)

### 4. Ejecuta el script

- Haz clic en el botón **"Continuar"** o **"Ejecutar"** (depende de tu versión de phpMyAdmin)
- Espera a que se ejecute

### 5. Verifica que funcionó

- Deberías ver un mensaje de éxito
- Ve a la pestaña **"Estructura"** para ver todas las tablas creadas
- Deberías ver estas tablas:
  - usuario
  - juego
  - lista
  - plataforma
  - genero
  - desarrolladora
  - reseña
  - guarda
  - contiene
  - lanza
  - pertenece
  - desarrolla
  - sigue

## 🔧 Si hay errores

### Error: "Table already exists"
- Significa que algunas tablas ya existen
- Opciones:
  1. Elimina las tablas existentes manualmente
  2. O ejecuta `DROP TABLE IF EXISTS nombre_tabla;` antes de cada `CREATE TABLE`

### Error de claves foráneas
- Asegúrate de que la opción **"Habilite la revisión de las claves foráneas"** esté **marcada** (checked)
- Esto debería estar activado por defecto

### Error de sintaxis
- Verifica que copiaste TODO el script completo
- Asegúrate de que no haya líneas cortadas

## 📝 Alternativa: Ejecutar por partes

Si el script completo da problemas, puedes ejecutarlo por partes:

1. **Primero las tablas principales** (sin claves foráneas):
   - plataforma
   - genero
   - desarrolladora
   - usuario
   - juego

2. **Luego las tablas con claves foráneas**:
   - lista
   - reseña

3. **Finalmente las tablas de relación**:
   - guarda
   - contiene
   - lanza
   - pertenece
   - desarrolla
   - sigue

4. **Por último, los datos de ejemplo**:
   - Los INSERT INTO

## ✅ Verificación final

Ejecuta esta consulta para verificar que todo está bien:

```sql
SHOW TABLES;
```

Deberías ver 13 tablas listadas.
