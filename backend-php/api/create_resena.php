<?php
require_once __DIR__ . "/../config/db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$id_usuario = isset($input["id_usuario"]) ? (int)$input["id_usuario"] : 0;
$id_juego = isset($input["id_juego"]) ? (int)$input["id_juego"] : 0;
$texto = trim($input["texto"] ?? "");
$nota = isset($input["nota"]) ? (float)$input["nota"] : null;
$spoilers = isset($input["spoilers"]) ? (bool)$input["spoilers"] : false;

if ($id_usuario <= 0 || $id_juego <= 0) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "ID de usuario y juego requeridos"]);
    exit;
}

if ($texto === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "El texto de la reseña es obligatorio"]);
    exit;
}

if ($nota !== null && ($nota < 0 || $nota > 10)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "message" => "La nota debe estar entre 0 y 10"]);
    exit;
}

try {
    // Verificar que el usuario no tenga ya una reseña para este juego
    $stmt = $pdo->prepare("SELECT id_reseña FROM reseña WHERE id_usuario = :id_usuario AND id_juego = :id_juego");
    $stmt->execute([
        ":id_usuario" => $id_usuario,
        ":id_juego" => $id_juego,
    ]);

    if ($stmt->fetch()) {
        // Actualizar reseña existente
        $stmt = $pdo->prepare("
            UPDATE reseña 
            SET texto = :texto, nota = :nota, spoilers = :spoilers
            WHERE id_usuario = :id_usuario AND id_juego = :id_juego
        ");
        $stmt->execute([
            ":id_usuario" => $id_usuario,
            ":id_juego" => $id_juego,
            ":texto" => $texto,
            ":nota" => $nota,
            ":spoilers" => $spoilers,
        ]);

        echo json_encode([
            "ok" => true,
            "message" => "Reseña actualizada correctamente",
        ]);
    } else {
        // Crear nueva reseña
        $stmt = $pdo->prepare("
            INSERT INTO reseña (id_usuario, id_juego, texto, nota, spoilers)
            VALUES (:id_usuario, :id_juego, :texto, :nota, :spoilers)
        ");
        $stmt->execute([
            ":id_usuario" => $id_usuario,
            ":id_juego" => $id_juego,
            ":texto" => $texto,
            ":nota" => $nota,
            ":spoilers" => $spoilers,
        ]);

        echo json_encode([
            "ok" => true,
            "message" => "Reseña creada correctamente",
        ]);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error al crear/actualizar la reseña",
        "detalle" => $e->getMessage(),
    ]);
}
