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

-- Tabla: USUARIO
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    avatar VARCHAR(500) DEFAULT NULL,
    INDEX idx_correo (correo),
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLAS DE RELACIÓN (N:M)
-- ============================================

CREATE TABLE IF NOT EXISTS reseña (
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

-- Tabla: LISTA
CREATE TABLE IF NOT EXISTS lista (
    id_lista INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    publica BOOLEAN DEFAULT TRUE,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    INDEX idx_id_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

-- Relación: Guarda (Usuario N:M Juego)
CREATE TABLE IF NOT EXISTS guarda (
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    estado ENUM('pendiente', 'jugando', 'completado', 'en_pausa', 'favorito') DEFAULT 'pendiente',
    horas_jugadas DECIMAL(6,2) DEFAULT 0.00,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_juego),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE,
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Sigue (Usuario N:M Usuario)
CREATE TABLE IF NOT EXISTS sigue (
    id_usuario_seguidor INT NOT NULL,
    id_usuario_seguido INT NOT NULL,
    fecha_seguimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario_seguidor, id_usuario_seguido),
    FOREIGN KEY (id_usuario_seguidor) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario_seguido) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    CHECK (id_usuario_seguidor != id_usuario_seguido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Relación: Contiene (Lista N:M Juego)
CREATE TABLE IF NOT EXISTS contiene (
    id_lista INT NOT NULL,
    id_juego INT NOT NULL,
    orden INT DEFAULT 0,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_lista, id_juego),
    FOREIGN KEY (id_lista) REFERENCES lista(id_lista) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- VISTAS ÚTILES
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
