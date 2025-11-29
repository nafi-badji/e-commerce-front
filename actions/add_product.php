<?php
session_start();
require_once "../database.php"; // connexion DB

// Vérifier si l'utilisateur est admin
if (!isset($_SESSION["is_admin"]) || $_SESSION["is_admin"] != 1) {
    die("Accès refusé. Vous devez être administrateur.");
}

if($_SERVER["REQUEST_METHOD"] === "POST") {
    $nom = $_POST['nom'] ?? '';
    $prix = $_POST['prix'] ?? 0;
    $description = $_POST['description'] ?? '';
    $image = $_POST['image'] ?? '';
    $stock = isset($_POST['stock']) ? intval($_POST['stock']) : 10;
    $category = $_POST['category'] ?? 'homme';

    if (empty($nom) || empty($prix)) {
        echo "Erreur : Le nom et le prix sont obligatoires.";
        exit;
    }

    // Vérifier si les colonnes stock et category existent
    $checkColumns = $conn->query("SHOW COLUMNS FROM products LIKE 'stock'");
    $hasStock = $checkColumns->rowCount() > 0;
    
    $checkColumns = $conn->query("SHOW COLUMNS FROM products LIKE 'category'");
    $hasCategory = $checkColumns->rowCount() > 0;

    if ($hasStock && $hasCategory) {
        $sql = "INSERT INTO products (nom, prix, description, image, stock, category) 
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute([$nom, $prix, $description, $image, $stock, $category]);
    } else {
        $sql = "INSERT INTO products (nom, prix, description, image) 
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute([$nom, $prix, $description, $image]);
    }

    if($result){
        header("Location: ../index.php?page=admin&success=product_added");
        exit;
    } else {
        echo "Erreur lors de l'ajout du produit.";
    }
}

