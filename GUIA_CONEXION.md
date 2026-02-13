# 🚀 Guía de Conexión - Memory Card

## ✅ Lo que ya tienes

1. ✅ Base de datos MySQL creada (`memory_card`)
2. ✅ Tablas creadas con el esquema SQL
3. ✅ Backend API creado (Node.js + Express)
4. ✅ Frontend React conectado al backend via proxy Vite
5. ✅ Login y registro de usuarios
6. ✅ Perfil completo (juegos, reseñas, listas, amigos)
7. ✅ Wishlist, seguir/dejar de seguir usuarios, crear listas

## 📋 Pasos para conectar todo

### Paso 1: Configurar el Backend

1. **Abre una terminal y ve a la carpeta backend:**
```bash
cd backend
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Configura las variables de entorno:**
   - Crea/edita el archivo `backend/.env`:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=memory_card
     DB_PORT=3306
     PORT=3000
     ```
   - Ajusta `DB_PASSWORD` si tienes contraseña en MySQL

4. **Inicia el servidor backend:**
```bash
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
✅ Conexión a la base de datos exitosa
```

### Paso 2: Probar el Backend

Abre tu navegador y ve a:
- `http://localhost:3000` - Información de la API
- `http://localhost:3000/api/health` - Estado de la conexión
- `http://localhost:3000/api/juegos` - Lista de juegos

### Paso 3: Iniciar el Frontend

1. **Abre OTRA terminal** (deja el backend corriendo)

2. **Ve a la carpeta web-react:**
```bash
cd web-react
```

3. **Instala las dependencias:**
```bash
npm install
```

4. **Inicia el servidor de desarrollo:**
```bash
npm run dev
```

5. **Abre tu navegador** en la URL que te muestra (normalmente `http://localhost:5173`)

### Paso 4: Configurar la Base de Datos

Si es la primera vez:
1. Crea la base de datos `memory_card` en phpMyAdmin
2. Ejecuta `docs/01_schema.sql` (estructura)
3. Ejecuta `docs/02_datos_ejemplo.sql` (datos de prueba - opcional)

**Usuario de prueba:** `gordon@example.com` / `123456`

## 🎯 Estructura del Proyecto

```
TFG-Minusvalia/
├── backend/              # API REST (Node.js + Express)
│   ├── config/          # Configuración de BD
│   ├── routes/          # Rutas de la API
│   │   ├── auth.routes.js      # Login y registro
│   │   ├── juegos.routes.js    # CRUD de juegos
│   │   ├── usuarios.routes.js  # Usuarios, amigos, seguir
│   │   ├── listas.routes.js    # Listas personalizadas
│   │   ├── reseñas.routes.js   # Reseñas y puntuaciones
│   │   └── perfil.routes.js    # Perfil con estadísticas
│   └── server.js        # Servidor principal
├── web-react/           # Frontend (React + Vite)
│   └── src/
│       ├── components/  # Componentes reutilizables
│       └── pages/       # Páginas de la aplicación
├── mobile-android/      # App Android
└── docs/                # Documentación y esquemas SQL
```

## 🔍 Verificar que todo funciona

1. **Backend corriendo:**
   - Terminal muestra: `🚀 Servidor corriendo en http://localhost:3000`
   - `http://localhost:3000/api/health` muestra `"database": "connected"`

2. **Frontend conectado:**
   - La app carga en `http://localhost:5173`
   - Los juegos se cargan desde la base de datos

3. **Base de datos:**
   - phpMyAdmin muestra las tablas en `memory_card`

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con el servidor"
- ✅ Verifica que el backend esté corriendo (`npm start` en `backend/`)
- ✅ Verifica que el puerto 3000 no esté ocupado
- ✅ Revisa la configuración en `backend/.env`

### Error: "Conexión a la base de datos fallida"
- ✅ Verifica que MySQL/XAMPP esté corriendo
- ✅ Verifica las credenciales en `backend/.env`
- ✅ Verifica que la base de datos `memory_card` exista

### Error: proxy error /api/...
- ✅ El backend debe estar corriendo ANTES que el frontend
- ✅ Vite usa un proxy configurado en `vite.config.js` para redirigir `/api` a `localhost:3000`

### No se muestran juegos
- ✅ Verifica que haya datos en la tabla `juego` en phpMyAdmin
- ✅ Ejecuta `docs/02_datos_ejemplo.sql` para añadir datos de prueba

## 💡 Tips

- **Mantén dos terminales abiertas**: una para el backend y otra para el frontend
- **Revisa la consola del navegador** (F12) para ver errores del frontend
- **Revisa la terminal del backend** para ver errores del servidor
- **Usa `npm run dev`** en backend para recarga automática al cambiar código

¡Ya tienes todo listo para empezar a desarrollar! 🎮
