<?php
session_start();
require_once "../database.php";

// Vérifier si l'utilisateur est admin
if (!isset($_SESSION["is_admin"]) || $_SESSION["is_admin"] != 1) {
    die("Accès refusé. Vous devez être administrateur.");
}

if($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST['id'] ?? 0;
    $nom = $_POST['nom'] ?? '';
    $prix = $_POST['prix'] ?? 0;
    $description = $_POST['description'] ?? '';
    $image = $_POST['image'] ?? '';
    $stock = isset($_POST['stock']) ? intval($_POST['stock']) : 10;
    $category = $_POST['category'] ?? 'homme';

    if (empty($nom) || empty($prix) || empty($id)) {
        echo "Erreur : Les champs obligatoires sont manquants.";
        exit;
    }

    // Vérifier si les colonnes stock et category existent
    $checkColumns = $conn->query("SHOW COLUMNS FROM products LIKE 'stock'");
    $hasStock = $checkColumns->rowCount() > 0;
    
    $checkColumns = $conn->query("SHOW COLUMNS FROM products LIKE 'category'");
    $hasCategory = $checkColumns->rowCount() > 0;

    if ($hasStock && $hasCategory) {
        $sql = "UPDATE products SET nom=?, prix=?, description=?, image=?, stock=?, category=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute([$nom, $prix, $description, $image, $stock, $category, $id]);
    } else {
        $sql = "UPDATE products SET nom=?, prix=?, description=?, image=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute([$nom, $prix, $description, $image, $id]);
    }

    if($result){
        header("Location: ../index.php?page=admin&success=product_updated");
        exit;
    } else {
        echo "Erreur lors de la modification du produit.";
    }
}
