-- ============================================
-- Base de données E-Commerce
-- Structure Imposée
-- ============================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce;

-- ============================================
-- Table: users (Utilisateurs)
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: products (Produits)
-- ============================================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: orders (Commandes)
-- ============================================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    statut ENUM('En attente', 'Validée', 'Annulée') DEFAULT 'En attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================
-- Table: order_details (Détails des commandes)
-- ============================================
CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ============================================
-- Table: cart (Panier) - Nécessaire pour le fonctionnement
-- ============================================
-- Note: Cette table n'est pas dans la structure imposée mais est utilisée par le code
-- Vous pouvez la supprimer si vous n'utilisez pas le panier
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantite INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id)
);

-- ============================================
-- Table: contacts (Messages de contact) - Optionnel
-- ============================================
-- Note: Cette table est utilisée par actions/contact.php
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    sujet VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Données de test (optionnel)
-- ============================================

-- Utilisateur admin par défaut (mot de passe: admin123)
INSERT INTO users (nom, email, password, is_admin) VALUES 
('Administrateur', 'admin@ecommerce.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1);

-- Quelques produits de test
INSERT INTO products (nom, prix, description, image) VALUES
('Chemise Bleue', 29.99, 'Chemise en coton de qualité supérieure', 'chemise-bleue.png'),
('Pantalon Chino', 49.99, 'Pantalon chino élégant et confortable', 'pantalon-chino.png'),
('Veste en Cuir', 129.99, 'Veste en cuir véritable', 'veste.png'),
('Chaussures Cuir', 89.99, 'Chaussures en cuir pour homme', 'chaussures-cuir.jpg'),
('Montre Femme', 79.99, 'Montre élégante pour femme', 'Montre-Femme.png');
