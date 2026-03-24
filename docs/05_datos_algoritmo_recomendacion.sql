-- ============================================
-- DATOS PREVIOS A LAS COLECCIONES DE JUEGOS (Generos, Desarrolladoras)
-- OPCIONAL: Ejecuta después de 02_datos_ejemplo.sql
-- ============================================

-- Insertar desarrolladoras si no existen
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('EA Canada');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('EA Vancouver');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('EA Sports');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('EA Sports FC');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('EA Tiburon');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('Rare');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('Konami');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('Konami Digital Entertainment');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('Strikerz');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('FX Interactive');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('Ubisoft Vancouver');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('SIE London Studio');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('Silicon Dreams Studios');
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('Sports Interactive');

-- Insertar plataformas si no existen
INSERT IGNORE INTO plataforma (nombre) VALUES ('PC');
INSERT IGNORE INTO plataforma (nombre) VALUES ('Nintendo 64');
INSERT IGNORE INTO plataforma (nombre) VALUES ('GameCube');
INSERT IGNORE INTO plataforma (nombre) VALUES ('PlayStation');
INSERT IGNORE INTO plataforma (nombre) VALUES ('PlayStation 2');
INSERT IGNORE INTO plataforma (nombre) VALUES ('PlayStation 3');
INSERT IGNORE INTO plataforma (nombre) VALUES ('PlayStation 4');
INSERT IGNORE INTO plataforma (nombre) VALUES ('PlayStation 5');
INSERT IGNORE INTO plataforma (nombre) VALUES ('Xbox');
INSERT IGNORE INTO plataforma (nombre) VALUES ('Xbox 360');
INSERT IGNORE INTO plataforma (nombre) VALUES ('Xbox One');
INSERT IGNORE INTO plataforma (nombre) VALUES ('Xbox Series X|S');

-- Insertar géneros si no existen
INSERT IGNORE INTO genero (nombre) VALUES ('Arcade');
INSERT IGNORE INTO genero (nombre) VALUES ('Strategy');
INSERT IGNORE INTO genero (nombre) VALUES ('Simulator');
INSERT IGNORE INTO genero (nombre) VALUES ('Sport');

-- ============================================
-- PRIMERA COLECCION DE JUEGOS (Simuladores de fútbol)
-- OPCIONAL: Ejecuta después de 02_datos_ejemplo.sql
-- ============================================

-- FIFA Soccer 12
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA Soccer 12',
    '2011-09-27',
    'FIFA 12 brings to the pitch the game-changing new Player Impact Engine, a physics engine built to deliver real-world physicality in every interaction on the pitch. Revolutionary gameplay innovations.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6hah.webp'
);
-- Obtener el ID del juego insertado
SET @id_juego_fifa12 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_juego_fifa12, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_juego_fifa12, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_juego_fifa12, 'EA Canada');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_juego_fifa12, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_juego_fifa12, 'Xbox 360');

-- Pro Evolution Soccer 2012
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'Pro Evolution Soccer 2012',
    '2011-09-27',
    'Pro Evolution Soccer 2012, abreviado PES 2012, es un simulador de fútbol con modo individual y multijugador desarrollado por Konami. Incluye mejoras en jugabilidad y animaciones respecto a entregas anteriores.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co4k5h.webp'
);
-- Obtener el ID del juego insertado
SET @id_pes2012 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_pes2012, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_pes2012, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_pes2012, 'Konami');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_pes2012, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_pes2012, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_pes2012, 'Xbox 360');

-- eFootball PES 2020
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'eFootball PES 2020',
    '2019-09-10',
    'eFootball PES 2020 es un simulador de fútbol desarrollado y publicado por Konami Digital Entertainment. Presenta la licencia UEFA Champions League y una gran mejora en la IA y física de jugadores.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1m14.webp'
);
-- Obtener el ID del juego insertado
SET @id_pes2020 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_pes2020, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_pes2020, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_pes2020, 'Konami Digital Entertainment');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_pes2020, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_pes2020, 'PlayStation 4');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_pes2020, 'Xbox One');

-- UFL
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'UFL',
    '2024-12-05',
    'UFL es un juego de fútbol competitivo free-to-play con énfasis en experiencia justa y física precisa, desarrollado por Strikerz sobre Unreal Engine 5.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/coaowu.webp'
);
-- Obtener el ID del juego insertado
SET @id_ufl = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_ufl, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_ufl, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_ufl, 'Strikerz');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_ufl, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_ufl, 'PlayStation 5');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_ufl, 'Xbox Series X|S');

