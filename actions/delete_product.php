<?php
session_start();
require_once "../database.php";

// Vérifier si l'utilisateur est admin
if (!isset($_SESSION["is_admin"]) || $_SESSION["is_admin"] != 1) {
    die("Accès refusé. Vous devez être administrateur.");
}

if(isset($_GET['id'])){
    $id = intval($_GET['id']);

    if ($id <= 0) {
        echo "Erreur : ID invalide.";
        exit;
    }

    $sql = "DELETE FROM products WHERE id=?";
    $stmt = $conn->prepare($sql);

    if($stmt->execute([$id])){
        header("Location: ../index.php?page=admin&success=product_deleted");
        exit;
    } else {
        echo "Erreur lors de la suppression du produit.";
    }
}

