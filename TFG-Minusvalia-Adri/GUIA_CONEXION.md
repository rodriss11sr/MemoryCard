# 🚀 Guía de Conexión - GameBoxd

## ✅ Lo que ya tienes

1. ✅ Base de datos MySQL creada (`gameboxd`)
2. ✅ Tablas creadas con el esquema SQL
3. ✅ Backend API creado (Node.js + Express)
4. ✅ Frontend React actualizado para conectarse al backend

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
   - Abre el archivo `backend/.env`
   - Ajusta la contraseña de MySQL si la tienes:
     ```
     DB_PASSWORD=tu_contraseña_aqui
     ```
   - Si no tienes contraseña, déjalo vacío: `DB_PASSWORD=`

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
- `http://localhost:3000` - Deberías ver información de la API
- `http://localhost:3000/api/health` - Estado de la conexión
- `http://localhost:3000/api/juegos` - Lista de juegos (probablemente vacía)

### Paso 3: Iniciar el Frontend

1. **Abre OTRA terminal** (deja el backend corriendo)

2. **Ve a la carpeta web-react:**
```bash
cd web-react
```

3. **Inicia el servidor de desarrollo:**
```bash
npm run dev
```

4. **Abre tu navegador** en la URL que te muestra (normalmente `http://localhost:5173`)

### Paso 4: Agregar algunos datos de prueba

Para ver juegos en tu aplicación, necesitas agregar algunos datos. Puedes hacerlo de varias formas:

#### Opción A: Desde phpMyAdmin (SQL)

Ejecuta este SQL en phpMyAdmin:

```sql
-- Insertar algunos juegos de ejemplo
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion) VALUES
('Elden Ring', '2022-02-25', 'Un RPG de acción de mundo abierto'),
('The Legend of Zelda: Breath of the Wild', '2017-03-03', 'Aventura épica en Hyrule'),
('Hollow Knight', '2017-02-24', 'Metroidvania con hermoso arte');

-- Asignar plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES
(1, 'PC'),
(1, 'PlayStation 5'),
(2, 'Nintendo Switch'),
(3, 'PC'),
(3, 'Nintendo Switch');

-- Asignar géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES
(1, 'RPG'),
(1, 'Acción'),
(2, 'Aventura'),
(2, 'RPG'),
(3, 'Plataformas'),
(3, 'Aventura');

-- Asignar desarrolladoras
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES
(1, 'FromSoftware'),
(2, 'Nintendo'),
(3, 'Team Cherry');
```

#### Opción B: Desde la API (usando curl o Postman)

```bash
curl -X POST http://localhost:3000/api/juegos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Elden Ring",
    "fecha_lanzamiento": "2022-02-25",
    "descripcion": "Un RPG de acción de mundo abierto",
    "plataformas": ["PC", "PlayStation 5"],
    "generos": ["RPG", "Acción"],
    "desarrolladoras": ["FromSoftware"]
  }'
```

## 🎯 Estructura del Proyecto

```
TFG-Minusvalia/
├── backend/              # API REST (Node.js + Express)
│   ├── config/          # Configuración de BD
│   ├── routes/          # Rutas de la API
│   └── server.js        # Servidor principal
├── web-react/           # Frontend (React + Vite)
│   └── src/
│       └── App.jsx      # Componente principal
├── mobile-android/      # App Android (futuro)
└── docs/                # Documentación y esquemas
```

## 🔍 Verificar que todo funciona

1. **Backend corriendo:**
   - Terminal muestra: `🚀 Servidor corriendo en http://localhost:3000`
   - `http://localhost:3000/api/health` muestra `"database": "connected"`

2. **Frontend conectado:**
   - La app muestra: `✅ Conectado a: http://localhost:3000`
   - Los juegos se cargan desde la base de datos

3. **Base de datos:**
   - phpMyAdmin muestra las tablas creadas
   - Hay datos en las tablas (juegos, plataformas, etc.)

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con el servidor"
- ✅ Verifica que el backend esté corriendo (`npm start` en la carpeta `backend`)
- ✅ Verifica que el puerto 3000 no esté ocupado
- ✅ Revisa la configuración en `backend/.env`

### Error: "Conexión a la base de datos fallida"
- ✅ Verifica que MySQL esté corriendo
- ✅ Verifica las credenciales en `backend/.env`
- ✅ Verifica que la base de datos `gameboxd` exista

### Error CORS en el navegador
- ✅ El backend ya tiene CORS configurado
- ✅ Si persiste, verifica que el frontend esté en el puerto correcto

### No se muestran juegos
- ✅ Verifica que haya datos en la tabla `juego` en phpMyAdmin
- ✅ Agrega algunos juegos usando el SQL de ejemplo arriba

## 📚 Próximos Pasos

1. ✅ Backend y Frontend conectados
2. ⬜ Implementar autenticación de usuarios
3. ⬜ Crear formularios para agregar juegos desde la web
4. ⬜ Implementar búsqueda de juegos
5. ⬜ Agregar funcionalidad de reseñas
6. ⬜ Conectar la app Android

## 💡 Tips

- **Mantén dos terminales abiertas**: una para el backend y otra para el frontend
- **Usa Postman o Thunder Client** para probar la API fácilmente
- **Revisa la consola del navegador** (F12) para ver errores del frontend
- **Revisa la terminal del backend** para ver errores del servidor

¡Ya tienes todo listo para empezar a desarrollar! 🎮
