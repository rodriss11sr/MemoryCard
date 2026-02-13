-- ============================================
-- ASOCIAR DATOS EXISTENTES AL USUARIO GORDON FREEMAN
-- OPCIONAL: Ejecuta después de 02_datos_ejemplo.sql
-- Si el usuario Gordon Freeman ya existe pero no tiene juegos/reseñas asociados
-- ============================================

-- Obtener ID del usuario Gordon Freeman
SET @user_id = (SELECT id_usuario FROM usuario WHERE nombre = 'Gordon Freeman' LIMIT 1);

-- Si no existe, crear el usuario
INSERT IGNORE INTO usuario (nombre, correo, contraseña, avatar) VALUES
('Gordon Freeman', 'gordon@example.com', '$2y$10$YdbV7Hg614fthKlm3wWqUuesqmB1KwJHdzjQh57cYUIRy2AXoAs/u', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gordon');

SET @user_id = IFNULL(@user_id, (SELECT id_usuario FROM usuario WHERE nombre = 'Gordon Freeman' LIMIT 1));

-- ============================================
-- 1. AÑADIR JUEGOS A LA BIBLIOTECA DEL USUARIO
-- ============================================
INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT @user_id, id_juego, 'completado', 50.0 
FROM juego 
WHERE id_juego NOT IN (SELECT id_juego FROM guarda WHERE id_usuario = @user_id)
LIMIT 5;

INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT @user_id, id_juego, 'pendiente', 0 
FROM juego 
WHERE titulo IN (
    'Starfield', 
    'The Legend of Zelda: Tears of the Kingdom',
    'Resident Evil 4',
    'Cyberpunk 2077: Phantom Liberty'
)
LIMIT 4;

-- Si no encuentras esos juegos, asocia los primeros 5 juegos que tengas
INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT @user_id, id_juego, 'completado', 50.0 
FROM juego 
WHERE id_juego NOT IN (SELECT id_juego FROM guarda WHERE id_usuario = @user_id)
LIMIT 3;

-- ============================================
-- 2. CREAR RESEÑAS DEL USUARIO
-- ============================================
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, id_juego, 'Obra maestra absoluta. La mejor historia y mundo abierto que he experimentado.', 10.0
FROM juego 
WHERE titulo = 'The Witcher 3: Wild Hunt' OR titulo LIKE 'The Witcher%'
LIMIT 1;

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, id_juego, 'Increíblemente desafiante pero satisfactorio. El combate es perfecto.', 9.0
FROM juego 
WHERE titulo = 'Elden Ring'
LIMIT 1;

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, id_juego, 'El mejor RPG que he jugado. La libertad de elección es impresionante.', 10.0
FROM juego 
WHERE titulo = 'Baldur''s Gate 3'
LIMIT 1;

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, id_juego, 'Muy adictivo. Cada run es diferente y emocionante.', 9.0
FROM juego 
WHERE titulo = 'Hades'
LIMIT 1;

-- Si no encuentras esos juegos, crea reseñas para los primeros juegos que tenga guardados
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, g.id_juego, 'Gran juego, lo recomiendo totalmente.', 8.0
FROM guarda g
WHERE g.id_usuario = @user_id 
  AND g.id_juego NOT IN (SELECT id_juego FROM reseña WHERE id_usuario = @user_id)
LIMIT 2;

-- ============================================
-- 3. CREAR LISTA PERSONALIZADA
-- ============================================
INSERT IGNORE INTO lista (nombre, descripcion, id_usuario, publica)
VALUES ('Mis RPGs Favoritos', 'Los mejores RPGs que he jugado', @user_id, TRUE);

SET @lista_id = LAST_INSERT_ID();
SET @lista_id = IFNULL(@lista_id, (SELECT id_lista FROM lista WHERE nombre = 'Mis RPGs Favoritos' AND id_usuario = @user_id LIMIT 1));

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT @lista_id, id_juego, 1 FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt' LIMIT 1;

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT @lista_id, id_juego, 2 FROM juego WHERE titulo = 'Elden Ring' LIMIT 1;

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT @lista_id, id_juego, 3 FROM juego WHERE titulo = 'Baldur''s Gate 3' LIMIT 1;

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT @lista_id, id_juego, 4 FROM juego WHERE titulo = 'Persona 5 Royal' LIMIT 1;
