<?php
require_once "../database.php";
session_start();

if (!isset($_SESSION["user_id"])) {
    die("Vous devez être connecté.");
}

$user_id = $_SESSION["user_id"];
$product_id = $_POST["product_id"];
$quantite = $_POST["quantite"];

// Quantité minimum = 1
if ($quantite < 1) {
    $quantite = 1;
}

$stmt = $conn->prepare("UPDATE cart SET quantite = ? WHERE user_id = ? AND product_id = ?");
$stmt->execute([$quantite, $user_id, $product_id]);

echo "Quantité mise à jour.";
?>
