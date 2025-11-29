<?php
// ------------------------
// Connexion à la base
// ------------------------
// Utiliser database.php pour la connexion principale
require_once __DIR__ . '/database.php';

function getDB()
{
    global $conn;
    return $conn; // Utiliser la connexion globale depuis database.php
}

/* ======================================================
        FONCTIONS UTILISATEURS
====================================================== */

// 🔹 Inscription utilisateur
function registerUser($nom, $email, $password)
{
    $pdo = getDB();

    // Vérifier si email existe
    $check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        return "email_existe";
    }

    // Hash du mot de passe
    $passHash = password_hash($password, PASSWORD_DEFAULT);

    $sql = $pdo->prepare("INSERT INTO users (nom, email, password) VALUES (?, ?, ?)");
    return $sql->execute([$nom, $email, $passHash]);
}

// 🔹 Connexion utilisateur
function loginUser($email, $password)
{
    $pdo = getDB();

    $sql = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $sql->execute([$email]);
    $user = $sql->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        return $user; // On renvoie les infos du user
    }

    return false;
}

/* ======================================================
        FONCTIONS PRODUITS
====================================================== */

// 🔹 Récupérer tous les produits
function getProducts()
{
    $pdo = getDB();
    $sql = $pdo->prepare("SELECT * FROM products ORDER BY created_at DESC");
    $sql->execute();
    return $sql->fetchAll(PDO::FETCH_ASSOC);
}

// 🔹 Ajouter un produit
function addProduct($nom, $prix, $image, $description)
{
    $pdo = getDB();
    $sql = $pdo->prepare("INSERT INTO products (nom, prix, image, description) VALUES (?, ?, ?, ?)");
    return $sql->execute([$nom, $prix, $image, $description]);
}

// 🔹 Récupérer un produit
function getProductById($id)
{
    $pdo = getDB();
    $sql = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $sql->execute([$id]);
    return $sql->fetch(PDO::FETCH_ASSOC);
}

/* ======================================================
        FONCTIONS COMMANDES
====================================================== */

// 🔹 Créer une commande
function createOrder($user_id, $adresse)
{
    $pdo = getDB();
    $sql = $pdo->prepare("INSERT INTO orders (user_id, adresse) VALUES (?, ?)");
    $sql->execute([$user_id, $adresse]);
    return $pdo->lastInsertId();
}

// 🔹 Ajouter un produit dans une commande
function addOrderDetail($order_id, $product_id, $prix)
{
    $pdo = getDB();
    $sql = $pdo->prepare("INSERT INTO order_details (order_id, product_id, prix_unitaire) VALUES (?, ?, ?)");
    return $sql->execute([$order_id, $product_id, $prix]);
}

// 🔹 Récupérer commandes d’un utilisateur
function getOrdersByUser($user_id)
{
    $pdo = getDB();
    $sql = $pdo->prepare("SELECT * FROM orders WHERE user_id = ?");
    $sql->execute([$user_id]);
    return $sql->fetchAll(PDO::FETCH_ASSOC);
}
?>
