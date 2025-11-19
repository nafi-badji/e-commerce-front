<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/page">
        <html lang="fr">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <title><xsl:value-of select="title"/> - <xsl:value-of select="siteName"/></title>
                
                <!-- ton css global -->
                <link rel="stylesheet" href="/e-commerce-front/assets/css/style.css"/>
                <!-- police (les & sont bien écrits) -->
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&amp;family=Inter:wght@300;400;600&amp;display=swap" rel="stylesheet"/>
            </head>
            
            <body>
                <!-- HEADER -->
                <header class="site-header">
                    <div class="header-inner">
                        <div class="header-left">
                            <a class="brand" href="index.php?page=accueil">
                                <img class="brand-logo" src="{normalize-space(logo)}" alt="{normalize-space(siteName)}"/>
                                <span class="brand-name"><xsl:value-of select="siteName"/></span>
                            </a>
                        </div>
                        
                        <nav class="header-nav">
                            <ul>
                                <li><a href="index.php?page=accueil">Accueil</a></li>
                                <li><a href="index.php?page=produits">Produits</a></li>
                                <li><a href="index.php?page=contact">Contact</a></li>
                                <li><a href="index.php?page=apropos">À propos</a></li>
                                <li><a class="cart-link active" href="index.php?page=panier">Panier</a></li>
                            </ul>
                        </nav>
                        
                        <div class="header-right">
                            <a class="btn-login" href="index.php?page=connexion">Connexion</a>
                        </div>
                    </div>
                </header>
                
                <!-- MAIN -->
                <main class="site-main">
                    <section class="cart-section">
                        <div class="cart-inner">
                            <!-- Empty state -->
                            <xsl:choose>
                                <xsl:when test="cart/status='empty'">
                                    <div class="cart-empty" role="status" aria-live="polite">
                                        <!-- image: si défini dans XML, utilise sinon inline SVG fallback -->
                                        <xsl:choose>
                                            <xsl:when test="string-length(normalize-space(cart/emptyImage)) &gt; 0">
                                                <img src="{normalize-space(cart/emptyImage)}"
                                                     alt="Panier vide"
                                                     class="cart-empty-img"
                                                     style="width:160px; height:auto;"/>

                                            </xsl:when>
                                            <xsl:otherwise>
                                                <!-- fallback svg simple -->
                                                <svg class="cart-empty-img" width="220" height="160" viewBox="0 0 64 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <rect width="64" height="48" rx="6" fill="#eef6ff"/>
                                                    <path d="M8 10h8l4 18h26l6-12H22" fill="none" stroke="#7aa7e8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <circle cx="28" cy="38" r="3" fill="#7aa7e8"/>
                                                    <circle cx="46" cy="38" r="3" fill="#7aa7e8"/>
                                                </svg>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                        
                                        <h2 class="cart-empty-title"><xsl:value-of select="cart/message"/></h2>
                                        <p class="cart-empty-desc">Ajoutez vos articles préférés depuis le catalogue.</p>
                                        
                                        <a class="btn btn-primary" href="{normalize-space(cart/ctaLink)}">
                                            <span class="btn-icon">🛍️</span>
                                            <span><xsl:value-of select="cart/ctaLabel"/></span>
                                        </a>
                                    </div>
                                </xsl:when>
                                
                                <xsl:otherwise>
                                    <div class="cart-nonempty">
                                        <h2>Votre panier</h2>
                                        <p>Articles ... (à implémenter)</p>
                                    </div>
                                </xsl:otherwise>
                            </xsl:choose>
                            
                        </div>
                    </section>
                </main>
                
                <!-- FOOTER -->
                <footer class="site-footer">
                    <div class="footer-inner">
                        <div>
                            <h4>À propos</h4>
                            <p>MN Prestige — vêtements &amp; accessoires premium fabriqués localement.</p>
                        </div>
                        <div>
                            <h4>Liens rapides</h4>
                            <ul>
                                <li><a href="index.php?page=accueil">Accueil</a></li>
                                <li><a href="index.php?page=produits">Produits</a></li>
                                <li><a href="index.php?page=contact">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Contact</h4>
                            <ul>
                                <li><a href="mailto:mn@prestige.com">mn@prestige.com</a></li>
                                <li>+221 77 123 45 67</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Réseaux</h4>
                            <div class="icons">
                                <img src="/e-commerce-front/assets/images/facebook.png" alt="FB" style="width:28px;height:28px"/>
                                <img src="/e-commerce-front/assets/images/instagram.png" alt="IG" style="width:28px;height:28px"/>
                                <img src="/e-commerce-front/assets/images/snapchat.png" alt="SC" style="width:28px;height:28px"/>
                            </div>
                        </div>
                    </div>
                    <div class="footer-copy">©️ MN Prestige — 2025</div>
                </footer>
                
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
