# 🔧 Activer l'Extension XSL dans XAMPP

## Problème
```
Fatal error: Uncaught Error: Class "XSLTProcessor" not found
```

Cela signifie que l'extension XSL de PHP n'est pas activée.

## Solution : Activer l'Extension XSL

### Méthode 1 : Via le fichier php.ini (Recommandé)

1. **Trouvez le fichier php.ini utilisé par Apache :**
   - Ouvrez le Panneau de Contrôle XAMPP
   - Cliquez sur **"Config"** à côté d'Apache
   - Sélectionnez **"PHP (php.ini)"**
   - Le fichier s'ouvrira dans Notepad

2. **Cherchez la ligne pour XSL :**
   - Appuyez sur `Ctrl + F` pour rechercher
   - Tapez : `xsl`
   - Vous devriez trouver une ligne comme :
     ```ini
     ;extension=xsl
     ```

3. **Activez l'extension :**
   - Enlevez le point-virgule `;` au début de la ligne
   - La ligne doit devenir :
     ```ini
     extension=xsl
     ```

4. **Sauvegardez le fichier** (`Ctrl + S`)

5. **Redémarrez Apache :**
   - Dans le Panneau de Contrôle XAMPP
   - Cliquez sur **"Stop"** pour Apache
   - Attendez quelques secondes
   - Cliquez sur **"Start"** pour Apache

6. **Vérifiez que c'est activé :**
   - Créez un fichier `test_xsl.php` dans votre projet avec ce contenu :
     ```php
     <?php
     if (class_exists('XSLTProcessor')) {
         echo "✅ Extension XSL activée !";
     } else {
         echo "❌ Extension XSL non activée";
     }
     phpinfo();
     ?>
     ```
   - Ouvrez : `http://localhost/e-commerce-front/test_xsl.php`
   - Cherchez "xsl" dans la page (Ctrl+F)
   - Vous devriez voir une section "xsl" si c'est activé

### Méthode 2 : Vérifier le chemin du php.ini

Si vous ne trouvez pas la ligne `extension=xsl`, ajoutez-la manuellement :

1. Ouvrez `C:\xampp\php\php.ini`
2. Cherchez la section `; Windows Extensions` (vers la ligne 900-1000)
3. Ajoutez cette ligne dans la section des extensions :
   ```ini
   extension=xsl
   ```
4. Sauvegardez et redémarrez Apache

### Méthode 3 : Vérifier que le fichier DLL existe

1. Allez dans `C:\xampp\php\ext\`
2. Vérifiez que le fichier `php_xsl.dll` existe
3. Si le fichier n'existe pas, vous devrez réinstaller XAMPP ou télécharger l'extension

## 🔍 Vérification Rapide

Créez un fichier `test.php` à la racine de votre projet :

```php
<?php
echo "Extension XSL : ";
echo class_exists('XSLTProcessor') ? "✅ ACTIVÉE" : "❌ NON ACTIVÉE";
phpinfo();
?>
```

Ouvrez `http://localhost/e-commerce-front/test.php` et cherchez "xsl" dans la page.

## ⚠️ Si ça ne fonctionne toujours pas

1. **Vérifiez la version de PHP :**
   - XSL est disponible depuis PHP 5.0
   - Vérifiez dans phpMyAdmin ou créez un fichier `info.php` avec `<?php phpinfo(); ?>`

2. **Vérifiez les dépendances :**
   - XSL nécessite les bibliothèques libxml2 et libxslt
   - Ces bibliothèques sont normalement incluses dans XAMPP

3. **Réinstallez XAMPP :**
   - Si rien ne fonctionne, réinstallez XAMPP (version récente)

## ✅ Après activation

Une fois l'extension activée et Apache redémarré, votre site devrait fonctionner :
```
http://localhost/e-commerce-front/
```

