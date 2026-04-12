# Memory Card

Proyecto final de grado (TFG) — Plataforma para gestión y recomendación de videojuegos.

Descripción
-----------
Memory Card es una aplicación multi-plataforma compuesta por:
- Un backend en Node.js (API REST) que gestiona autenticación, usuarios, listas, reseñas y datos de juegos.
- Una interfaz web en React (Vite) para interacción del usuario (búsqueda, listas, perfil, reseñas).
- Un módulo móvil Android (código Gradle) con integración básica para consumir la API.

Objetivo
--------
Proveer una plataforma donde usuarios pueden registrar cuentas, crear listas de juegos, escribir reseñas, seguir a otros usuarios y recibir datos/recomendaciones sobre videojuegos.

Estructura del repositorio
--------------------------

```
MemoryCard/
├── backend/              # API REST (Node.js + Express)
│   ├── config/          # Configuración de BD
│   ├── routes/          # Rutas de la API
│   └── server.js        # Servidor principal
├── web-react/           # Frontend (React + Vite)
│   └── src/
│       ├── components/  # Componentes reutilizables
│       └── pages/       # Páginas de la aplicación
└── mobile-android/      # App Android
```

Tecnologías y herramientas
--------------------------

El proyecto usa las siguientes tecnologías y programas principales:

- **Backend:** Node.js y Express para la API REST, autenticación con JWT y utilidades habituales de npm.
- **Base de datos:** MySQL (scripts SQL en `docs/`).
- **Frontend (web):** React.js con Vite para la aplicación de usuario.
- **Móvil:** Android (Java y Gradle) para la app nativa.
- **Desarrollo:** Node/npm, Android Studio (o Gradle wrapper), y XAMPP (Apache/MySQL) para el entorno de base de datos local.

Despliegue / Hosting
--------------------

La infraestructura de producción utilizada en este proyecto es la siguiente:

- **Base de datos:** alojada en Railway (servicio de hosting para bases de datos). La cadena de conexión y credenciales se gestionan mediante variables de entorno en Railway.
- **Backend:** desplegado en Render (servicio PaaS). El servidor backend consume las variables de entorno (por ejemplo `DATABASE_URL`, `JWT_SECRET`, `PORT`) proporcionadas por Render.

Rutas principales (backend)
---------------------------
El backend organiza sus rutas principales bajo el prefijo `/api/` (puedes consultar la lista completa de endpoints en `backend/README.md`):
- **Autenticación** (`/api/auth`) — inicio y cierre de sesión.
- **Usuarios** (`/api/usuarios`) — registro, gestión de cuentas, actualización de perfil y consulta de juegos guardados.
- **Juegos** (`/api/juegos`) — catálogo de juegos, operaciones CRUD y consulta de reseñas por juego.
- **Listas** (`/api/listas`) — creación, edición, borrado de listas y gestión de juegos específicos en ellas.
- **Reseñas** (`/api/reseñas`) — publicación, edición, borrado y sistema de likes en las reseñas.
- **Utilidades** (`/api/health`) — comprobación de estado de la API y conexión a la base de datos.

Base de datos
-------------
En `docs/` hay scripts SQL para crear tablas y datos de ejemplo (`01_schema.sql`, `02_datos_ejemplo.sql`, etc.).
Para el entorno local se requiere el uso de XAMPP (MySQL). Para ver los pasos detallados de cómo montar la base de datos, consulta `docs/README.md`.

Ejecución local (resumen)
------------------------
1. Backend

	 - Para configurar y ejecutar el servidor, por favor consulta la guía detallada en `backend/README.md`.

2. Frontend (web)

	 - Abrir terminal en `web-react/`.
	 - Instalar dependencias:

		 npm install

	 - Ejecutar servidor de desarrollo:

		 npm run dev

3. Móvil (Android)

	 - Abrir `mobile-android/` en Android Studio o usar Gradle wrapper:

		 ./gradlew assembleDebug

Notas importantes
-----------------
- Revisa `backend/config/database.js` y los archivos de entorno para configurar la conexión a la base de datos antes de ejecutar el servidor.

- Para pruebas locales, tanto de la web com ode la app Android ten siempre abierto el terminal con el backend corriendo