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
- `backend/`: Código del servidor API (rutas, controladores, configuración de base de datos). Contiene `server.js`, `routes/` y `config/database.js`.
- `web-react/`: Aplicación frontend en React (Vite).
- `mobile-android/`: Proyecto Android (Gradle) para la app móvil.
- `docs/`: Scripts SQL para crear/esquematizar la base de datos, migraciones y diagramas.
- `bin/`, `build/`: archivos auxiliares y artefactos; la carpeta `postman/` existe por organización pero Postman no se utilizó en el desarrollo (ver nota abajo).

Tecnologías y herramientas
--------------------------

El proyecto usa las siguientes tecnologías y programas principales:

- **Backend:** Node.js y Express para la API REST, autenticación con JWT y utilidades habituales de npm.
- **Base de datos:** MySQL (scripts SQL en `docs/`).
- **Frontend (web):** React con Vite para la aplicación de usuario.
- **Móvil:** Android (Gradle) para la app nativa.
- **Contenedores / despliegue local:** Docker y docker-compose (hay archivos en `backend/`).
- **Desarrollo:** Node/npm, Android Studio (o Gradle wrapper), y herramientas SQL para importar los scripts de `docs/`.

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
En `docs/` hay scripts SQL para crear tablas y datos de ejemplo (por ejemplo `01_schema.sql`, `02_datos_ejemplo.sql`, etc.).
Usa tu gestor SQL preferido para ejecutar esos scripts (Postgres, MySQL o SQLite según tu configuración local).

Ejecución local (resumen)
------------------------
1. Backend

	 - Abrir terminal en la carpeta `backend/`.
	 - Instalar dependencias:

		 npm install

	 - Ejecutar:

		 npm start

	 (Si no existe el script `start`, se puede lanzar con `node server.js`.)

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
