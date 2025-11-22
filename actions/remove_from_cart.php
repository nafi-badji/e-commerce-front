<?php
require_once "../database.php";
session_start();

if (!isset($_SESSION["user_id"])) {
    die("Vous devez être connecté.");
}

$user_id = $_SESSION["user_id"];
$product_id = $_POST["product_id"];

$stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
$stmt->execute([$user_id, $product_id]);

echo "Produit retiré du panier.";
?>
