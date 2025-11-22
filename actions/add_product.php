<?php
require_once "../database.php";
session_start();

if (!isset($_SESSION["is_admin"]) || $_SESSION["is_admin"] != 1) {
    die("Accès refusé.");
}

$nom = $_POST["nom"];
$prix = $_POST["prix"];
$description = $_POST["description"];
$image = $_POST["image"]; // Si tu utilises upload, je peux te générer une version avec file_upload

if (empty($nom) || empty($prix)) {
    die("Veuillez remplir tous les champs obligatoires.");
}

$stmt = $conn->prepare("INSERT INTO products (nom, prix, image, description) VALUES (?, ?, ?, ?)");
$stmt->execute([$nom, $prix, $image, $description]);

echo "Produit ajouté avec succès.";
?>
