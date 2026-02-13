<?php
require_once __DIR__ . "/../config/db_connect.php";

$id = isset($_GET["id"]) ? (int)$_GET["id"] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "ID de juego no válido"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM vista_juegos_completos WHERE id_juego = :id");
    $stmt->execute([":id" => $id]);
    $row = $stmt->fetch();

    if (!$row) {
        http_response_code(404);
        echo json_encode(["error" => "Juego no encontrado"]);
        exit;
    }

    $fecha = null;
    if (!empty($row["fecha_lanzamiento"])) {
        $dateObj = new DateTime($row["fecha_lanzamiento"]);
        $fecha = $dateObj->format("d/m/Y");
    }

    $plataformas = [];
    if (!empty($row["plataformas"])) {
        $plataformas = array_map("trim", explode(",", $row["plataformas"]));
    }

    $generos = $row["generos"] ?? null;
    $desarrolladoras = $row["desarrolladoras"] ?? null;

    $rating = null;
    if ($row["nota_promedio"] !== null) {
        $rating = round((float)$row["nota_promedio"], 1);
    }

    $juego = [
        "id"            => (int)$row["id_juego"],
        "titulo"        => $row["titulo"],
        "imagen"        => $row["portada"],
        "fecha"         => $fecha,
        "plataforma"    => $plataformas,
        "desarrollador" => $desarrolladoras,
        "genero"        => $generos,
        "descripcion"   => $row["descripcion"],
        "rating"        => $rating,
    ];

    echo json_encode($juego);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "No se pudo obtener el juego",
        "detalle" => $e->getMessage(),
    ]);
}