-- FX Football
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FX Football',
    '2014-06-02',
    'FX Football es un juego de simulación de gestión futbolística donde el jugador administra equipos, finanzas, estadio, fichajes y tácticas.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/mbmlyyn2s7f0fxpp2hlk.webp'
);
-- Obtener el ID del juego insertado
SET @id_fx = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fx, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fx, 'Sport');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fx, 'Strategy');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fx, 'FX Interactive');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fx, 'PC');

-- Pure Football
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'Pure Football',
    '2010-05-27',
    'Pure Football es un arcade de fútbol desarrollado por Ubisoft Vancouver con controles rápidos y partidos 4v4, publicado para PlayStation 3 y Xbox 360.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/expyi9k9bvvo631fqmes.webp'
);
-- Obtener el ID del juego insertado
SET @id_pure = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_pure, 'Sport');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_pure, 'Arcade');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_pure, 'Ubisoft Vancouver');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_pure, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_pure, 'Xbox 360');

-- This Is Football 2002
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'This Is Football 2002',
    '2002-03-17',
    'This Is Football 2002 es un juego de fútbol arcade/simulador desarrollado por SIE London Studio para PlayStation 2.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co1p33.webp'
);
-- Obtener el ID del juego insertado
SET @id_tif2002 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_tif2002, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_tif2002, 'SIE London Studio');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_tif2002, 'PlayStation 2');

-- UEFA Champions League Season 1999/2000
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'UEFA Champions League Season 1999/2000',
    '2000-04-24',
    'Simulador de fútbol oficial de la Champions League 1999/2000 con equipos y trofeos reales, desarrollado por Silicon Dreams Studios.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co8saj.webp'
);
-- Obtener el ID del juego insertado
SET @id_uefa9900 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_uefa9900, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_uefa9900, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_uefa9900, 'Silicon Dreams Studios');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_uefa9900, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_uefa9900, 'PlayStation');

-- Football Manager 2008
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'Football Manager 2008',
    '2007-10-18',
    'Football Manager 2008 es un simulador de gestión de fútbol desarrollado por Sports Interactive y publicado por Sega, con versiones para PC y Mac.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2k75.webp'
);
-- Obtener el ID del juego insertado
SET @id_fm2008 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fm2008, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fm2008, 'Sport');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fm2008, 'Strategy');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fm2008, 'Sports Interactive');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fm2008, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fm2008, 'Xbox 360');


-- FIFA Street 3
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA Street 3',
    '2012-03-27',
    'FIFA Street 3 es un juego de fútbol callejero con trucos y ritmo rápido, desarrollado por EA Canada y PlayFish, en varias plataformas incluida PC.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co20b7.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_street_3 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_street_3, 'Sport');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_street_3, 'Arcade');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_street_3, 'EA Canada');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_street_3, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_street_3, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_street_3, 'Xbox 360');

-- FIFA Street 2
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA Street 2',
    '2006-03-02',
    'FIFA Street 2 es un juego de fútbol callejero con controles táctiles rápidos y estilos de juego urbanos, por EA Sports.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co20b2.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_street_2 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_street_2, 'Sport');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_street_2, 'Arcade');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_street_2, 'EA Sports');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_street_2, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_street_2, 'Xbox');

-- FIFA Street
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA Street',
    '2005-02-11',
    'FIFA Street es la entrega original del arcade de fútbol callejero de EA Sports con juego rápido y dribbling estilizado.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co20b8.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_street_1 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_street_1, 'Sport');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_street_1, 'Arcade');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_street_1, 'EA Sports');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_street_1, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_street_1, 'GameCube');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_street_1, 'Xbox');

-- FIFA 07
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA 07',
    '2006-09-26',
    'FIFA 07 es un simulador de fútbol con nuevas mecánicas de dribbling y movimientos de jugadores, por EA Canada.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co207a.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_07 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_07, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_07, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_07, 'EA Canada');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_07, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_07, 'Xbox 360');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_07, 'PC');

-- FIFA 97
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA 97',
    '1996-11-22',
    'FIFA 97 es un juego histórico de EA Sports con progresos en animación y motor de juego para la época.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2f6v.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_97 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_97, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_97, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_97, 'EA Sports');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_97, 'PlayStation');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_97, 'PC');

-- FIFA 13
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA 13',
    '2012-09-25',
    'FIFA 13 introduce mejoras en First Touch y Balón Inteligente, con gran presencia en consolas y PC.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co206y.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_13 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_13, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_13, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_13, 'EA Canada');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_13, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_13, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_13, 'Xbox 360');

