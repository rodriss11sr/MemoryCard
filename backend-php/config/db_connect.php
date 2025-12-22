<?php
// Permitir que React acceda a los datos (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$user = "root";  
$pass = "";      
$db   = "gameboxd"; // El nombre que le diste en phpMyAdmin

$conexion = mysqli_connect($host, $user, $pass, $db);

if (!$conexion) {
    die(json_encode(["error" => "Fallo de conexión: " . mysqli_connect_error()]));
}
?>