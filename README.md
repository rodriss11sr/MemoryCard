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
- **Frontend (web):** React con Vite para la aplicación de usuario.
- **Móvil:** Android (Gradle) para la app nativa.
- **Contenedores / despliegue local:** Docker y docker-compose (hay archivos en `backend/`).
- **Desarrollo:** Node/npm, Android Studio (o Gradle wrapper), y XAMPP (Apache/MySQL) para el entorno de base de datos local.

Despliegue / Hosting
--------------------

La infraestructura de producción utilizada en este proyecto es la siguiente:

- **Base de datos:** alojada en Railway (servicio de hosting para bases de datos). La cadena de conexión y credenciales se gestionan mediante variables de entorno en Railway.
- **Backend:** desplegado en Render (servicio PaaS). El servidor backend consume las variables de entorno (por ejemplo `DATABASE_URL`, `JWT_SECRET`, `PORT`) proporcionadas por Render.

Notas de despliegue:

- Asegúrate de configurar correctamente las variables de entorno en Render y Railway antes de enlazar el backend con la base de datos.
- Por seguridad, no incluyas credenciales en el repositorio; usa las opciones de secretos/variables de entorno de los servicios de hosting.

Rutas principales (backend)
---------------------------
El backend organiza las rutas en `backend/routes/`:
- `auth.routes.js` — autenticación y gestión de sesiones
- `usuarios.routes.js` — gestión de usuarios
- `juegos.routes.js` — endpoints relacionados con juegos
- `listas.routes.js` — creación y gestión de listas de usuario
- `reseñas.routes.js` — crear/editar/consultar reseñas
- `perfil.routes.js` — operaciones sobre perfil de usuario

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
- Los scripts de `docs/migrations/` y `docs/*.sql` incluyen datos y migraciones útiles para replicar el entorno de pruebas.

Contribuir
----------
Si deseas colaborar, abre un issue o un PR con cambios claros: pasos para reproducir, objetivo y pruebas mínimas.

Licencia
--------
Este repositorio contiene el trabajo del TFG; contacta al autor para condiciones de uso o distribución.

Contacto
--------
Para dudas o comentarios, revisa el código y abre un issue en el repositorio.
