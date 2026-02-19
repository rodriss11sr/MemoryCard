-- ============================================
-- RESEÑAS DE MÚLTIPLES USUARIOS PARA EL MISMO JUEGO
-- Esto demuestra que varios usuarios pueden escribir reseñas del mismo juego
-- OPCIONAL: Ejecuta después de 02_datos_ejemplo.sql
-- ============================================

-- Primero, crear algunos usuarios adicionales de prueba
INSERT IGNORE INTO usuario (nombre, correo, contraseña, avatar) VALUES
('María García', 'maria@example.com', '$2y$10$YdbV7Hg614fthKlm3wWqUuesqmB1KwJHdzjQh57cYUIRy2AXoAs/u', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'),
('Juan Pérez', 'juan@example.com', '$2y$10$YdbV7Hg614fthKlm3wWqUuesqmB1KwJHdzjQh57cYUIRy2AXoAs/u', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan'),
('Ana López', 'ana@example.com', '$2y$10$YdbV7Hg614fthKlm3wWqUuesqmB1KwJHdzjQh57cYUIRy2AXoAs/u', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'),
('Carlos Ruiz', 'carlos@example.com', '$2y$10$YdbV7Hg614fthKlm3wWqUuesqmB1KwJHdzjQh57cYUIRy2AXoAs/u', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos');

-- Obtener IDs de usuarios (ajustar según tus usuarios existentes)
SET @gordon_id = (SELECT id_usuario FROM usuario WHERE nombre = 'Gordon Freeman' LIMIT 1);
SET @maria_id = (SELECT id_usuario FROM usuario WHERE nombre = 'María García' LIMIT 1);
SET @juan_id = (SELECT id_usuario FROM usuario WHERE nombre = 'Juan Pérez' LIMIT 1);
SET @ana_id = (SELECT id_usuario FROM usuario WHERE nombre = 'Ana López' LIMIT 1);
SET @carlos_id = (SELECT id_usuario FROM usuario WHERE nombre = 'Carlos Ruiz' LIMIT 1);

-- Obtener ID del juego "Assassin's Creed" (o el juego que quieras usar de ejemplo)
SET @juego_id = (SELECT id_juego FROM juego WHERE titulo LIKE '%Assassin%' LIMIT 1);

-- Si no existe Assassin's Creed, usar Elden Ring o el primer juego disponible
SET @juego_id = IFNULL(@juego_id, (SELECT id_juego FROM juego WHERE titulo = 'Elden Ring' LIMIT 1));
SET @juego_id = IFNULL(@juego_id, (SELECT MIN(id_juego) FROM juego LIMIT 1));

-- ============================================
-- CREAR RESEÑAS DE DIFERENTES USUARIOS PARA EL MISMO JUEGO
-- ============================================

-- Reseña de Gordon Freeman (si no existe ya)
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion) VALUES
(@gordon_id, @juego_id, 'Increíble juego. La historia es envolvente y el combate es fluido. Definitivamente uno de mis favoritos.', 4.5, NOW() - INTERVAL 5 DAY);

-- Reseña de María García
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion) VALUES
(@maria_id, @juego_id, 'Me encantó este juego. Los gráficos son impresionantes y la jugabilidad es muy adictiva. Lo recomiendo totalmente.', 4.0, NOW() - INTERVAL 4 DAY);

-- Reseña de Juan Pérez
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion) VALUES
(@juan_id, @juego_id, 'Buen juego en general, aunque tiene algunos bugs menores. La historia es interesante pero se vuelve repetitiva hacia el final.', 3.5, NOW() - INTERVAL 3 DAY);

-- Reseña de Ana López
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion) VALUES
(@ana_id, @juego_id, 'Obra maestra. Cada detalle está cuidado al máximo. El mundo abierto es enorme y lleno de secretos por descubrir.', 5.0, NOW() - INTERVAL 2 DAY);

-- Reseña de Carlos Ruiz
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion) VALUES
(@carlos_id, @juego_id, 'No está mal, pero esperaba más. La jugabilidad es sólida pero la historia no me enganchó tanto como pensaba.', 3.0, NOW() - INTERVAL 1 DAY);

-- ============================================
-- AÑADIR MÁS RESEÑAS PARA OTROS JUEGOS POPULARES
-- ============================================

-- Reseñas para Elden Ring (si existe)
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion)
SELECT @gordon_id, id_juego, 'El mejor soulslike que he jugado. El mundo es enorme y cada rincón tiene algo que descubrir.', 4.5, NOW() - INTERVAL 10 DAY
FROM juego WHERE titulo = 'Elden Ring' LIMIT 1;

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion)
SELECT @maria_id, id_juego, 'Muy difícil pero satisfactorio cuando logras vencer a los jefes. El diseño de niveles es increíble.', 4.5, NOW() - INTERVAL 9 DAY
FROM juego WHERE titulo = 'Elden Ring' LIMIT 1;

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion)
SELECT @juan_id, id_juego, 'Demasiado difícil para mi gusto, pero entiendo por qué a otros les encanta. Los gráficos son preciosos.', 3.5, NOW() - INTERVAL 8 DAY
FROM juego WHERE titulo = 'Elden Ring' LIMIT 1;

-- Reseñas para The Witcher 3 (si existe)
INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion)
SELECT @gordon_id, id_juego, 'Obra maestra absoluta. La mejor historia y mundo abierto que he experimentado.', 5.0, NOW() - INTERVAL 15 DAY
FROM juego WHERE titulo LIKE '%Witcher 3%' LIMIT 1;

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion)
SELECT @ana_id, id_juego, 'Increíble narrativa y personajes memorables. Las misiones secundarias son tan buenas como la principal.', 5.0, NOW() - INTERVAL 14 DAY
FROM juego WHERE titulo LIKE '%Witcher 3%' LIMIT 1;

INSERT IGNORE INTO reseña (id_usuario, id_juego, texto, nota, fecha_publicacion)
SELECT @carlos_id, id_juego, 'Muy bueno, aunque el combate se vuelve repetitivo después de un tiempo. La historia compensa.', 4.0, NOW() - INTERVAL 13 DAY
FROM juego WHERE titulo LIKE '%Witcher 3%' LIMIT 1;
