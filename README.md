# E-Commerce Frontend
Projet e-commerce utilisant XML, XSL, PHP et MySQL (L2 IDA)

## 📖 Description

Application e-commerce complète avec :
- **Frontend** : XML/XSL pour la transformation des données
- **Backend** : PHP avec PDO pour la sécurité
- **Base de données** : MySQL avec structure imposée
- **Architecture** : Frontend et Backend dans le même dossier

## 🛠️ Technologies

- **XML** : Données structurées des pages
- **XSL** : Templates de transformation XML → HTML
- **PHP** : Logique serveur et actions
- **MySQL** : Base de données relationnelle
- **JavaScript** : Interactions côté client
- **CSS** : Styles et design

## 📋 Structure de la Base de Données

- `users` : Utilisateurs (clients et admins)
- `products` : Catalogue de produits
- `orders` : Commandes des clients
- `order_details` : Détails des commandes
- `cart` : Panier d'achat (optionnel)
- `contacts` : Messages de contact (optionnel)

## 🚀 Installation

Voir le fichier [INSTALLATION.md](INSTALLATION.md) pour les instructions détaillées.

## 📁 Structure du Projet

```
e-commerce-front/
├── actions/          # Scripts PHP (login, register, cart, etc.)
├── assets/          # CSS, JS, images, uploads
├── data/            # Fichiers XML
├── templates/      # Fichiers XSL
├── database.php    # Connexion MySQL
├── database.sql     # Script de création de la base
└── index.php       # Point d'entrée
```

## ✅ Ce qui a été configuré

- ✅ Base de données unifiée (`database.php`)
- ✅ Structure SQL conforme aux spécifications
- ✅ Gestion des sessions dans `index.php`
- ✅ Fichier `.htaccess` pour la sécurité
- ✅ Dossier `uploads/` pour les fichiers
- ✅ Fichier `.gitignore` pour Git
- ✅ Tous les fichiers utilisent PDO (sécurité)
- ✅ Protection admin sur les actions sensibles

## 🔐 Sécurité

- Mots de passe hashés avec `password_hash()`
- Requêtes préparées (PDO) pour éviter les injections SQL
- Protection des fichiers sensibles via `.htaccess`
- Validation des données côté serveur
- Gestion des sessions sécurisée

## 👤 Auteur

Projet académique L2 IDA
