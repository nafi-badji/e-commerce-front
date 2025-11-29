<?php
require_once "../database.php";
session_start();

// Accepter les requêtes GET et POST
$product_id = $_GET["product_id"] ?? $_POST["product_id"] ?? null;
$quantite = $_GET["quantite"] ?? $_POST["quantite"] ?? 1;

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION["user_id"])) {
    header("Location: ../index.php?page=connexion&error=login_required");
    exit;
}

// Vérifier que product_id est fourni
if (empty($product_id)) {
    header("Location: ../index.php?page=produits&error=no_product");
    exit;
}

$user_id = $_SESSION["user_id"];
$quantite = intval($quantite);

// Vérifier que le produit existe
$check_product = $conn->prepare("SELECT id FROM products WHERE id = ?");
$check_product->execute([$product_id]);
if ($check_product->rowCount() == 0) {
    header("Location: ../index.php?page=produits&error=product_not_found");
    exit;
}

// Vérifier si le produit est déjà dans le panier
$check = $conn->prepare("SELECT id, quantite FROM cart WHERE user_id = ? AND product_id = ?");
$check->execute([$user_id, $product_id]);
$existing = $check->fetch();

if ($existing) {
    // Mettre à jour quantité
    $new_quantite = $existing["quantite"] + $quantite;
    $update = $conn->prepare("UPDATE cart SET quantite = ? WHERE user_id = ? AND product_id = ?");
    $update->execute([$new_quantite, $user_id, $product_id]);
    $message = "Quantité mise à jour dans le panier.";
} else {
    // Ajouter au panier
    $insert = $conn->prepare("INSERT INTO cart (user_id, product_id, quantite) VALUES (?, ?, ?)");
    $insert->execute([$user_id, $product_id, $quantite]);
    $message = "Produit ajouté au panier.";
}

// Rediriger vers la page produits avec un message de succès
header("Location: ../index.php?page=produits&success=added_to_cart");
exit;
?>
