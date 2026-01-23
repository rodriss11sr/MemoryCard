-- ============================================
-- ESQUEMA DE BASE DE DATOS - GameBoxd
-- Aplicación tipo Letterboxd para videojuegos
-- ============================================

-- Crear la base de datos (descomenta si necesitas crearla)
-- CREATE DATABASE gameboxd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE gameboxd;

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

-- Tabla: USUARIO
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL, -- Debería estar hasheada (bcrypt, argon2, etc.)
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    avatar VARCHAR(500) DEFAULT NULL, -- URL de la imagen del avatar
    INDEX idx_correo (correo),
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: JUEGO
CREATE TABLE juego (
    id_juego INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha_lanzamiento DATE DEFAULT NULL,
    descripcion TEXT DEFAULT NULL,
    portada VARCHAR(500) DEFAULT NULL, -- URL de la imagen de portada
    INDEX idx_titulo (titulo),
    INDEX idx_fecha_lanzamiento (fecha_lanzamiento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: LISTA
CREATE TABLE lista (
    id_lista INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT DEFAULT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    publica BOOLEAN DEFAULT TRUE, -- TRUE = pública, FALSE = privada
    id_usuario INT NOT NULL, -- Usuario que crea la lista
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    INDEX idx_id_usuario (id_usuario),
    INDEX idx_publica (publica)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: PLATAFORMA
CREATE TABLE plataforma (
    nombre VARCHAR(100) PRIMARY KEY -- Ej: "PlayStation 5", "Xbox Series X", "PC", "Nintendo Switch"
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: GENERO
CREATE TABLE genero (
    nombre VARCHAR(100) PRIMARY KEY -- Ej: "Acción", "Aventura", "RPG", "Estrategia"
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: DESARROLLADORA
CREATE TABLE desarrolladora (
    nombre VARCHAR(255) PRIMARY KEY -- Ej: "FromSoftware", "Nintendo", "CD Projekt Red"
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: RESEÑA
CREATE TABLE reseña (
    id_reseña INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    nota DECIMAL(3,1) DEFAULT NULL, -- Nota de 0.0 a 10.0 (o NULL si no hay nota)
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    spoilers BOOLEAN DEFAULT FALSE,
    likes INT DEFAULT 0,
    id_usuario INT NOT NULL, -- Usuario que escribe la reseña
    id_juego INT NOT NULL, -- Juego sobre el que se escribe
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    INDEX idx_id_usuario (id_usuario),
    INDEX idx_id_juego (id_juego),
    INDEX idx_fecha_publicacion (fecha_publicacion),
    INDEX idx_nota (nota),
    -- Un usuario solo puede escribir una reseña por juego
    UNIQUE KEY unique_usuario_juego (id_usuario, id_juego)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLAS DE RELACIÓN (N:M)
-- ============================================

-- Relación: Guarda (Usuario N:M Juego)
-- Representa los juegos que un usuario tiene guardados/seguidos
-- Incluye estado (jugando, completado, pendiente, etc.) y horas jugadas
CREATE TABLE guarda (
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    estado ENUM('pendiente', 'jugando', 'completado', 'abandonado', 'en_pausa') DEFAULT 'pendiente',
    horas_jugadas DECIMAL(6,2) DEFAULT 0.00,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_juego),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Contiene (Lista N:M Juego)
-- Representa los juegos que están en una lista
CREATE TABLE contiene (
    id_lista INT NOT NULL,
    id_juego INT NOT NULL,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    orden INT DEFAULT 0, -- Para ordenar los juegos en la lista
    PRIMARY KEY (id_lista, id_juego),
    FOREIGN KEY (id_lista) REFERENCES lista(id_lista) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    INDEX idx_orden (orden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Lanza (Juego N:M Plataforma)
-- Representa en qué plataformas está disponible un juego
CREATE TABLE lanza (
    id_juego INT NOT NULL,
    nombre_plataforma VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_juego, nombre_plataforma),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_plataforma) REFERENCES plataforma(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Pertenece (Juego N:M Genero)
-- Representa los géneros de un juego
CREATE TABLE pertenece (
    id_juego INT NOT NULL,
    nombre_genero VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_juego, nombre_genero),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_genero) REFERENCES genero(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Desarrolla (Juego N:M Desarrolladora)
-- Representa qué desarrolladora(s) crearon un juego
CREATE TABLE desarrolla (
    id_juego INT NOT NULL,
    nombre_desarrolladora VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_juego, nombre_desarrolladora),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_desarrolladora) REFERENCES desarrolladora(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Sigue (Usuario N:M Usuario)
-- Representa que un usuario sigue a otro usuario (auto-relación)
CREATE TABLE sigue (
    id_usuario_seguidor INT NOT NULL, -- Usuario que sigue
    id_usuario_seguido INT NOT NULL,  -- Usuario que es seguido
    fecha_seguimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario_seguidor, id_usuario_seguido),
    FOREIGN KEY (id_usuario_seguidor) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario_seguido) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    -- Un usuario no puede seguirse a sí mismo
    CHECK (id_usuario_seguidor != id_usuario_seguido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ============================================

-- Insertar algunas plataformas de ejemplo
INSERT INTO plataforma (nombre) VALUES
('PC'),
('PlayStation 5'),
('Xbox Series X'),
('Nintendo Switch'),
('PlayStation 4'),
('Xbox One');

-- Insertar algunos géneros de ejemplo
INSERT INTO genero (nombre) VALUES
('Acción'),
('Aventura'),
('RPG'),
('Estrategia'),
('Shooter'),
('Plataformas'),
('Puzzle'),
('Simulación'),
('Deportes'),
('Carreras');

-- Insertar algunas desarrolladoras de ejemplo
INSERT INTO desarrolladora (nombre) VALUES
('FromSoftware'),
('Nintendo'),
('CD Projekt Red'),
('Rockstar Games'),
('Valve'),
('Bethesda Game Studios');

-- ============================================
-- VISTAS ÚTILES (OPCIONAL)
-- ============================================

-- Vista: Juegos con información completa
CREATE OR REPLACE VIEW vista_juegos_completos AS
SELECT 
    j.id_juego,
    j.titulo,
    j.fecha_lanzamiento,
    j.descripcion,
    j.portada,
    GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') AS plataformas,
    GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ') AS generos,
    GROUP_CONCAT(DISTINCT d.nombre SEPARATOR ', ') AS desarrolladoras,
    COUNT(DISTINCT r.id_reseña) AS total_reseñas,
    AVG(r.nota) AS nota_promedio
FROM juego j
LEFT JOIN lanza l ON j.id_juego = l.id_juego
LEFT JOIN plataforma p ON l.nombre_plataforma = p.nombre
LEFT JOIN pertenece pe ON j.id_juego = pe.id_juego
LEFT JOIN genero g ON pe.nombre_genero = g.nombre
LEFT JOIN desarrolla de ON j.id_juego = de.id_juego
LEFT JOIN desarrolladora d ON de.nombre_desarrolladora = d.nombre
LEFT JOIN reseña r ON j.id_juego = r.id_juego
GROUP BY j.id_juego, j.titulo, j.fecha_lanzamiento, j.descripcion, j.portada;

-- Vista: Reseñas con información del usuario y juego
CREATE OR REPLACE VIEW vista_reseñas_completas AS
SELECT 
    r.id_reseña,
    r.texto,
    r.nota,
    r.fecha_publicacion,
    r.spoilers,
    r.likes,
    u.id_usuario,
    u.nombre AS nombre_usuario,
    u.avatar AS avatar_usuario,
    j.id_juego,
    j.titulo AS titulo_juego,
    j.portada AS portada_juego
FROM reseña r
INNER JOIN usuario u ON r.id_usuario = u.id_usuario
INNER JOIN juego j ON r.id_juego = j.id_juego
ORDER BY r.fecha_publicacion DESC;

-- ============================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- ============================================

-- Índices para búsquedas frecuentes
CREATE INDEX idx_guarda_estado ON guarda(estado);
CREATE INDEX idx_reseña_likes ON reseña(likes DESC);
CREATE INDEX idx_lista_fecha ON lista(fecha_creacion DESC);

-- ============================================
-- FIN DEL ESQUEMA
-- ============================================
