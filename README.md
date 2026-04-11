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
- `bin/`, `postman/`, `build/`: archivos auxiliares y artefactos; la carpeta `postman/` existe por organización pero Postman no se utilizó en el desarrollo (ver nota abajo).

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
- La carpeta `postman/` permanece en el repositorio por organización, pero Postman no se utilizó activamente en el desarrollo del proyecto; por tanto, no hay colecciones oficiales requeridas.
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

Docker y Google Cloud Run
-------------------------
Para desplegar el `backend` en Google Cloud Run puedes construir una imagen y publicarla en Container Registry (o Artifact Registry) y luego desplegarla.

1) Construir y subir la imagen con Cloud Build (reemplaza `PROJECT_ID`):

	gcloud builds submit backend/ --tag gcr.io/PROJECT_ID/memory-card-backend

2) Desplegar en Cloud Run (reemplaza `PROJECT_ID` y `REGION`):

	gcloud run deploy memory-card-backend \
	  --image gcr.io/PROJECT_ID/memory-card-backend \
	  --platform managed \
	  --region REGION \
	  --allow-unauthenticated \
	  --set-env-vars PORT=8080

Alternativa (con Docker local):

	cd backend
	docker build -t gcr.io/PROJECT_ID/memory-card-backend .
	docker push gcr.io/PROJECT_ID/memory-card-backend
	gcloud run deploy memory-card-backend --image gcr.io/PROJECT_ID/memory-card-backend --platform managed --region REGION --allow-unauthenticated

Notas:
- Cloud Run proporciona la variable de entorno `PORT`; el servidor debe enlazar a `process.env.PORT` (si es necesario, revisar `server.js`).
- Nunca incluyas archivos sensibles en la imagen: usa secretos/variables de entorno en Cloud Run para la configuración de base de datos, `JWT_SECRET`, etc.
- Puedes configurar variables de entorno desde la consola de Cloud Run o con `--set-env-vars` en el comando `gcloud run deploy`.