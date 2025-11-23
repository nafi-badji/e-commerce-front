<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <!-- TEMPLATE PRINCIPAL : produit le squelette HTML -->
    <xsl:template match="/page">
        <html lang="fr">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>
                    <xsl:choose>
                        <xsl:when test="string-length(title) &gt; 0">
                            <xsl:value-of select="title"/> - <xsl:value-of select="siteName"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="siteName"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </title>
                
                <!-- Lien CSS unique (style.css) -->
                <link rel="stylesheet" href="/e-commerce-front/assets/css/style.css" />
            </head>
            
            <body>
                <!-- HEADER -->
                <header class="site-header">
                    <div class="header-inner">
                        <!-- LOGO / BRAND -->
                        <div class="header-left">
                            <a class="brand" href="index.php?page=accueil">
                                <img class="brand-logo" src="{normalize-space(logo)}" alt="{normalize-space(siteName)}"/>
                                <span class="brand-name"><xsl:value-of select="siteName"/></span>
                            </a>
                        </div>
                        
                        <!-- NAV -->
                        <nav class="header-nav">
                            <ul>
                                <li><a href="index.php?page=accueil">Accueil</a></li>
                                <li><a href="index.php?page=produits">Produits</a></li>
                                <li><a href="index.php?page=contact">Contact</a></li>
                                <li><a href="index.php?page=apropos">À propos</a></li>
                                <li>
                                    <a class="cart-link" href="index.php?page=panier">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M7 4H5L4 6h2l3.6 7.59L8.25 16c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h9v-2h-9l1.1-2h6.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49-1.73-1.01 L17.42 12H9.21L7 4z"/>
                                        </svg>
                                        <span>Panier</span>
                                        <span class="cart-count" id="cart-count">0</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        
                        <!-- Connexion -->
                        <div class="header-right">
                            <a class="btn-login" href="index.php?page=connexion">Connexion</a>
                        </div>
                    </div>
                </header>
                
                <!-- MAIN CONTENT -->
                <main>
                    <xsl:apply-templates/>
                </main>
                
                <!-- FOOTER (plein largeur) -->
                <footer class="site-footer">
                    <div class="footer-inner">
                        <div class="footer-col about">
                            <h4>À propos</h4>
                            <p>
                                <xsl:value-of select="siteName"/> propose une sélection moderne de vêtements :
                                robes, chemises, pantalons et accessoires tendance au Sénégal.
                            </p>
                        </div>
                        
                        <div class="footer-col links">
                            <h4>Liens rapides</h4>
                            <ul>
                                <li><a href="index.php?page=accueil">Accueil</a></li>
                                <li><a href="index.php?page=produits">Produits</a></li>
                                <li><a href="index.php?page=contact">Contact</a></li>
                                <li><a href="index.php?page=apropos">À propos</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-col contact">
                            <h4>Contact</h4>
                            <ul>
                                <li><a href="mailto:support@boutiquesenegal.com">MN@Prestige.com</a></li>
                                <li>+221 77 123 45 67</li>
                                <li>Dakar, Sénégal</li>
                            </ul>
                        </div>
                        
                        <div class="footer-col social">
                            <h4>Réseaux sociaux</h4>
                            <div class="footer-social">
                                <a href="#"><img src="/e-commerce-front/assets/images/facebook.png" alt="Facebook"/></a>
                                <a href="#"><img src="/e-commerce-front/assets/images/instagram.png" alt="Instagram"/></a>
                                <a href="#"><img src="/e-commerce-front/assets/images/snapchat.png" alt="Snapchat"/></a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-copy">
                        © <xsl:value-of select="siteName"/> — 2025
                    </div>
                </footer>
                
            </body>
        </html>
    </xsl:template>
    <!-- Empêche l'affichage accidentel des noeuds metadata -->
    <xsl:template match="css|logo|siteName|title|heroImage"/>
    
</xsl:stylesheet>