-- FIFA 21
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA 21',
    '2020-10-09',
    'FIFA 21 sigue mejorando el modo Carrera y VOLTA, con jugabilidad refinada y cross-play en consolas de nueva generación.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wm2.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_21 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_21, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_21, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_21, 'EA Vancouver');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_21, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_21, 'PlayStation 4');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_21, 'Xbox One');

-- FIFA 06
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA 06',
    '2005-09-29',
    'FIFA 06 es un clásico de EA Sports con mejoras en el sistema de pases y controles de ataque.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2079.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_06 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_06, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_06, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_06, 'EA Canada');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_06, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_06, 'Xbox 360');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_06, 'PC');

-- FIFA 64
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA 64',
    '1997-04-03',
    'FIFA 64 fue la primera entrega de FIFA en Nintendo 64 y PC con varias licencias internacionales.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co207w.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_64 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_64, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_64, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_64, 'EA Sports');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_64, 'Nintendo 64');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_64, 'PC');

-- FIFA 22
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA 22',
    '2021-10-01',
    'FIFA 22 introduce Hypermotion, mejoras en el realismo físico y contenido de FIFA Ultimate Team.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3dsm.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_22 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_22, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_22, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_22, 'EA Vancouver');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_22, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_22, 'PlayStation 4');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_22, 'Xbox One');

-- FIFA 05
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'FIFA 05',
    '2004-09-29',
    'FIFA 05 es un título de EA Sports con sistema de tácticas mejorado y modos multijugador tradicionales.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co691k.webp'
);
-- Obtener el ID del juego insertado
SET @id_fifa_05 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_05, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_fifa_05, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_fifa_05, 'EA Sports');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_05, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_05, 'Xbox');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_fifa_05, 'PC');

-- EA FC 24
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'EA FC 24',
    '2023-09-29',
    'EA FC 24 es la primera entrega bajo la nueva marca tras FIFA, con cambios en jugabilidad y licencias globales.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co6qqa.webp'
);
-- Obtener el ID del juego insertado
SET @id_eafc24 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_eafc24, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_eafc24, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_eafc24, 'EA Sports FC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc24, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc24, 'PlayStation 5');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc24, 'Xbox Series X|S');

-- EA FC 25
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'EA FC 25',
    '2024-09-27',
    'EA FC 25 continúa el legado con “Momentos Icónicos” y un modo Kick-Off refinado, construyendo sobre EA FC 24.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/coa755.webp'
);
-- Obtener el ID del juego insertado
SET @id_eafc25 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_eafc25, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_eafc25, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_eafc25, 'EA Sports FC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc25, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc25, 'PlayStation 5');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc25, 'Xbox Series X|S');

-- ============================================
-- SEGUNDA COLECCION DE JUEGOS (Simuladores de baloncesto)
-- ============================================

-- Insertar desarrolladoras si no existen
INSERT IGNORE INTO desarrolladora (nombre) VALUES ('Visual Concepts');

-- NBA 2K24
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA 2K24',
    '2023-09-08',
    'NBA 2K24 brings to the pitch the game-changing new Player Impact Engine, a physics engine built to deliver real-world physicality in every interaction on the pitch. Revolutionary gameplay innovations.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co8m0s.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba2k24 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k24, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k24, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba2k24, 'Visual Concepts');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k24, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k24, 'PlayStation 4');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k24, 'PlayStation 5');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k24, 'Xbox One');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k24, 'Xbox Series X|S');

-- NBA 2K26
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA 2K26',
    '2025-09-05',
    'Bragging rights are on the line in MyCAREER, MyTEAM, MyNBA, The W, and Play Now. Showcase your bag of moves with hyper realism, Powered by ProPLAY, and challenge your friends, or rivals, in NBA 2K26’s...',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/coa3pk.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba2k26 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k26, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k26, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba2k26, 'Visual Concepts');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k26, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k26, 'PlayStation 4');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k26, 'PlayStation 5');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k26, 'Xbox One');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k26, 'Xbox Series X|S');

-- NBA 2K2
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA 2K2',
    '2001-10-23',
    'NBA 2K2 is a basketball video game. It is the third installment in the NBA 2K series of video games and it was developed by Visual Concepts and published by Sega Sports. It was released on October 24,...',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2gn5.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba2k2 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k2, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k2, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba2k2, 'Visual Concepts');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k2, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k2, 'Xbox');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k2, 'GameCube');

