# 📝 Cómo Ejecutar el Script SQL Correctamente

## ❌ NO hagas esto

**NO copies y pegues el contenido SQL directamente en PowerShell o CMD** - eso solo mostrará el texto, no lo ejecutará.

## ✅ Opción 1: Usar phpMyAdmin (RECOMENDADO - Más fácil)

### Pasos:

1. **Abre tu navegador** (Chrome, Firefox, Edge, etc.)

2. **Ve a phpMyAdmin:**
   - Normalmente está en: `http://localhost/phpmyadmin`
   - O `http://127.0.0.1/phpmyadmin`

3. **Inicia sesión:**
   - Usuario: `root`
   - Contraseña: (déjala vacía si no tienes)

4. **Selecciona la base de datos:**
   - En el panel izquierdo, haz clic en `gameboxd`
   - Si no existe, créala primero (botón "Nueva" arriba)

5. **Abre la pestaña SQL:**
   - Arriba verás varias pestañas: "Estructura", "SQL", "Buscar", etc.
   - Haz clic en **"SQL"**

6. **Copia y pega el contenido:**
   - Abre el archivo `docs/schema_phpmyadmin.sql` en tu editor
   - Selecciona TODO (Ctrl+A)
   - Copia (Ctrl+C)
   - Pega en el cuadro de texto de phpMyAdmin (Ctrl+V)

7. **Ejecuta:**
   - Haz clic en el botón **"Continuar"** o **"Ejecutar"** (abajo a la derecha)

8. **Verifica:**
   - Deberías ver un mensaje de éxito
   - Ve a la pestaña "Estructura" para ver las tablas creadas

---

## ✅ Opción 2: Usar MySQL desde la Terminal (Avanzado)

Si prefieres usar la terminal, necesitas el comando `mysql`:

### En Windows:

1. **Abre PowerShell o CMD**

2. **Navega a donde está MySQL:**
   ```powershell
   cd "C:\xampp\mysql\bin"
   # O la ruta donde tengas MySQL instalado
   ```

3. **Ejecuta el script:**
   ```powershell
   .\mysql.exe -u root -p gameboxd < "C:\ruta\completa\al\archivo\schema_phpmyadmin.sql"
   ```
   
   O si no tienes contraseña:
   ```powershell
   .\mysql.exe -u root gameboxd < "C:\ruta\completa\al\archivo\schema_phpmyadmin.sql"
   ```

4. **Ingresa la contraseña** si te la pide (o presiona Enter si no tienes)

### Ejemplo con ruta completa:

Si tu proyecto está en:
`C:\Users\User\OneDrive\Dokumente\GitHub\TFG-Minusvalia`

Y MySQL está en:
`C:\xampp\mysql\bin`

El comando sería:
```powershell
cd C:\xampp\mysql\bin
.\mysql.exe -u root gameboxd < "C:\Users\User\OneDrive\Dokumente\GitHub\TFG-Minusvalia\docs\schema_phpmyadmin.sql"
```

---

## ✅ Opción 3: Ejecutar línea por línea (Si hay problemas)

Si ninguna de las opciones anteriores funciona, puedes ejecutar el SQL línea por línea desde phpMyAdmin:

1. Abre phpMyAdmin
2. Selecciona la base de datos `gameboxd`
3. Ve a la pestaña "SQL"
4. Copia y pega solo la primera sección (por ejemplo, solo la creación de la tabla `plataforma`)
5. Ejecuta
6. Repite con cada sección

---

## 🎯 RECOMENDACIÓN

**Usa la Opción 1 (phpMyAdmin)** porque:
- ✅ Es más visual y fácil
- ✅ Ves los errores claramente
- ✅ Puedes verificar que funcionó
- ✅ No necesitas conocer comandos de terminal

---

## ❓ ¿Todavía no funciona?

Si después de seguir estos pasos sigue sin funcionar, comparte:
1. ¿Qué método estás usando? (phpMyAdmin o terminal)
2. ¿Qué mensaje de error exacto te aparece?
3. ¿En qué paso te quedaste?

¡Así podré ayudarte mejor! 🚀
