-- ============================================
-- RELACIONES COMPLETAS: Plataformas, Géneros y Desarrolladoras
-- Para juegos IDs 1-63 (los IDs 64+ ya tienen datos)
-- Ejecuta en phpMyAdmin después de tener los juegos insertados
-- ============================================

-- ============================================
-- 1. NUEVAS DESARROLLADORAS
-- ============================================
INSERT IGNORE INTO desarrolladora (nombre) VALUES
('Ubisoft Montreal'),
('Atlus'),
('Square Enix'),
('BioWare'),
('Santa Monica Studio'),
('Naughty Dog'),
('Guerrilla Games'),
('Sucker Punch Productions'),
('Infinity Ward'),
('343 Industries'),
('id Software'),
('Respawn Entertainment'),
('Firaxis Games'),
('Creative Assembly'),
('Colossal Order'),
('Paradox Development Studio'),
('Maddy Makes Games'),
('Toby Fox'),
('Studio MDHR'),
('Capcom'),
('Motive Studio'),
('Endnight Games'),
('Unknown Worlds Entertainment'),
('Polyphony Digital'),
('Playground Games'),
('Psyonix'),
('Mojang Studios'),
('Bandai Namco Studios'),
('MercurySteam'),
('Game Freak'),
('Innersloth'),
('Mediatonic'),
('Riot Games'),
('Blizzard Entertainment');

-- ============================================
-- 2. RELACIONES: JUEGO - DESARROLLADORA
-- ============================================

-- ID 1: Assassin's Creed
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (1, 'Ubisoft Montreal');

-- ID 2: Elden Ring
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (2, 'FromSoftware');

-- ID 3: The Legend of Zelda: Tears of the Kingdom
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (3, 'Nintendo');

-- ID 4: Starfield
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (4, 'Bethesda Game Studios');

-- ID 5: Cyberpunk 2077: Phantom Liberty
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (5, 'CD Projekt Red');

-- ID 6: Baldur's Gate 3
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (6, 'Larian Studios');

-- ID 7: The Witcher 3: Wild Hunt
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (7, 'CD Projekt Red');

-- ID 9: The Legend of Zelda: Breath of the Wild
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (9, 'Nintendo');

-- ID 12: Persona 5 Royal
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (12, 'Atlus');

-- ID 13: Final Fantasy VII Remake
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (13, 'Square Enix');

-- ID 14: Mass Effect 2
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (14, 'BioWare');

-- ID 15: Red Dead Redemption 2
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (15, 'Rockstar Games');

-- ID 16: God of War (2018)
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (16, 'Santa Monica Studio');

-- ID 17: The Last of Us Part II
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (17, 'Naughty Dog');

-- ID 18: Uncharted 4: A Thief's End
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (18, 'Naughty Dog');

-- ID 19: Horizon Zero Dawn
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (19, 'Guerrilla Games');

-- ID 20: Horizon Forbidden West
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (20, 'Guerrilla Games');

-- ID 21: Assassin's Creed Valhalla
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (21, 'Ubisoft Montreal');

-- ID 22: Ghost of Tsushima
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (22, 'Sucker Punch Productions');

-- ID 24: Cyberpunk 2077: Phantom Liberty (duplicado)
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (24, 'CD Projekt Red');

-- ID 25: Call of Duty: Modern Warfare II
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (25, 'Infinity Ward');

-- ID 26: Halo Infinite
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (26, '343 Industries');

-- ID 27: DOOM Eternal
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (27, 'id Software');

-- ID 28: Titanfall 2
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (28, 'Respawn Entertainment');

-- ID 30: Civilization VI
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (30, 'Firaxis Games');

-- ID 31: Total War: Warhammer III
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (31, 'Creative Assembly');

-- ID 32: Cities: Skylines
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (32, 'Colossal Order');

-- ID 33: Stellaris
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (33, 'Paradox Development Studio');

-- ID 34: Hades
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (34, 'Supergiant Games');

-- ID 35: Celeste
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (35, 'Maddy Makes Games');

-- ID 36: Hollow Knight
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (36, 'Team Cherry');

-- ID 37: Stardew Valley
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (37, 'ConcernedApe');

-- ID 38: Undertale
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (38, 'Toby Fox');

-- ID 39: Cuphead
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (39, 'Studio MDHR');

-- ID 40: Resident Evil 4 (Remake)
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (40, 'Capcom');

-- ID 41: Resident Evil Village
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (41, 'Capcom');

-- ID 42: Dead Space (Remake)
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (42, 'Motive Studio');

-- ID 43: The Forest
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (43, 'Endnight Games');

-- ID 44: Subnautica
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (44, 'Unknown Worlds Entertainment');

