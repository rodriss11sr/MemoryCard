<?php
require_once __DIR__ . "/../config/db_connect.php";

try {
    // Usamos la vista con info agregada de plataformas, géneros, desarrolladoras y nota media
    $stmt = $pdo->query("SELECT * FROM vista_juegos_completos");
    $rows = $stmt->fetchAll();

    $juegos = [];

    foreach ($rows as $row) {
        // Formatear fecha a dd/mm/yyyy (frontend usa "13/11/2007")
        $fecha = null;
        if (!empty($row["fecha_lanzamiento"])) {
            $dateObj = new DateTime($row["fecha_lanzamiento"]);
            $fecha = $dateObj->format("d/m/Y");
        }

        // plataformas viene como string "PC, PlayStation 5" → array ["PC", "PlayStation 5"]
        $plataformas = [];
        if (!empty($row["plataformas"])) {
            $plataformas = array_map("trim", explode(",", $row["plataformas"]));
        }

        // géneros y desarrolladoras como string plano, igual que en los mocks
        $generos = $row["generos"] ?? null;
        $desarrolladoras = $row["desarrolladoras"] ?? null;

        // nota_promedio → rating (número con 1 decimal, como 4.7)
        $rating = null;
        if ($row["nota_promedio"] !== null) {
            $rating = round((float)$row["nota_promedio"], 1);
        }

        $juegos[] = [
            "id"            => (int)$row["id_juego"],
            "titulo"        => $row["titulo"],
            "imagen"        => $row["portada"],          // URL de portada
            "fecha"         => $fecha,                   // "13/11/2007"
            "plataforma"    => $plataformas,             // ["PS3", "Xbox 360"]
            "desarrollador" => $desarrolladoras,         // "Ubisoft" o "FromSoftware, ... "
            "genero"        => $generos,                 // "Platform, Adventure, Action"
            "descripcion"   => $row["descripcion"],
            "rating"        => $rating,                  // 4.7
        ];
    }

    echo json_encode($juegos);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "No se pudieron obtener los juegos",
        "detalle" => $e->getMessage(),
    ]);
}