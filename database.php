<?php
// Configuration de la base de données
$host = "localhost";
$user = "root";
$password = "";
$dbname = "ecommerce";

try {
    // D'abord, se connecter sans spécifier la base de données
    $conn_temp = new PDO("mysql:host=$host;charset=utf8mb4", $user, $password);
    $conn_temp->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Vérifier si la base de données existe
    $check_db = $conn_temp->query("SHOW DATABASES LIKE '$dbname'");
    
    if ($check_db->rowCount() == 0) {
        // Créer la base de données si elle n'existe pas
        $conn_temp->exec("CREATE DATABASE IF NOT EXISTS $dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    }
    
    // Maintenant, se connecter à la base de données
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Vérifier si les tables existent, sinon les créer
    $tables = $conn->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    
    if (empty($tables)) {
        // Charger et exécuter le script SQL
        $sql_file = __DIR__ . '/database.sql';
        if (file_exists($sql_file)) {
            $sql = file_get_contents($sql_file);
            // Supprimer les commentaires et exécuter les commandes
            $sql = preg_replace('/--.*$/m', '', $sql);
            $statements = array_filter(array_map('trim', explode(';', $sql)));
            
            foreach ($statements as $statement) {
                if (!empty($statement)) {
                    try {
                        $conn->exec($statement);
                    } catch (PDOException $e) {
                        // Ignorer les erreurs de création si les tables existent déjà
                        if (strpos($e->getMessage(), 'already exists') === false) {
                            error_log("Erreur SQL: " . $e->getMessage());
                        }
                    }
                }
            }
        }
    }
    
} catch(PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage() . "<br><br>Vérifiez que MySQL est démarré dans XAMPP et que les identifiants dans database.php sont corrects.");
}
?>