-- ID 45: FIFA 23
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (45, 'EA Canada');

-- ID 46: Gran Turismo 7
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (46, 'Polyphony Digital');

-- ID 47: Forza Horizon 5
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (47, 'Playground Games');

-- ID 48: Rocket League
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (48, 'Psyonix');

-- ID 49: The Elder Scrolls V: Skyrim
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (49, 'Bethesda Game Studios');

-- ID 50: Grand Theft Auto V
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (50, 'Rockstar Games');

-- ID 51: Minecraft
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (51, 'Mojang Studios');

-- ID 52: Portal 2
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (52, 'Valve');

-- ID 53: Half-Life: Alyx
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (53, 'Valve');

-- ID 54: Super Mario Odyssey
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (54, 'Nintendo');

-- ID 55: Super Smash Bros. Ultimate
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (55, 'Bandai Namco Studios');

-- ID 56: Animal Crossing: New Horizons
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (56, 'Nintendo');

-- ID 57: Metroid Dread
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (57, 'MercurySteam');

-- ID 58: Pokémon Scarlet
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (58, 'Game Freak');

-- ID 59: Among Us
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (59, 'Innersloth');

-- ID 60: Fall Guys
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (60, 'Mediatonic');

-- ID 61: Valorant
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (61, 'Riot Games');

-- ID 62: Apex Legends
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (62, 'Respawn Entertainment');

-- ID 63: Overwatch 2
INSERT IGNORE INTO desarrolla (id_juego, nombre_desarrolladora) VALUES (63, 'Blizzard Entertainment');


-- ============================================
-- 3. RELACIONES: JUEGO - GÉNERO
-- ============================================

