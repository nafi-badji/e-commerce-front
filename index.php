<?php
session_start();
require_once "database.php";

// Vérifier si l'utilisateur est connecté
$is_logged_in = isset($_SESSION["user_id"]);

// Récupération des produits
$sql = "SELECT * FROM products ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Boutique - Accueil</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<!-- HEADER -->
<header>
    <h1>Ma Boutique</h1>

    <nav>
        <?php if ($is_logged_in): ?>
            <a href="logout.php">Déconnexion</a>
            <a href="checkout.php">Panier</a>
        <?php else: ?>
            <a href="login.php">Connexion</a>
            <a href="register.php">Inscription</a>
        <?php endif; ?>
    </nav>
</header>

<hr>

<!-- LISTE DES PRODUITS -->
<h2>Nos produits</h2>

<div class="products">
    <?php foreach ($products as $product): ?>
        <div class="product-card">
            <img src="uploads/<?php echo $product['image']; ?>" alt="" width="150">

            <h3><?php echo htmlspecialchars($product['nom']); ?></h3>
            <p><?php echo htmlspecialchars($product['description']); ?></p>
            <strong><?php echo number_format($product['prix'], 2, ',', ' '); ?> €</strong>

            <form method="POST" action="add_to_cart.php">
                <input type="hidden" name="product_id" value="<?php echo $product['id']; ?>">
                <button type="submit">Ajouter au panier</button>
            </form>
        </div>
    <?php endforeach; ?>
</div>

</body>
</html>
