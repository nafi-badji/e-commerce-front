<?php
require_once "../database.php";
session_start();

if (!isset($_SESSION["user_id"])) {
    die("Vous devez être connecté.");
}

$user_id = $_SESSION["user_id"];
$product_id = $_POST["product_id"];
$quantite = $_POST["quantite"] ?? 1;

// Vérifier si le produit est déjà dans le panier
$check = $conn->prepare("SELECT id FROM cart WHERE user_id = ? AND product_id = ?");
$check->execute([$user_id, $product_id]);

if ($check->rowCount() > 0) {
    // Mettre à jour quantité
    $update = $conn->prepare("UPDATE cart SET quantite = quantite + ? WHERE user_id = ? AND product_id = ?");
    $update->execute([$quantite, $user_id, $product_id]);
} else {
    // Ajouter au panier
    $insert = $conn->prepare("INSERT INTO cart (user_id, product_id, quantite) VALUES (?, ?, ?)");
    $insert->execute([$user_id, $product_id, $quantite]);
}

echo "Produit ajouté au panier.";
?>
