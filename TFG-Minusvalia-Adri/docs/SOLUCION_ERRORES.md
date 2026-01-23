# 🔧 Solución de Errores Comunes

## ❓ ¿Qué error te apareció?

Por favor, comparte el mensaje de error exacto que viste. Mientras tanto, aquí están las soluciones a los errores más comunes:

## 🐛 Errores Comunes y Soluciones

### Error 1: "Table already exists" (La tabla ya existe)

**Causa:** Estás intentando crear tablas que ya existen.

**Solución:**
1. Usa el archivo `schema_phpmyadmin_seguro.sql` que elimina las tablas antes de crearlas
2. O elimina manualmente las tablas desde phpMyAdmin:
   - Ve a la pestaña "Estructura"
   - Selecciona todas las tablas
   - Elige "Eliminar" (Drop)

### Error 2: "Cannot add foreign key constraint" (No se puede agregar clave foránea)

**Causa:** Las tablas se están creando en el orden incorrecto, o las tablas referenciadas no existen.

**Solución:**
- Usa `schema_phpmyadmin_seguro.sql` que crea las tablas en el orden correcto
- Asegúrate de que las tablas principales (usuario, juego, plataforma, etc.) se creen antes que las de relación

### Error 3: "Duplicate entry" (Entrada duplicada)

**Causa:** Estás intentando insertar datos que ya existen (plataformas, géneros, desarrolladoras).

**Solución:**
- Si ya ejecutaste el script antes, omite la sección de "DATOS DE EJEMPLO"
- O usa `INSERT IGNORE` en lugar de `INSERT`:
```sql
INSERT IGNORE INTO plataforma (nombre) VALUES
('PC'),
('PlayStation 5');
```

### Error 4: Ejecutando SQL desde la terminal en lugar de phpMyAdmin

**Causa:** Estás intentando ejecutar el archivo `.sql` desde PowerShell/CMD.

**Solución:**
- **NO ejecutes el SQL desde la terminal**
- Abre phpMyAdmin en tu navegador
- Selecciona la base de datos `gameboxd`
- Ve a la pestaña "SQL"
- Pega el contenido del archivo y ejecuta

### Error 5: "Access denied" (Acceso denegado)

**Causa:** No tienes permisos o las credenciales son incorrectas.

**Solución:**
- Verifica que estés usando el usuario correcto (normalmente `root`)
- Verifica que la contraseña sea correcta (o esté vacía si no tienes contraseña)

### Error 6: "Unknown database 'gameboxd'" (Base de datos desconocida)

**Causa:** La base de datos no existe.

**Solución:**
1. Crea la base de datos primero:
```sql
CREATE DATABASE gameboxd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
2. Selecciona la base de datos:
```sql
USE gameboxd;
```
3. Luego ejecuta el script de creación de tablas

## 📝 Pasos Recomendados

### Si es la primera vez:
1. Usa `schema_phpmyadmin.sql` (versión normal)

### Si ya ejecutaste el script antes:
1. Usa `schema_phpmyadmin_seguro.sql` (elimina y recrea todo)

### Si solo quieres agregar datos:
1. Ejecuta solo la sección "DATOS DE EJEMPLO" del archivo

## 🔍 Cómo identificar el problema

1. **Lee el mensaje de error completo** - MySQL suele decir exactamente qué está mal
2. **Fíjate en la línea** - El error suele indicar en qué línea está el problema
3. **Verifica el orden** - Las tablas deben crearse antes que sus relaciones

## 💡 Tip

Si no estás seguro, usa siempre `schema_phpmyadmin_seguro.sql` porque:
- ✅ Elimina las tablas si existen
- ✅ Las crea en el orden correcto
- ✅ Evita conflictos

## ❓ ¿Sigue sin funcionar?

**Comparte conmigo:**
1. El mensaje de error completo
2. En qué paso estabas (crear tablas, insertar datos, etc.)
3. Si es la primera vez o ya habías ejecutado el script antes

¡Así podré ayudarte mejor! 🚀
