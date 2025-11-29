<?php
// actions/contact.php

header('Content-Type: application/json');

// 1) Charger la connexion
require_once('../database.php');

// 2) Vérifier si la requête est POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Requête invalide"]);
    exit;
}

// 3) Nettoyer les champs envoyés depuis le formulaire XML/XSL
$nom = trim($_POST['nom'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// 4) Vérification des champs obligatoires
if (empty($nom) || empty($email) || empty($message)) {
    echo json_encode(["status" => "error", "message" => "Tous les champs sont obligatoires."]);
    exit;
}

// 5) Vérifier email valide
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Adresse email invalide"]);
    exit;
}

try {
    // 6) Préparer l'insertion SQL
    $sql = "INSERT INTO contacts (nom, email, sujet, message) VALUES (?, ?, ?, ?)";
    $sujet = $_POST['sujet'] ?? 'Contact';
    $stmt = $conn->prepare($sql);

    // 7) Exécuter
    $stmt->execute([$nom, $email, $sujet, $message]);

    echo json_encode(["status" => "success", "message" => "Votre message a été envoyé !"]);
    exit;

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Erreur serveur : " . $e->getMessage()]);
    exit;
}
