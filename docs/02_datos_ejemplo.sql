-- ============================================
-- DATOS DE EJEMPLO PARA MEMORY CARD
-- Usuario de prueba + Lista grande de juegos populares
-- ============================================
-- IMPORTANTE: Ejecuta primero 01_schema.sql antes de este archivo

-- ============================================
-- 1. USUARIO DE EJEMPLO
-- ============================================
-- Contraseña: "123456" (hasheada con password_hash)
INSERT INTO usuario (nombre, correo, contraseña, avatar) VALUES
('Gordon Freeman', 'gordon@example.com', '$2y$10$YdbV7Hg614fthKlm3wWqUuesqmB1KwJHdzjQh57cYUIRy2AXoAs/u', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gordon')
ON DUPLICATE KEY UPDATE nombre=nombre;

-- Obtener el ID del usuario (normalmente será 1 si es el primero)
SET @user_id = (SELECT id_usuario FROM usuario WHERE nombre = 'Gordon Freeman' LIMIT 1);

-- ============================================
-- 2. JUEGOS POPULARES (Lista grande)
-- ============================================

INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES
-- RPGs y Aventuras
('The Witcher 3: Wild Hunt', '2015-05-19', 'RPG de mundo abierto basado en la saga de libros de Andrzej Sapkowski. Controla a Geralt de Rivia en su búsqueda de Ciri.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.webp'),
('Elden Ring', '2022-02-25', 'Dark fantasy action RPG desarrollado por FromSoftware y producido junto a George R. R. Martin.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp'),
('The Legend of Zelda: Breath of the Wild', '2017-03-03', 'Aventura de mundo abierto donde Link despierta tras 100 años de sueño para derrotar a Ganon.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('The Legend of Zelda: Tears of the Kingdom', '2023-05-12', 'Secuela directa de Breath of the Wild con un mundo abierto ampliado y mecánicas de construcción.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5o.webp'),
('Baldur''s Gate 3', '2023-08-03', 'RPG basado en Dungeons & Dragons con enorme libertad de decisiones y cooperativo.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6l6b.webp'),
('Starfield', '2023-09-06', 'RPG de ciencia ficción en el espacio creado por Bethesda Game Studios.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5o.webp'),
('Cyberpunk 2077: Phantom Liberty', '2023-09-26', 'Expansión de Cyberpunk 2077 con nueva historia de espionaje y personajes únicos.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5o.webp'),
('Persona 5 Royal', '2020-03-31', 'RPG japonés con mecánicas de simulación social y combate por turnos mejorado.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('Final Fantasy XVI', '2023-06-22', 'Nueva entrega de la saga Final Fantasy con combate en tiempo real y mundo abierto.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5o.webp'),
('Hades', '2020-09-17', 'Roguelike con narrativa excelente y combate rápido y fluido.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r7y.webp'),
('Hollow Knight', '2017-02-24', 'Metroidvania con arte hermoso y mundo interconectado lleno de secretos.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('Stardew Valley', '2016-02-26', 'Simulación de granja con elementos de RPG y construcción.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r7y.webp'),
('Assassin''s Creed', '2007-11-13', 'Acción-aventura de sigilo ambientada en la Tercera Cruzada.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('Resident Evil 4', '2023-03-24', 'Remake del clásico de terror y supervivencia con gráficos modernos.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5o.webp'),
('God of War', '2018-04-20', 'Aventura épica con Kratos y su hijo Atreus en el mundo nórdico.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('The Last of Us Part II', '2020-06-19', 'Aventura post-apocalíptica con narrativa emocional intensa.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('Red Dead Redemption 2', '2018-10-26', 'Western de mundo abierto con historia profunda y mundo vivo.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('Ghost of Tsushima', '2020-07-17', 'Aventura de samuráis con combate fluido y mundo hermoso.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('Horizon Zero Dawn', '2017-02-28', 'Aventura de mundo abierto con robots y tribus humanas.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('Spider-Man', '2018-09-07', 'Aventura de superhéroes con mecánicas de combate y exploración únicas.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
-- Otros populares
('Among Us', '2018-06-15', 'Multijugador social donde encuentras al impostor entre tu tripulación.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r7y.webp'),
('Fall Guys', '2020-08-04', 'Battle royale multijugador con minijuegos caóticos y divertidos.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r7y.webp'),
('Valorant', '2020-06-02', 'Shooter táctico 5v5 con personajes únicos y habilidades especiales.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r7y.webp'),
('Apex Legends', '2019-02-04', 'Battle royale con héroes únicos y mecánicas de movimiento fluidas.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp'),
('Overwatch 2', '2022-10-04', 'Shooter de héroes con personajes únicos y partidas 5v5.', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5o.webp')
ON DUPLICATE KEY UPDATE titulo=titulo;

-- ============================================
-- 3. PLATAFORMAS (si no existen ya)
-- ============================================
INSERT IGNORE INTO plataforma (nombre) VALUES
('PC'), ('PlayStation 5'), ('Xbox Series X'), ('Nintendo Switch'),
('PlayStation 4'), ('Xbox One'), ('PlayStation 3'), ('Xbox 360'),
('Nintendo 3DS'), ('PlayStation Vita'), ('iOS'), ('Android');

-- ============================================
-- 4. GÉNEROS (si no existen ya)
-- ============================================
INSERT IGNORE INTO genero (nombre) VALUES
('Acción'), ('Aventura'), ('RPG'), ('Estrategia'), ('Shooter'),
('Plataformas'), ('Puzzle'), ('Simulación'), ('Deportes'), ('Carreras'),
('Lucha'), ('Terror'), ('Supervivencia'), ('Indie'), ('Multijugador');

-- ============================================
-- 5. DESARROLLADORAS (si no existen ya)
-- ============================================
INSERT IGNORE INTO desarrolladora (nombre) VALUES
('FromSoftware'), ('Nintendo'), ('CD Projekt Red'), ('Rockstar Games'),
('Valve'), ('Bethesda Game Studios'), ('Ubisoft'), ('Sony Interactive Entertainment'),
('Larian Studios'), ('Supergiant Games'), ('Team Cherry'), ('ConcernedApe');

-- ============================================
-- 6. RELACIONES: JUEGOS - PLATAFORMAS
-- ============================================
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma)
SELECT id_juego, 'PC' FROM juego WHERE titulo IN (
    'The Witcher 3: Wild Hunt', 'Elden Ring', 'Baldur''s Gate 3',
    'Starfield', 'Hades', 'Hollow Knight', 'Stardew Valley', 'Cyberpunk 2077: Phantom Liberty'
);

INSERT IGNORE INTO lanza (id_juego, nombre_plataforma)
SELECT id_juego, 'PlayStation 5' FROM juego WHERE titulo IN (
    'Elden Ring', 'God of War', 'The Last of Us Part II', 'Ghost of Tsushima',
    'Horizon Zero Dawn', 'Spider-Man', 'Final Fantasy XVI'
);

INSERT IGNORE INTO lanza (id_juego, nombre_plataforma)
SELECT id_juego, 'Nintendo Switch' FROM juego WHERE titulo IN (
    'The Legend of Zelda: Breath of the Wild', 'The Legend of Zelda: Tears of the Kingdom',
    'Hades', 'Hollow Knight', 'Stardew Valley'
);

-- ============================================
-- 7. RELACIONES: JUEGOS - GÉNEROS
-- ============================================
INSERT IGNORE INTO pertenece (id_juego, nombre_genero)
SELECT id_juego, 'RPG' FROM juego WHERE titulo IN (
    'The Witcher 3: Wild Hunt', 'Elden Ring', 'Baldur''s Gate 3',
    'Persona 5 Royal', 'Final Fantasy XVI', 'Starfield'
);

INSERT IGNORE INTO pertenece (id_juego, nombre_genero)
SELECT id_juego, 'Aventura' FROM juego WHERE titulo IN (
    'The Legend of Zelda: Breath of the Wild', 'The Legend of Zelda: Tears of the Kingdom',
    'Assassin''s Creed', 'God of War', 'The Last of Us Part II'
);

-- ============================================
-- 8. RELACIONES: JUEGOS - DESARROLLADORAS
-- ============================================
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora)
SELECT id_juego, 'CD Projekt Red' FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt';

INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora)
SELECT id_juego, 'FromSoftware' FROM juego WHERE titulo = 'Elden Ring';

INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora)
SELECT id_juego, 'Larian Studios' FROM juego WHERE titulo = 'Baldur''s Gate 3';

-- ============================================
-- 9. JUEGOS GUARDADOS DEL USUARIO (tabla guarda)
-- ============================================
INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT @user_id, id_juego, 'completado', 120.5 FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt';

INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT @user_id, id_juego, 'jugando', 45.0 FROM juego WHERE titulo = 'Elden Ring';

INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT @user_id, id_juego, 'completado', 80.0 FROM juego WHERE titulo = 'Baldur''s Gate 3';

INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT @user_id, id_juego, 'pendiente', 0 FROM juego WHERE titulo IN (
    'Starfield', 'The Legend of Zelda: Tears of the Kingdom', 'Resident Evil 4'
);

INSERT IGNORE INTO guarda (id_usuario, id_juego, estado, horas_jugadas)
SELECT @user_id, id_juego, 'jugando', 25.5 FROM juego WHERE titulo IN (
    'Hades', 'Hollow Knight', 'Stardew Valley'
);

-- ============================================
-- 10. RESEÑAS DEL USUARIO
-- ============================================
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, id_juego, 'Obra maestra absoluta. La mejor historia y mundo abierto que he experimentado.', 10.0
FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt';

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, id_juego, 'Increíblemente desafiante pero satisfactorio. El combate es perfecto.', 9.0
FROM juego WHERE titulo = 'Elden Ring';

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, id_juego, 'El mejor RPG que he jugado. La libertad de elección es impresionante.', 10.0
FROM juego WHERE titulo = 'Baldur''s Gate 3';

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota)
SELECT @user_id, id_juego, 'Muy adictivo. Cada run es diferente y emocionante.', 9.0
FROM juego WHERE titulo = 'Hades';

-- ============================================
-- 11. LISTA PERSONALIZADA DEL USUARIO
-- ============================================
INSERT IGNORE INTO lista (nombre, descripcion, id_usuario, publica)
VALUES ('Mis RPGs Favoritos', 'Los mejores RPGs que he jugado', @user_id, TRUE);

SET @lista_id = LAST_INSERT_ID();
-- Si la lista ya existe, obtener su ID
SET @lista_id = IFNULL(@lista_id, (SELECT id_lista FROM lista WHERE nombre = 'Mis RPGs Favoritos' AND id_usuario = @user_id LIMIT 1));

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT @lista_id, id_juego, 1 FROM juego WHERE titulo = 'The Witcher 3: Wild Hunt';

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT @lista_id, id_juego, 2 FROM juego WHERE titulo = 'Elden Ring';

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT @lista_id, id_juego, 3 FROM juego WHERE titulo = 'Baldur''s Gate 3';

INSERT IGNORE INTO contiene (id_lista, id_juego, orden)
SELECT @lista_id, id_juego, 4 FROM juego WHERE titulo = 'Persona 5 Royal';