-- ID 1: Assassin's Creed
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (1, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (1, 'Aventura');

-- ID 2: Elden Ring
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (2, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (2, 'Acción');

-- ID 3: The Legend of Zelda: Tears of the Kingdom
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (3, 'Aventura');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (3, 'RPG');

-- ID 4: Starfield
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (4, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (4, 'Acción');

-- ID 5: Cyberpunk 2077: Phantom Liberty
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (5, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (5, 'Acción');

-- ID 6: Baldur's Gate 3
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (6, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (6, 'Aventura');

-- ID 7: The Witcher 3: Wild Hunt
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (7, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (7, 'Aventura');

-- ID 9: The Legend of Zelda: Breath of the Wild
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (9, 'Aventura');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (9, 'RPG');

-- ID 12: Persona 5 Royal
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (12, 'RPG');

-- ID 13: Final Fantasy VII Remake
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (13, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (13, 'Acción');

-- ID 14: Mass Effect 2
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (14, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (14, 'Shooter');

-- ID 15: Red Dead Redemption 2
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (15, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (15, 'Aventura');

-- ID 16: God of War (2018)
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (16, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (16, 'Aventura');

-- ID 17: The Last of Us Part II
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (17, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (17, 'Aventura');

-- ID 18: Uncharted 4: A Thief's End
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (18, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (18, 'Aventura');

-- ID 19: Horizon Zero Dawn
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (19, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (19, 'Acción');

-- ID 20: Horizon Forbidden West
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (20, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (20, 'Acción');

-- ID 21: Assassin's Creed Valhalla
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (21, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (21, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (21, 'Aventura');

-- ID 22: Ghost of Tsushima
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (22, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (22, 'Aventura');

-- ID 24: Cyberpunk 2077: Phantom Liberty (duplicado)
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (24, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (24, 'Acción');

-- ID 25: Call of Duty: Modern Warfare II
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (25, 'Shooter');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (25, 'Acción');

-- ID 26: Halo Infinite
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (26, 'Shooter');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (26, 'Acción');

-- ID 27: DOOM Eternal
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (27, 'Shooter');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (27, 'Acción');

-- ID 28: Titanfall 2
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (28, 'Shooter');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (28, 'Acción');

-- ID 30: Civilization VI
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (30, 'Estrategia');

-- ID 31: Total War: Warhammer III
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (31, 'Estrategia');

-- ID 32: Cities: Skylines
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (32, 'Simulación');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (32, 'Estrategia');

-- ID 33: Stellaris
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (33, 'Estrategia');

-- ID 34: Hades
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (34, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (34, 'Indie');

-- ID 35: Celeste
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (35, 'Plataformas');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (35, 'Indie');

-- ID 36: Hollow Knight
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (36, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (36, 'Aventura');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (36, 'Indie');

-- ID 37: Stardew Valley
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (37, 'Simulación');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (37, 'Indie');

-- ID 38: Undertale
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (38, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (38, 'Indie');

-- ID 39: Cuphead
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (39, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (39, 'Indie');

-- ID 40: Resident Evil 4 (Remake)
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (40, 'Terror');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (40, 'Acción');

-- ID 41: Resident Evil Village
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (41, 'Terror');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (41, 'Acción');

-- ID 42: Dead Space (Remake)
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (42, 'Terror');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (42, 'Acción');

-- ID 43: The Forest
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (43, 'Terror');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (43, 'Supervivencia');

-- ID 44: Subnautica
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (44, 'Aventura');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (44, 'Supervivencia');

-- ID 45: FIFA 23
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (45, 'Deportes');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (45, 'Simulación');

-- ID 46: Gran Turismo 7
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (46, 'Carreras');

-- ID 47: Forza Horizon 5
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (47, 'Carreras');

-- ID 48: Rocket League
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (48, 'Deportes');

-- ID 49: The Elder Scrolls V: Skyrim
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (49, 'RPG');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (49, 'Aventura');

-- ID 50: Grand Theft Auto V
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (50, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (50, 'Aventura');

-- ID 51: Minecraft
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (51, 'Aventura');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (51, 'Supervivencia');

-- ID 52: Portal 2
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (52, 'Puzzle');

-- ID 53: Half-Life: Alyx
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (53, 'Shooter');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (53, 'Acción');

-- ID 54: Super Mario Odyssey
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (54, 'Plataformas');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (54, 'Aventura');

-- ID 55: Super Smash Bros. Ultimate
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (55, 'Lucha');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (55, 'Acción');

-- ID 56: Animal Crossing: New Horizons
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (56, 'Simulación');

-- ID 57: Metroid Dread
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (57, 'Acción');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (57, 'Aventura');

-- ID 58: Pokémon Scarlet
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (58, 'RPG');

-- ID 59: Among Us
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (59, 'Multijugador');
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (59, 'Indie');

-- ID 60: Fall Guys
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (60, 'Multijugador');

-- ID 61: Valorant
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (61, 'Shooter');

-- ID 62: Apex Legends
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (62, 'Shooter');

-- ID 63: Overwatch 2
INSERT IGNORE INTO pertenece (id_juego, nombre_genero) VALUES (63, 'Shooter');


-- ============================================
-- 4. RELACIONES: JUEGO - PLATAFORMA
-- ============================================

-- ID 1: Assassin's Creed (2007)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (1, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (1, 'PlayStation 3');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (1, 'Xbox 360');

-- ID 2: Elden Ring (2022)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (2, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (2, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (2, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (2, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (2, 'Xbox One');

-- ID 3: The Legend of Zelda: Tears of the Kingdom (2023)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (3, 'Nintendo Switch');

-- ID 4: Starfield (2023)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (4, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (4, 'Xbox Series X|S');

-- ID 5: Cyberpunk 2077: Phantom Liberty (2023)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (5, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (5, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (5, 'Xbox Series X|S');

-- ID 6: Baldur's Gate 3 (2023)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (6, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (6, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (6, 'Xbox Series X|S');

-- ID 7: The Witcher 3: Wild Hunt (2015)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (7, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (7, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (7, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (7, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (7, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (7, 'Nintendo Switch');

-- ID 9: The Legend of Zelda: Breath of the Wild (2017)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (9, 'Nintendo Switch');

-- ID 12: Persona 5 Royal (2022 - multiplataforma)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (12, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (12, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (12, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (12, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (12, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (12, 'Nintendo Switch');

-- ID 13: Final Fantasy VII Remake (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (13, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (13, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (13, 'PlayStation 4');

-- ID 14: Mass Effect 2 (2010)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (14, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (14, 'PlayStation 3');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (14, 'Xbox 360');

-- ID 15: Red Dead Redemption 2 (2018)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (15, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (15, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (15, 'Xbox One');

-- ID 16: God of War (2018)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (16, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (16, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (16, 'PlayStation 4');

-- ID 17: The Last of Us Part II (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (17, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (17, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (17, 'PlayStation 4');

-- ID 18: Uncharted 4: A Thief's End (2016)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (18, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (18, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (18, 'PlayStation 4');

-- ID 19: Horizon Zero Dawn (2017)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (19, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (19, 'PlayStation 4');

-- ID 20: Horizon Forbidden West (2022)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (20, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (20, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (20, 'PlayStation 4');

-- ID 21: Assassin's Creed Valhalla (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (21, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (21, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (21, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (21, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (21, 'Xbox One');

-- ID 22: Ghost of Tsushima (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (22, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (22, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (22, 'PlayStation 4');

-- ID 24: Cyberpunk 2077: Phantom Liberty (duplicado)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (24, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (24, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (24, 'Xbox Series X|S');

-- ID 25: Call of Duty: Modern Warfare II (2022)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (25, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (25, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (25, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (25, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (25, 'Xbox One');

-- ID 26: Halo Infinite (2021)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (26, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (26, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (26, 'Xbox One');

-- ID 27: DOOM Eternal (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (27, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (27, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (27, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (27, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (27, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (27, 'Nintendo Switch');

-- ID 28: Titanfall 2 (2016)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (28, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (28, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (28, 'Xbox One');

-- ID 30: Civilization VI (2016)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (30, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (30, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (30, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (30, 'Nintendo Switch');

-- ID 31: Total War: Warhammer III (2022)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (31, 'PC');

-- ID 32: Cities: Skylines (2015)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (32, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (32, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (32, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (32, 'Nintendo Switch');

-- ID 33: Stellaris (2016)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (33, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (33, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (33, 'Xbox One');

-- ID 34: Hades (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (34, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (34, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (34, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (34, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (34, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (34, 'Nintendo Switch');

-- ID 35: Celeste (2018)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (35, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (35, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (35, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (35, 'Nintendo Switch');

-- ID 36: Hollow Knight (2017)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (36, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (36, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (36, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (36, 'Nintendo Switch');

-- ID 37: Stardew Valley (2016)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (37, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (37, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (37, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (37, 'Nintendo Switch');

-- ID 38: Undertale (2015)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (38, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (38, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (38, 'PlayStation Vita');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (38, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (38, 'Nintendo Switch');

-- ID 39: Cuphead (2017)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (39, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (39, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (39, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (39, 'Nintendo Switch');

-- ID 40: Resident Evil 4 Remake (2023)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (40, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (40, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (40, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (40, 'Xbox Series X|S');

-- ID 41: Resident Evil Village (2021)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (41, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (41, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (41, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (41, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (41, 'Xbox One');

-- ID 42: Dead Space Remake (2023)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (42, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (42, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (42, 'Xbox Series X|S');

-- ID 43: The Forest (2018)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (43, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (43, 'PlayStation 4');

-- ID 44: Subnautica (2018)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (44, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (44, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (44, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (44, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (44, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (44, 'Nintendo Switch');

-- ID 45: FIFA 23 (2022)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (45, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (45, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (45, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (45, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (45, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (45, 'Nintendo Switch');

-- ID 46: Gran Turismo 7 (2022)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (46, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (46, 'PlayStation 4');

-- ID 47: Forza Horizon 5 (2021)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (47, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (47, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (47, 'Xbox One');

-- ID 48: Rocket League (2015)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (48, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (48, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (48, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (48, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (48, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (48, 'Nintendo Switch');

-- ID 49: The Elder Scrolls V: Skyrim (2011)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (49, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (49, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (49, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (49, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (49, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (49, 'Nintendo Switch');

-- ID 50: Grand Theft Auto V (2013)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (50, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (50, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (50, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (50, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (50, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (50, 'PlayStation 3');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (50, 'Xbox 360');

-- ID 51: Minecraft (2011)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (51, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (51, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (51, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (51, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (51, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (51, 'Nintendo Switch');

-- ID 52: Portal 2 (2011)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (52, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (52, 'PlayStation 3');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (52, 'Xbox 360');

-- ID 53: Half-Life: Alyx (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (53, 'PC');

-- ID 54: Super Mario Odyssey (2017)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (54, 'Nintendo Switch');

-- ID 55: Super Smash Bros. Ultimate (2018)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (55, 'Nintendo Switch');

-- ID 56: Animal Crossing: New Horizons (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (56, 'Nintendo Switch');

-- ID 57: Metroid Dread (2021)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (57, 'Nintendo Switch');

-- ID 58: Pokémon Scarlet (2022)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (58, 'Nintendo Switch');

-- ID 59: Among Us (2018)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (59, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (59, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (59, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (59, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (59, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (59, 'Nintendo Switch');

-- ID 60: Fall Guys (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (60, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (60, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (60, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (60, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (60, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (60, 'Nintendo Switch');

-- ID 61: Valorant (2020)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (61, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (61, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (61, 'Xbox Series X|S');

-- ID 62: Apex Legends (2019)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (62, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (62, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (62, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (62, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (62, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (62, 'Nintendo Switch');

-- ID 63: Overwatch 2 (2022)
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (63, 'PC');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (63, 'PlayStation 5');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (63, 'PlayStation 4');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (63, 'Xbox Series X|S');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (63, 'Xbox One');
INSERT IGNORE INTO lanza (id_juego, nombre_plataforma) VALUES (63, 'Nintendo Switch');
