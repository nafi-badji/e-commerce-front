<?php
// Démarrer la session pour toutes les pages
session_start();

// index.php
// `page` param: ex: index.php?page=connexion
$page = isset($_GET['page']) ? preg_replace('/[^a-z0-9_-]/i', '', $_GET['page']) : 'accueil';
$xmlFile = __DIR__ . "/data/{$page}.xml";
$xslFile = __DIR__ . "/templates/{$page}.xsl";

// Générer dynamiquement le XML pour la page produits depuis la base de données
if ($page === 'produits') {
    require_once __DIR__ . '/database.php';
    
    // Créer le document XML
    $xml = new DOMDocument('1.0', 'UTF-8');
    $root = $xml->createElement('page');
    $root->setAttribute('id', 'produits');
    $xml->appendChild($root);
    
    // Métadonnées
    $siteName = $xml->createElement('siteName', 'MN-Prestige');
    $title = $xml->createElement('title', 'Produits');
    $root->appendChild($siteName);
    $root->appendChild($title);
    
    // Catégories
    $categories = $xml->createElement('categories');
    $catList = [
        ['id' => 'all', 'name' => 'Tous'],
        ['id' => 'femme', 'name' => 'Femme'],
        ['id' => 'homme', 'name' => 'Homme'],
        ['id' => 'accessoire', 'name' => 'Accessoires']
    ];
    foreach ($catList as $cat) {
        $category = $xml->createElement('category', $cat['name']);
        $category->setAttribute('id', $cat['id']);
        $categories->appendChild($category);
    }
    $root->appendChild($categories);
    
    // Produits depuis la base de données
    $products = $xml->createElement('products');
    try {
        // Récupérer les produits avec tous les champs disponibles
        $stmt = $conn->prepare("SELECT id, nom, prix, image, description, 
                                COALESCE(stock, 10) as stock, 
                                COALESCE(category, 'homme') as category 
                                FROM products ORDER BY created_at DESC");
        $stmt->execute();
        $dbProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($dbProducts as $dbProduct) {
            $product = $xml->createElement('product');
            
            $id = $xml->createElement('id', $dbProduct['id']);
            $name = $xml->createElement('name', htmlspecialchars($dbProduct['nom'], ENT_XML1, 'UTF-8'));
            $price = $xml->createElement('price', number_format($dbProduct['prix'], 0, '', ''));
            $stock = $xml->createElement('stock', $dbProduct['stock'] ?? '10');
            $category = $xml->createElement('category', $dbProduct['category'] ?? 'homme');
            $image = $xml->createElement('image', htmlspecialchars($dbProduct['image'] ?? '/e-commerce-front/assets/images/placeholder.png', ENT_XML1, 'UTF-8'));
            $short = $xml->createElement('short', htmlspecialchars(substr($dbProduct['description'] ?? '', 0, 100), ENT_XML1, 'UTF-8'));
            
            $product->appendChild($id);
            $product->appendChild($name);
            $product->appendChild($price);
            $product->appendChild($stock);
            $product->appendChild($category);
            $product->appendChild($image);
            $product->appendChild($short);
            
            $products->appendChild($product);
        }
    } catch (PDOException $e) {
        // En cas d'erreur, on garde un XML vide
        error_log("Erreur lors de la récupération des produits: " . $e->getMessage());
    }
    $root->appendChild($products);
    
    // Utiliser le XML généré
    $xmlContent = $xml->saveXML();
    $xmlDoc = new DOMDocument();
    $xmlDoc->loadXML($xmlContent);
    
} else {
    // Pour les autres pages, charger depuis le fichier XML
    // fallback 404
    if (!file_exists($xmlFile) || !file_exists($xslFile)) {
        $xmlFile = __DIR__ . "/data/404.xml";
        $xslFile = __DIR__ . "/templates/404.xsl";
    }
    
    $xmlDoc = new DOMDocument();
    $xmlDoc->load($xmlFile);
}

// Charger et appliquer le template XSL
$xsl = new DOMDocument();
$xsl->load($xslFile);

$proc = new XSLTProcessor();
$proc->importStylesheet($xsl);
// You can pass variables if needed: $proc->setParameter('', 'foo', 'bar');

$html = $proc->transformToXML($xmlDoc);
echo $html;
?>