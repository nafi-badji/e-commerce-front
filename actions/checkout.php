<?php
require_once "../database.php";
session_start();

if (!isset($_SESSION["user_id"])) {
    die("Vous devez être connecté.");
}

$user_id = $_SESSION["user_id"];
$adresse = $_POST["adresse"];

// 📌 Récupérer le panier
$cart = $conn->prepare("
    SELECT c.*, p.prix 
    FROM cart c 
    JOIN products p ON c.product_id = p.id 
    WHERE c.user_id = ?
");
$cart->execute([$user_id]);
$items = $cart->fetchAll();

if (count($items) == 0) {
    die("Votre panier est vide.");
}

// 1️⃣ Création de la commande
$order = $conn->prepare("INSERT INTO orders (user_id, adresse) VALUES (?, ?)");
$order->execute([$user_id, $adresse]);

$order_id = $conn->lastInsertId();

// 2️⃣ Ajouter les produits dans order_details
$insert_item = $conn->prepare("
    INSERT INTO order_details (order_id, product_id, prix_unitaire)
    VALUES (?, ?, ?)
");

foreach ($items as $item) {
    $insert_item->execute([$order_id, $item["product_id"], $item["prix"]]);
}

// 3️⃣ Vider le panier
$delete = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
$delete->execute([$user_id]);

echo "Commande validée avec succès.";
?>
