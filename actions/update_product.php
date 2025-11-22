<?php
require_once "../database.php";
session_start();

if (!isset($_SESSION["is_admin"]) || $_SESSION["is_admin"] != 1) {
    die("Accès refusé.");
}

$product_id = $_POST["product_id"];
$nom = $_POST["nom"];
$prix = $_POST["prix"];
$description = $_POST["description"];
$image = $_POST["image"];

$stmt = $conn->prepare("
    UPDATE products 
    SET nom = ?, prix = ?, description = ?, image = ? 
    WHERE id = ?
");
$stmt->execute([$nom, $prix, $description, $image, $product_id]);

echo "Produit mis à jour.";
?>
