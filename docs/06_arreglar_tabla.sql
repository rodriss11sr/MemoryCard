-- Los estados de la tabla guarda estan mal, no hay estado favorito, mantenemos el en_pausa porque no molesta y puede ser util
-- Ejecuta este script en la pestaña SQL de phpMyAdmin
-- ============================================

ALTER TABLE guarda
MODIFY COLUMN estado ENUM('pendiente', 'jugando', 'completado', 'en_pausa', 'favorito') DEFAULT 'pendiente';