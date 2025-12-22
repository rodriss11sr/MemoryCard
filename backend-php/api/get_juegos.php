<?php
// Incluimos la conexión que creamos antes
include_once("../config/db_connect.php");

// Consultamos los juegos de la tabla que creaste en phpMyAdmin
$sql = "SELECT * FROM videojuegos";
$resultado = mysqli_query($conexion, $sql);

$juegos = [];

while($fila = mysqli_fetch_assoc($resultado)) {
    $juegos[] = $fila;
}

// Devolvemos los datos en formato JSON para que React los entienda
echo json_encode($juegos);
?>