# 🔄 Cómo Renombrar la Base de Datos de gameboxd a memory_card

## Método 1: Exportar e Importar (RECOMENDADO)

### Paso 1: Exportar gameboxd
1. En phpMyAdmin, selecciona la base de datos `gameboxd`
2. Ve a la pestaña **"Exportar"**
3. Método: **"Personalizado"**
4. Formato: **"SQL"**
5. Marca todas las tablas (o déjalas todas marcadas)
6. En la sección **"Opciones de exportación"** o **"Opciones SQL"**, busca:
   - ✅ Marca **"Añadir DROP DATABASE / USE"** (si existe)
   - ✅ Marca **"Crear base de datos"** (si existe)
7. Haz clic en **"Continuar"**
8. **Guarda el archivo** (ej: `gameboxd_backup.sql`)

### Paso 2: Editar el archivo SQL (si es necesario)
1. Abre el archivo SQL que guardaste con un editor de texto
2. Busca la línea que dice: `CREATE DATABASE IF NOT EXISTS \`gameboxd\``
3. Cámbiala por: `CREATE DATABASE IF NOT EXISTS \`memory_card\``
4. Busca la línea que dice: `USE \`gameboxd\``
5. Cámbiala por: `USE \`memory_card\``
6. Guarda el archivo

### Paso 3: Crear la nueva base de datos
1. En phpMyAdmin, haz clic en **"Nueva"** (panel izquierdo)
2. Nombre de la base de datos: **`memory_card`**
3. Intercalación: **`utf8mb4_unicode_ci`**
4. Haz clic en **"Crear"**

### Paso 4: Importar los datos
1. Selecciona la base de datos **`memory_card`**
2. Ve a la pestaña **"Importar"**
3. Haz clic en **"Elegir archivo"**
4. Selecciona el archivo SQL que guardaste (o el editado)
5. Haz clic en **"Continuar"**
6. Espera a que termine la importación

### Paso 5: Verificar
1. Selecciona `memory_card` en el panel izquierdo
2. Deberías ver todas las tablas: usuario, juego, reseña, etc.
3. El backend debería funcionar ahora

---

## Método 2: Empezar de Cero (Más Simple)

Si prefieres empezar limpio:

1. **Crea la nueva BD** `memory_card` en phpMyAdmin
2. **Ejecuta los scripts** en orden:
   - `docs/01_schema.sql` → Crea la estructura
   - `docs/02_datos_ejemplo.sql` → Añade datos de ejemplo (opcional)

**Ventaja:** Base de datos limpia y organizada
**Desventaja:** Pierdes los datos que hayas añadido manualmente

---

## ⚠️ Importante

Después de crear `memory_card` y verificar que funciona:
- El backend ya está configurado para usar `memory_card`
- Puedes eliminar `gameboxd` si quieres (o dejarla como backup)
