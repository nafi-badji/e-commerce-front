<?php
require_once "../database.php";

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nom = trim($_POST["nom"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    // Vérification basique
    if (empty($nom) || empty($email) || empty($password)) {
        die("Veuillez remplir tous les champs.");
    }

    // Vérifier si email existe déjà
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        die("Cet email existe déjà !");
    }

    // Hash du mot de passe
    $hash = password_hash($password, PASSWORD_DEFAULT);

    // Insertion
    $stmt = $conn->prepare("INSERT INTO users (nom, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$nom, $email, $hash]);

    echo "Inscription réussie ! Vous pouvez vous connecter.";
}
?>
