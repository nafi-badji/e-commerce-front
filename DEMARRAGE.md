# 🚀 Guide de Démarrage Rapide

## Étape 1 : Démarrer XAMPP

1. **Ouvrez le Panneau de Contrôle XAMPP**
   - Cherchez "XAMPP Control Panel" dans le menu Démarrer

2. **Démarrez les services nécessaires :**
   - ✅ Cliquez sur **"Start"** pour **Apache**
   - ✅ Cliquez sur **"Start"** pour **MySQL**
   
   Les deux doivent afficher un fond vert quand ils sont démarrés.

## Étape 2 : Créer la Base de Données

### Option A : Via phpMyAdmin (Recommandé)

1. **Ouvrez phpMyAdmin** dans votre navigateur :
   ```
   http://localhost/phpmyadmin
   ```

2. **Créez la base de données :**
   - Cliquez sur l'onglet **"Importer"** (ou "Import" en anglais)
   - Cliquez sur **"Choisir un fichier"** (ou "Choose File")
   - Sélectionnez le fichier `database.sql` dans votre projet
   - Cliquez sur **"Exécuter"** (ou "Go")

3. **Vérifiez que la base est créée :**
   - Dans le menu de gauche, vous devriez voir **"ecommerce"**
   - Cliquez dessus pour voir les tables : `users`, `products`, `orders`, `order_details`, `cart`, `contacts`

### Option B : Via la ligne de commande MySQL

1. Ouvrez un terminal dans le dossier du projet
2. Exécutez :
   ```bash
   mysql -u root -p < database.sql
   ```
   (Laissez le mot de passe vide si vous n'en avez pas configuré)

## Étape 3 : Accéder au Site

### URL du Projet

Ouvrez votre navigateur et allez à :

```
http://localhost/e-commerce-front/
```

### Pages Disponibles

- **Accueil** : `http://localhost/e-commerce-front/`
- **Produits** : `http://localhost/e-commerce-front/?page=produits`
- **Connexion** : `http://localhost/e-commerce-front/?page=connexion`
- **Inscription** : `http://localhost/e-commerce-front/?page=inscription`
- **Panier** : `http://localhost/e-commerce-front/?page=panier`
- **Contact** : `http://localhost/e-commerce-front/?page=contact`
- **Admin** : `http://localhost/e-commerce-front/?page=admin`

## Étape 4 : Tester avec le Compte Admin

Un compte administrateur est créé automatiquement :

- **Email** : `admin@ecommerce.com`
- **Mot de passe** : `admin123`

1. Allez sur la page de connexion
2. Connectez-vous avec ces identifiants
3. Vous devriez avoir accès à la page admin

## ⚠️ Problèmes Courants

### Erreur "Base de données introuvable"

**Solution :** Vérifiez que vous avez bien importé `database.sql` dans phpMyAdmin

### Erreur "Extension XSL non chargée"

**Solution :**
1. Ouvrez `C:\xampp\php\php.ini`
2. Cherchez la ligne `;extension=xsl`
3. Enlevez le `;` au début : `extension=xsl`
4. Redémarrez Apache dans XAMPP

### Page blanche ou erreur 500

**Solution :**
1. Vérifiez que Apache et MySQL sont bien démarrés (fond vert)
2. Vérifiez les permissions du dossier `assets/uploads/`
3. Regardez les logs d'erreur dans `C:\xampp\apache\logs\error.log`

### Erreur "mod_rewrite non activé"

**Solution :**
1. Ouvrez `C:\xampp\apache\conf\httpd.conf`
2. Cherchez `#LoadModule rewrite_module`
3. Enlevez le `#` : `LoadModule rewrite_module`
4. Redémarrez Apache

### Le site ne s'affiche pas correctement

**Solution :**
1. Vérifiez que l'URL est exactement : `http://localhost/e-commerce-front/`
2. Si votre dossier a un nom différent, modifiez le `RewriteBase` dans `.htaccess`

## ✅ Vérification Finale

Si tout fonctionne, vous devriez voir :
- ✅ La page d'accueil s'affiche
- ✅ Les produits sont visibles
- ✅ Vous pouvez vous connecter
- ✅ Le panier fonctionne

## 📝 Note

Si vous changez le nom du dossier du projet, n'oubliez pas de modifier la ligne `RewriteBase` dans le fichier `.htaccess` !