-- ESPN NBA Basketball
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'ESPN NBA Basketball',
    '2003-10-21',
    'Experience the thrill of playing in a real ESPN NBA game, complete with detailed visuals, eye-catching callouts along with studio and color commentary featuring Kevin Frazier and Tom Tolbert.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/dvplnbpslzgqvdi0crkm.webp'
);
-- Obtener el ID del juego insertado
SET @id_espn_nba = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_espn_nba, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_espn_nba, 'Visual Concepts');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_espn_nba, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_espn_nba, 'Xbox');

-- NBA 2K9
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA 2K9',
    '2008-10-07',
    'Improved facial and skin textures, better uniforms, improved eye movement and more realistic crowd reactions bring the game alive like never before. Analyst Clark Kellogg and sideline reporter Cheryl ...',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2gn9.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba2k9 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k9, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k9, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba2k9, 'Visual Concepts');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k9, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k9, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k9, 'Xbox 360');

-- NBA 2K11
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA 2K11',
    '2010-10-05',
    'NBA 2K11 is a basketball video game developed by Visual Concepts and 2K Sports and published by 2K Sports. It was released on October 5, 2010 on the Xbox 360, PlayStation 2, PlayStation 3, PSP, Window...',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2gih.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba2k11 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba2k11, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba2k11, 'Visual Concepts');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k11, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k11, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k11, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba2k11, 'Xbox 360');

-- NBA Live 09
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA Live 09',
    '2008-10-07',
    'NBA Live 09, sometimes called NBA Live 2009, is the 2008 installment in the NBA Live series, developed and published by Electronic Arts. The original release date was October 7, 2008. The game feature...',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co39s9.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba_live_09 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba_live_09, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba_live_09, 'EA Canada');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba_live_09, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba_live_09, 'Xbox 360');

-- NBA Live 10
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA Live 10',
    '2009-10-06',
    'NBA Live 10 is the 2009 installment in the NBA Live series, developed by EA Canada and published by Electronic Arts. Dwight Howard of the Orlando Magic is the cover athlete. It was released in 2009 fo...',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co39pj.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba_live_10 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba_live_10, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba_live_10, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba_live_10, 'EA Canada');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba_live_10, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba_live_10, 'Xbox 360');

-- NBA Jam
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA Jam',
    '2010-11-17',
    'Return to the roots of arcade NBA basketball in the 2010 installment of NBA Jam. Developed by EA Canada for seventh-generation game consoles, this rebirth brings back the gameplay, aesthetics, and gra...',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co2gif.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba_jam = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba_jam, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba_jam, 'EA Canada');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba_jam, 'PlayStation 3');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba_jam, 'Xbox 360');

-- NBA Street V3
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'NBA Street V3',
    '2005-02-08',
    'NBA Street V3 is a basketball video game developed by EA Canada and published by EA Sports BIG. It was released in 2005 for PlayStation 2 and Xbox.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/co3ddi.webp'
);
-- Obtener el ID del juego insertado
SET @id_nba_street_v3 = LAST_INSERT_ID();
-- Relacionar con géneros
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_nba_street_v3, 'Sport');
-- Relacionar con desarrolladora
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_nba_street_v3, 'EA Canada');
-- Relacionar con plataformas
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba_street_v3, 'PlayStation 2');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_nba_street_v3, 'Xbox');

-- EA FC 26
INSERT INTO juego (titulo, fecha_lanzamiento, descripcion, portada) VALUES (
    'EA FC 26',
    '2025-09-26',
    'EA FC 26 agrega más fluidez y funciones para la comunidad, con previsualización de atletas y modo club mejorado.',
    'https://images.igdb.com/igdb/image/upload/t_cover_big/coa5wx.webp'
);
-- Obtener el ID del juego insertado
SET @id_eafc26 = LAST_INSERT_ID();
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_eafc26, 'Simulator');
INSERT INTO pertenece (id_juego, nombre_genero) VALUES (@id_eafc26, 'Sport');
INSERT INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (@id_eafc26, 'EA Sports FC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc26, 'PC');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc26, 'PlayStation 5');
INSERT INTO lanza (id_juego, nombre_plataforma) VALUES (@id_eafc26, 'Xbox Series X|S');

-- ============================================
-- COLECCION DE JUEGOS 2 (NBA)
-- OPCIONAL: Ejecuta después de 02_datos_ejemplo.sql
-- ============================================


