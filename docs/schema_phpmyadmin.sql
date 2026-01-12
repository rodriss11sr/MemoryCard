-- ============================================
-- ESQUEMA DE BASE DE DATOS - GameBoxd
-- VERSIÓN PARA phpMyAdmin
-- Ejecuta este script en la pestaña SQL de phpMyAdmin
-- ============================================

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

-- Tabla: USUARIO
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    avatar VARCHAR(500) DEFAULT NULL,
    INDEX idx_correo (correo),
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: JUEGO
CREATE TABLE juego (
    id_juego INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha_lanzamiento DATE DEFAULT NULL,
    descripcion TEXT DEFAULT NULL,
    portada VARCHAR(500) DEFAULT NULL,
    INDEX idx_titulo (titulo),
    INDEX idx_fecha_lanzamiento (fecha_lanzamiento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: LISTA
CREATE TABLE lista (
    id_lista INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT DEFAULT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    publica BOOLEAN DEFAULT TRUE,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    INDEX idx_id_usuario (id_usuario),
    INDEX idx_publica (publica)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: PLATAFORMA
CREATE TABLE plataforma (
    nombre VARCHAR(100) PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: GENERO
CREATE TABLE genero (
    nombre VARCHAR(100) PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: DESARROLLADORA
CREATE TABLE desarrolladora (
    nombre VARCHAR(255) PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: RESEÑA
CREATE TABLE reseña (
    id_reseña INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    nota DECIMAL(3,1) DEFAULT NULL,
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    spoilers BOOLEAN DEFAULT FALSE,
    likes INT DEFAULT 0,
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    INDEX idx_id_usuario (id_usuario),
    INDEX idx_id_juego (id_juego),
    INDEX idx_fecha_publicacion (fecha_publicacion),
    INDEX idx_nota (nota),
    UNIQUE KEY unique_usuario_juego (id_usuario, id_juego)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLAS DE RELACIÓN (N:M)
-- ============================================

-- Relación: Guarda (Usuario N:M Juego)
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
CREATE TABLE contiene (
    id_lista INT NOT NULL,
    id_juego INT NOT NULL,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    orden INT DEFAULT 0,
    PRIMARY KEY (id_lista, id_juego),
    FOREIGN KEY (id_lista) REFERENCES lista(id_lista) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    INDEX idx_orden (orden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Lanza (Juego N:M Plataforma)
CREATE TABLE lanza (
    id_juego INT NOT NULL,
    nombre_plataforma VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_juego, nombre_plataforma),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_plataforma) REFERENCES plataforma(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Pertenece (Juego N:M Genero)
CREATE TABLE pertenece (
    id_juego INT NOT NULL,
    nombre_genero VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_juego, nombre_genero),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_genero) REFERENCES genero(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Desarrolla (Juego N:M Desarrolladora)
CREATE TABLE desarrolla (
    id_juego INT NOT NULL,
    nombre_desarrolladora VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_juego, nombre_desarrolladora),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_desarrolladora) REFERENCES desarrolladora(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Sigue (Usuario N:M Usuario)
CREATE TABLE sigue (
    id_usuario_seguidor INT NOT NULL,
    id_usuario_seguido INT NOT NULL,
    fecha_seguimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario_seguidor, id_usuario_seguido),
    FOREIGN KEY (id_usuario_seguidor) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario_seguido) REFERENCES usuario(id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS DE EJEMPLO
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
