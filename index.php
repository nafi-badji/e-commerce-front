<?php
// index.php (minimal)
// `page` param: ex: index.php?page=connexion
$page = isset($_GET['page']) ? preg_replace('/[^a-z0-9_-]/i', '', $_GET['page']) : 'accueil';
$xmlFile = __DIR__ . "/data/{$page}.xml";
$xslFile = __DIR__ . "/templates/{$page}.xsl";

// fallback 404
if (!file_exists($xmlFile) || !file_exists($xslFile)) {
    $xmlFile = __DIR__ . "/data/404.xml";
    $xslFile = __DIR__ . "/templates/404.xsl";
}

$xml = new DOMDocument();
$xml->load($xmlFile);

$xsl = new DOMDocument();
$xsl->load($xslFile);

$proc = new XSLTProcessor();
$proc->importStylesheet($xsl);
// You can pass variables if needed: $proc->setParameter('', 'foo', 'bar');

$html = $proc->transformToXML($xml);
echo $html;
