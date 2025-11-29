<?php
require_once "../database.php"; // connexion MySQL

// Vérifier méthode POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../index.php?page=inscription");
    exit;
}

$firstname = trim($_POST["firstname"] ?? '');
$lastname  = trim($_POST["lastname"] ?? '');
$email     = trim($_POST["email"] ?? '');
$password  = $_POST["password"] ?? '';
$confirm   = $_POST["confirm"] ?? '';
$phone     = trim($_POST["phone"] ?? '');
$dob       = $_POST["dob"] ?? '';
$avatar    = null; // par défaut

// Vérification des champs obligatoires
if (empty($firstname) || empty($lastname) || empty($email) || empty($password)) {
    header("Location: ../index.php?page=inscription&error=empty");
    exit;
}

// Combiner prénom et nom pour le champ nom dans la base
$nom = trim($firstname . ' ' . $lastname);

// Vérifier mot de passe identique
if ($password !== $confirm) {
    header("Location: ../index.php?page=inscription&error=password_mismatch");
    exit;
}

// Cryptage du mot de passe
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Upload de l’avatar
if (!empty($_FILES["avatar"]["name"])) {
    $targetDir = "../assets/uploads/";
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $fileName = time() . "_" . basename($_FILES["avatar"]["name"]);
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["avatar"]["tmp_name"], $targetFile)) {
        $avatar = $fileName;
    }
}

// Vérifier si l'email existe déjà
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->execute([$email]);
if ($check->fetch()) {
    header("Location: ../index.php?page=inscription&error=exists");
    exit;
}

// Insertion dans la base (PDO)
$sql = "INSERT INTO users (nom, email, password, is_admin, created_at) 
        VALUES (?, ?, ?, 0, NOW())";

$stmt = $conn->prepare($sql);

if ($stmt->execute([$nom, $email, $hashedPassword])) {
    header("Location: ../index.php?page=connexion&success=1");
    exit;
} else {
    header("Location: ../index.php?page=inscription&error=exists");
    exit;
}
?>

