-- ============================================
-- ESQUEMA DE BASE DE DATOS - PRUEBAS IGDB
-- VERSIÓN aislando solo el catálogo de juegos
-- ============================================

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

-- Tabla: JUEGO
CREATE TABLE IF NOT EXISTS juego (
    id_juego INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha_lanzamiento DATE DEFAULT NULL,
    descripcion TEXT,
    portada VARCHAR(500) DEFAULT NULL,
    INDEX idx_titulo (titulo),
    INDEX idx_fecha (fecha_lanzamiento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: PLATAFORMA
CREATE TABLE IF NOT EXISTS plataforma (
    nombre VARCHAR(100) PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: GENERO
CREATE TABLE IF NOT EXISTS genero (
    nombre VARCHAR(100) PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: DESARROLLADORA
CREATE TABLE IF NOT EXISTS desarrolladora (
    nombre VARCHAR(255) PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLAS DE RELACIÓN (N:M)
-- ============================================

-- Relación: Lanza (Juego N:M Plataforma)
CREATE TABLE IF NOT EXISTS lanza (
    id_juego INT NOT NULL,
    nombre_plataforma VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_juego, nombre_plataforma),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_plataforma) REFERENCES plataforma(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Pertenece (Juego N:M Genero)
CREATE TABLE IF NOT EXISTS pertenece (
    id_juego INT NOT NULL,
    nombre_genero VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_juego, nombre_genero),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_genero) REFERENCES genero(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Desarrolla (Juego N:M Desarrolladora)
CREATE TABLE IF NOT EXISTS desarrolla (
    id_juego INT NOT NULL,
    nombre_desarrolladora VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_juego, nombre_desarrolladora),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    FOREIGN KEY (nombre_desarrolladora) REFERENCES desarrolladora(nombre) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;