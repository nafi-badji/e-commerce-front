<?php
session_start();
require_once "../database.php"; // connexion MySQL

// Vérifier méthode POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../index.php?page=connexion");
    exit;
}

$email = trim($_POST["email"]);
$password = $_POST["password"];
$remember = isset($_POST["remember"]) ? 1 : 0;

// Vérification des champs
if (empty($email) || empty($password)) {
    header("Location: ../index.php?page=connexion&error=empty");
    exit;
}

// Vérifier si utilisateur existe (PDO)
$sql = "SELECT id, nom, email, password, is_admin 
        FROM users 
        WHERE email = ? 
        LIMIT 1";

$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    header("Location: ../index.php?page=connexion&error=notfound");
    exit;
}

// Vérification du mot de passe
if (!password_verify($password, $user["password"])) {
    header("Location: ../index.php?page=connexion&error=wrongpass");
    exit;
}

// Session OK → enregistrer l'utilisateur
$_SESSION["user_id"] = $user["id"];
$_SESSION["user_name"] = $user["nom"];
$_SESSION["user_email"] = $user["email"];
$_SESSION["is_admin"] = $user["is_admin"];

// Option "Se souvenir de moi"
if ($remember) {
    setcookie("remember_user", $user["id"], time() + (86400 * 30), "/", "", false, true);
}

// Connexion réussie → redirection
header("Location: ../index.php?page=produits");
exit;
?>

