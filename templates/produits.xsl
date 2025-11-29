<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                exclude-result-prefixes="xsl">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/page">
        <html lang="fr">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <title><xsl:value-of select="title"/> - <xsl:value-of select="siteName"/></title>
                
                <link rel="stylesheet" href="/e-commerce-front/assets/css/style.css"/>
                <!-- ajout spécifique pour la page produits (optionnel) -->
                <style>
                    /* small page-specific CSS fallback (tu peux mettre dans style.css) */
                </style>
            </head>
            <body>
                <!-- HEADER L'ENTETE -->
                <header class="site-header">
                    <div class="header-inner">
                        <!-- LOGO / BRAND : forcer même logo que la page d'accueil -->
                        <div class="header-left">
                            <a class="brand" href="index.php?page=accueil">
                                <!-- chemin absolu correct pour XAMPP -->
                                <img class="brand-logo" src="/e-commerce-front/assets/images/logo.png" alt="MN Prestige" />
                                <span class="brand-name">MN Prestige</span>
                            </a>
                        </div>
                        <!-- NAV -->
                        <nav class="header-nav">
                            <ul>
                                <li><a href="index.php?page=accueil">Accueil</a></li>
                                <li class="active"><a href="index.php?page=produits">Produits</a></li>
                                <li><a href="index.php?page=contact">Contact</a></li>
                                <li><a href="index.php?page=apropos">À propos</a></li>
                            </ul>
                        </nav>
                        <div class="header-right">
                            <a class="btn-login" href="index.php?page=connexion">Connexion</a>
                        </div>
                    </div>
                </header>
                
                <main class="products-page">
                    <section class="products-top">
                        <div class="products-top-inner">
                            <h1>Nos collections</h1>
                            <p class="muted">Découvrez les pièces sélectionnées par MN Prestige — filtrez, triez et ajoutez au panier.</p>
                            
                            <div class="controls">
                                <label>
                                    Catégorie
                                    <select id="catFilter">
                                        <xsl:for-each select="categories/category">
                                            <option value="{@id}">
                                                <xsl:value-of select="."/>
                                            </option>
                                        </xsl:for-each>
                                    </select>
                                </label>
                                
                                <label>
                                    Trier par
                                    <select id="sortBy">
                                        <option value="default">Par défaut</option>
                                        <option value="price-asc">Prix ↑</option>
                                        <option value="price-desc">Prix ↓</option>
                                        <option value="name-asc">Nom A→Z</option>
                                    </select>
                                </label>
                                
                                <input id="searchBox" type="search" placeholder="Rechercher un produit…" />
                            </div>
                        </div>
                    </section>
                    
                    <section class="products-grid-wrapper">
                        <div id="productsGrid" class="products-grid">
                            <!--La  boucle des produits -->
                            <xsl:for-each select="products/product">
                                <div class="product-card" data-id="{id}">
                                    <div class="product-media">
                                        <img src="{normalize-space(image)}" alt="{name}" class="product-image"/>
                                        <div class="product-badge">
                                            <xsl:choose>
                                                <xsl:when test="number(stock) &gt; 0">En stock</xsl:when>
                                                <xsl:otherwise>En stock</xsl:otherwise>
                                            </xsl:choose>
                                        </div>
                                    </div>
                                    <div class="product-body">
                                        <h3 class="product-name"><xsl:value-of select="name"/></h3>
                                        <div class="product-desc"><xsl:value-of select="short"/></div>
                                        
                                        <div class="product-meta">
                                            <div class="price"><span class="amount"><xsl:value-of select="price"/></span> </div>
                                            <div class="stock"><xsl:value-of select="stock"/> disponibles</div>
                                        </div>
                                        
                                        <div class="product-actions">
                                            <div class="qty">
                                                <button class="qty-dec" data-id="{id}">−</button>
                                                <input class="qty-input" data-id="{id}" value="1" type="number" min="1" max="{stock}"/>
                                                <button class="qty-inc" data-id="{id}">+</button>
                                            </div>
                                            
                                            <button class="btn btn-add"
                                                    data-id="{id}"
                                                    data-name="{name}"
                                                    data-price="{price}"
                                                    data-stock="{stock}"
                                                    data-image="{normalize-space(image)}">
                                                <span class="icon">🛒</span> Ajouter au panier
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </xsl:for-each>
                        </div>
                    </section>
                    
                    <!-- CART BOTTOM carte de la commande -->
                    <aside id="miniCart" class="mini-cart">
                        <div class="mini-cart-inner">
                            <h3>Panier</h3>
                            <div id="cartItems" class="cart-items">
                                <div class="empty">Votre panier est vide.</div>
                            </div>
                            
                            <div class="cart-summary">
                                <div>Totale : <span id="cartTotal">0 FCFA</span></div>
                                <div class="cart-actions">
                                    <button id="clearCart" class="btn outline">Vider</button>
                                    <button id="checkoutBtn" class="btn primary">Finaliser la commande</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                    
                </main>
                
                <!-- FOOTER PIED DE PAGE  -->
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
                
                <script src="/e-commerce-front/assets/js/produits.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
