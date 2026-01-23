-- ============================================
-- DATOS DE EJEMPLO COMPLETO - GameBoxd
-- Ejecutar en phpMyAdmin (pestaña SQL) sobre la base de datos gameboxd
-- Este script llena TODAS las tablas con datos coherentes
-- ============================================

USE gameboxd;

-- Limpiar datos existentes (opcional, descomenta si quieres empezar de cero)
-- TRUNCATE TABLE sigue;
-- TRUNCATE TABLE reseña;
-- TRUNCATE TABLE guarda;
-- TRUNCATE TABLE contiene;
-- TRUNCATE TABLE desarrolla;
-- TRUNCATE TABLE pertenece;
-- TRUNCATE TABLE lanza;
-- TRUNCATE TABLE lista;
-- TRUNCATE TABLE juego;
-- TRUNCATE TABLE usuario;

-- ============================================
-- 1. USUARIOS
-- ============================================

INSERT IGNORE INTO usuario (nombre, correo, contraseña, avatar) VALUES
('alex', 'alex@example.com', 'password123', 'https://avatars.githubusercontent.com/u/1?v=4'),
('maria', 'maria@example.com', 'password123', 'https://avatars.githubusercontent.com/u/2?v=4'),
('juan', 'juan@example.com', 'password123', NULL);

-- ============================================
-- 2. JUEGOS
-- ============================================

INSERT IGNORE INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES
('Elden Ring', '2022-02-25', 'Un RPG de accion de mundo abierto en las Tierras Intermedias.', 'https://image.api.playstation.com/vulcan/ap/rnd/202202/2321/0dq9ap0s6kgxq2h6qjfi.png'),
('The Legend of Zelda: Breath of the Wild', '2017-03-03', 'Explora un enorme mundo abierto en Hyrule.', 'https://assets.nintendo.com/image/upload/ncom/es_LA/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero'),
('Hollow Knight', '2017-02-24', 'Metroidvania 2D con una atmosfera preciosa y desafiante.', 'https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg'),
('Cyberpunk 2077', '2020-12-10', 'RPG de accion en un futuro distopico.', 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg'),
('The Witcher 3: Wild Hunt', '2015-05-19', 'RPG de fantasia epica con Geralt de Rivia.', 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg');

-- ============================================
-- 3. DESARROLLADORAS ADICIONALES
-- ============================================

INSERT IGNORE INTO desarrolladora (nombre) VALUES
('Team Cherry'),
('CD Projekt Red');

-- ============================================
-- 4. RELACIONES: LANZA (Juego ↔ Plataforma)
-- ============================================

-- Obtener IDs de juegos dinámicamente
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma)
SELECT id_juego, 'PC' FROM juego WHERE titulo = 'Elden Ring'
UNION ALL
SELECT id_juego, 'PlayStation 5' FROM juego WHERE titulo = 'Elden Ring'
UNION ALL
SELECT id_juego, 'Xbox Series X' FROM juego WHERE titulo = 'Elden Ring'
UNION ALL
SELECT id_juego, 'Nintendo Switch' FROM juego WHERE titulo = 'The Legend of Zelda: Breath of the Wild'
UNION ALL
SELECT id_juego, 'PC' FROM juego WHERE titulo = 'Hollow Knight'
UNION ALL
SELECT id_juego, 'Nintendo Switch' FROM juego WHERE titulo = 'Hollow Knight'
UNION ALL
SELECT id_juego, 'PC' FROM juego WHERE titulo = 'Cyberpunk 2077'
UNION ALL
SELECT id_juego, 'PlayStation 5' FROM juego WHERE titulo = 'Cyberpunk 2077'
UNION ALL
SELECT id_juego, 'Xbox Series X' FROM juego WHERE titulo = 'Cyberpunk 2077'
UNION ALL
SELECT id_juego, 'PC' FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt'
UNION ALL
SELECT id_juego, 'PlayStation 4' FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt'
UNION ALL
SELECT id_juego, 'Nintendo Switch' FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt';

-- ============================================
-- 5. RELACIONES: PERTENECE (Juego ↔ Género)
-- ============================================

INSERT IGNORE INTO pertenece (id_juego, nombre_genero)
SELECT id_juego, 'RPG' FROM juego WHERE titulo = 'Elden Ring'
UNION ALL
SELECT id_juego, 'Accion' FROM juego WHERE titulo = 'Elden Ring'
UNION ALL
SELECT id_juego, 'Aventura' FROM juego WHERE titulo = 'The Legend of Zelda: Breath of the Wild'
UNION ALL
SELECT id_juego, 'RPG' FROM juego WHERE titulo = 'The Legend of Zelda: Breath of the Wild'
UNION ALL
SELECT id_juego, 'Plataformas' FROM juego WHERE titulo = 'Hollow Knight'
UNION ALL
SELECT id_juego, 'Aventura' FROM juego WHERE titulo = 'Hollow Knight'
UNION ALL
SELECT id_juego, 'RPG' FROM juego WHERE titulo = 'Cyberpunk 2077'
UNION ALL
SELECT id_juego, 'Accion' FROM juego WHERE titulo = 'Cyberpunk 2077'
UNION ALL
SELECT id_juego, 'RPG' FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt'
UNION ALL
SELECT id_juego, 'Aventura' FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt';

-- ============================================
-- 6. RELACIONES: DESARROLLA (Juego ↔ Desarrolladora)
-- ============================================

INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora)
SELECT id_juego, 'FromSoftware' FROM juego WHERE titulo = 'Elden Ring'
UNION ALL
SELECT id_juego, 'Nintendo' FROM juego WHERE titulo = 'The Legend of Zelda: Breath of the Wild'
UNION ALL
SELECT id_juego, 'Team Cherry' FROM juego WHERE titulo = 'Hollow Knight'
UNION ALL
SELECT id_juego, 'CD Projekt Red' FROM juego WHERE titulo = 'Cyberpunk 2077'
UNION ALL
SELECT id_juego, 'CD Projekt Red' FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt';

