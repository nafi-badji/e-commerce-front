<?php
require_once "../database.php";
session_start();

if (!isset($_SESSION["is_admin"]) || $_SESSION["is_admin"] != 1) {
    die("Accès refusé.");
}

$product_id = $_POST["product_id"];

$stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
$stmt->execute([$product_id]);

echo "Produit supprimé.";
?>
