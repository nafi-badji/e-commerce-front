# Guide d'Installation - E-Commerce XML/XSL/PHP/MySQL

## 📋 Prérequis

- **XAMPP** (ou WAMP/MAMP) avec :
  - PHP 7.4 ou supérieur
  - MySQL/MariaDB
  - Apache avec mod_rewrite activé
  - Extension PHP XSL activée

## 🚀 Installation

### 1. Configuration de la Base de Données

1. Ouvrez **phpMyAdmin** (http://localhost/phpmyadmin)

2. Importez le fichier `database.sql` :
   - Cliquez sur "Importer"
   - Sélectionnez le fichier `database.sql`
   - Cliquez sur "Exécuter"

   OU exécutez manuellement les commandes SQL du fichier `database.sql`

3. Vérifiez que la base de données `ecommerce` a été créée avec les tables :
   - `users`
   - `products`
   - `orders`
   - `order_details`
   - `cart` (optionnel, pour le panier)
   - `contacts` (optionnel, pour les messages)

### 2. Configuration PHP

1. Ouvrez `database.php` et vérifiez/modifiez les paramètres de connexion si nécessaire :
```php
$host = "localhost";
$user = "root";
$password = "";  // Modifiez si vous avez un mot de passe MySQL
$dbname = "ecommerce";
```

2. Vérifiez que l'extension XSL est activée dans `php.ini` :
```ini
extension=xsl
```

### 3. Configuration Apache (.htaccess)

Le fichier `.htaccess` est déjà configuré pour :
- La réécriture d'URL
- La sécurité (protection des fichiers sensibles)
- La compression GZIP
- Le cache des fichiers statiques

**Important** : Si vous utilisez un sous-dossier, modifiez la ligne dans `.htaccess` :
```apache
RewriteBase /e-commerce-front/
```
Remplacez `/e-commerce-front/` par le chemin de votre projet.

### 4. Permissions des Dossiers

Assurez-vous que le dossier `assets/uploads/` a les permissions d'écriture :
- Windows : Normalement pas de problème
- Linux/Mac : `chmod 755 assets/uploads/`

### 5. Test de l'Installation

1. Démarrez Apache et MySQL dans XAMPP

2. Accédez à votre site :
   ```
   http://localhost/e-commerce-front/
   ```

3. Testez les pages :
   - Accueil : `http://localhost/e-commerce-front/`
   - Produits : `http://localhost/e-commerce-front/?page=produits`
   - Connexion : `http://localhost/e-commerce-front/?page=connexion`
   - Inscription : `http://localhost/e-commerce-front/?page=inscription`

## 🔐 Compte Administrateur par Défaut

Un compte administrateur est créé automatiquement :
- **Email** : `admin@ecommerce.com`
- **Mot de passe** : `admin123`

⚠️ **Important** : Changez ce mot de passe en production !

## 📁 Structure du Projet

```
e-commerce-front/
├── actions/          # Scripts PHP pour les actions (login, register, etc.)
├── assets/          # Ressources statiques
│   ├── css/        # Feuilles de style
│   ├── js/         # Scripts JavaScript
│   ├── images/     # Images du site
│   └── uploads/    # Fichiers uploadés par les utilisateurs
├── data/           # Fichiers XML (données des pages)
├── templates/      # Fichiers XSL (templates de transformation)
├── config.php      # Configuration (utilise database.php)
├── database.php    # Connexion à la base de données
├── database.sql    # Script SQL pour créer la base
├── fonctions.php   # Fonctions utilitaires
├── index.php       # Point d'entrée principal
├── .htaccess       # Configuration Apache
└── .gitignore      # Fichiers à ignorer par Git
```

## ✅ Vérifications Finales

- [ ] Base de données créée et tables présentes
- [ ] Connexion à la base de données fonctionne
- [ ] Extension XSL activée
- [ ] Dossier `assets/uploads/` existe et est accessible en écriture
- [ ] Fichier `.htaccess` configuré correctement
- [ ] Site accessible via navigateur
- [ ] Pages XML/XSL s'affichent correctement

## 🐛 Résolution de Problèmes

### Erreur "Extension XSL non chargée"
- Ouvrez `php.ini` dans XAMPP
- Décommentez la ligne `extension=xsl`
- Redémarrez Apache

### Erreur de connexion à la base de données
- Vérifiez que MySQL est démarré dans XAMPP
- Vérifiez les identifiants dans `database.php`
- Vérifiez que la base `ecommerce` existe

### Pages 404
- Vérifiez que `mod_rewrite` est activé dans Apache
- Vérifiez le `RewriteBase` dans `.htaccess`

### Erreur "Permission denied" pour uploads
- Vérifiez les permissions du dossier `assets/uploads/`
- Sur Linux/Mac : `chmod 755 assets/uploads/`

## 📝 Notes

- Le projet utilise **PDO** pour toutes les requêtes SQL (sécurité)
- Les mots de passe sont hashés avec `password_hash()`
- Les sessions PHP sont utilisées pour l'authentification
- Le panier utilise une table `cart` en base de données