-- ============================================
-- 7. LISTAS
-- ============================================

INSERT IGNORE INTO lista (nombre, descripcion, publica, id_usuario)
SELECT 'Pendientes 2025', 'Juegos que quiero pasarme este ano.', TRUE, id_usuario FROM usuario WHERE nombre = 'alex'
UNION ALL
SELECT 'Mis favoritos', 'Juegos que siempre recomiendo.', TRUE, id_usuario FROM usuario WHERE nombre = 'maria'
UNION ALL
SELECT 'Para jugar en Switch', 'Juegos portatiles perfectos.', TRUE, id_usuario FROM usuario WHERE nombre = 'juan';

-- ============================================
-- 8. RELACIONES: CONTIENE (Lista ↔ Juego)
-- ============================================

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT l.id_lista, j.id_juego, 1 FROM lista l, juego j WHERE l.nombre = 'Pendientes 2025' AND j.titulo = 'Elden Ring'
UNION ALL
SELECT l.id_lista, j.id_juego, 2 FROM lista l, juego j WHERE l.nombre = 'Pendientes 2025' AND j.titulo = 'Hollow Knight'
UNION ALL
SELECT l.id_lista, j.id_juego, 1 FROM lista l, juego j WHERE l.nombre = 'Mis favoritos' AND j.titulo = 'The Legend of Zelda: Breath of the Wild'
UNION ALL
SELECT l.id_lista, j.id_juego, 2 FROM lista l, juego j WHERE l.nombre = 'Mis favoritos' AND j.titulo = 'Elden Ring'
UNION ALL
SELECT l.id_lista, j.id_juego, 1 FROM lista l, juego j WHERE l.nombre = 'Para jugar en Switch' AND j.titulo = 'The Legend of Zelda: Breath of the Wild'
UNION ALL
SELECT l.id_lista, j.id_juego, 2 FROM lista l, juego j WHERE l.nombre = 'Para jugar en Switch' AND j.titulo = 'Hollow Knight';

-- ============================================
-- 9. GUARDA (Usuario ↔ Juego)
-- ============================================

INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT u.id_usuario, j.id_juego, 'jugando', 12.5 FROM usuario u, juego j WHERE u.nombre = 'alex' AND j.titulo = 'Elden Ring'
UNION ALL
SELECT u.id_usuario, j.id_juego, 'pendiente', 0.0 FROM usuario u, juego j WHERE u.nombre = 'alex' AND j.titulo = 'Hollow Knight'
UNION ALL
SELECT u.id_usuario, j.id_juego, 'completado', 80.0 FROM usuario u, juego j WHERE u.nombre = 'maria' AND j.titulo = 'The Legend of Zelda: Breath of the Wild'
UNION ALL
SELECT u.id_usuario, j.id_juego, 'jugando', 15.0 FROM usuario u, juego j WHERE u.nombre = 'maria' AND j.titulo = 'Hollow Knight'
UNION ALL
SELECT u.id_usuario, j.id_juego, 'pendiente', 0.0 FROM usuario u, juego j WHERE u.nombre = 'juan' AND j.titulo = 'Elden Ring'
UNION ALL
SELECT u.id_usuario, j.id_juego, 'completado', 120.0 FROM usuario u, juego j WHERE u.nombre = 'juan' AND j.titulo = 'The Witcher 3: Wild Hunt'
UNION ALL
SELECT u.id_usuario, j.id_juego, 'jugando', 45.0 FROM usuario u, juego j WHERE u.nombre = 'alex' AND j.titulo = 'Cyberpunk 2077';

-- ============================================
-- 10. RESEÑAS
-- ============================================

INSERT IGNORE INTO reseña (texto, nota, spoilers, likes, id_usuario, id_juego)
SELECT 'Un juegazo, el mundo abierto se siente vivo y desafiante.', 9.5, FALSE, 3, u.id_usuario, j.id_juego 
FROM usuario u, juego j WHERE u.nombre = 'alex' AND j.titulo = 'Elden Ring'
UNION ALL
SELECT 'La mejor aventura de mundo abierto que he jugado.', 10.0, FALSE, 5, u.id_usuario, j.id_juego 
FROM usuario u, juego j WHERE u.nombre = 'maria' AND j.titulo = 'The Legend of Zelda: Breath of the Wild'
UNION ALL
SELECT 'Arte precioso y combate muy satisfactorio.', 9.0, FALSE, 2, u.id_usuario, j.id_juego 
FROM usuario u, juego j WHERE u.nombre = 'alex' AND j.titulo = 'Hollow Knight'
UNION ALL
SELECT 'Muy dificil pero muy gratificante cuando avanzas.', 8.5, FALSE, 3, u.id_usuario, j.id_juego 
FROM usuario u, juego j WHERE u.nombre = 'juan' AND j.titulo = 'Elden Ring'
UNION ALL
SELECT 'Una obra maestra del RPG moderno.', 9.8, FALSE, 7, u.id_usuario, j.id_juego 
FROM usuario u, juego j WHERE u.nombre = 'maria' AND j.titulo = 'The Witcher 3: Wild Hunt'
UNION ALL
SELECT 'Bugs al principio pero ahora esta genial.', 8.0, FALSE, 1, u.id_usuario, j.id_juego 
FROM usuario u, juego j WHERE u.nombre = 'alex' AND j.titulo = 'Cyberpunk 2077';

-- ============================================
-- 11. SIGUE (Usuario ↔ Usuario)
-- ============================================

INSERT IGNORE INTO sigue (id_usuario_seguidor, id_usuario_seguido)
SELECT u1.id_usuario, u2.id_usuario FROM usuario u1, usuario u2 WHERE u1.nombre = 'alex' AND u2.nombre = 'maria'
UNION ALL
SELECT u1.id_usuario, u2.id_usuario FROM usuario u1, usuario u2 WHERE u1.nombre = 'alex' AND u2.nombre = 'juan'
UNION ALL
SELECT u1.id_usuario, u2.id_usuario FROM usuario u1, usuario u2 WHERE u1.nombre = 'maria' AND u2.nombre = 'alex'
UNION ALL
SELECT u1.id_usuario, u2.id_usuario FROM usuario u1, usuario u2 WHERE u1.nombre = 'juan' AND u2.id_usuario = u1.id_usuario AND u2.nombre = 'alex';

-- ============================================
-- FIN DE DATOS DE EJEMPLO
-- ============================================

