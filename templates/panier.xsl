<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/page">
        <html lang="fr">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <title><xsl:value-of select="title"/> - <xsl:value-of select="siteName"/></title>
                
                <!-- CSS global -->
                <link rel="stylesheet" href="/e-commerce-front/assets/css/style.css"/>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&amp;family=Inter:wght@300;400;600&amp;display=swap" rel="stylesheet"/>
                
                <!-- small page-specific styles (override / complément de style.css) -->
                <style>
                    .cart-section{ max-width:1100px; margin:40px auto; padding:20px; }
                    .cart-inner{ display:block; gap:24px; }
                    .cart-empty{ text-align:center; padding:36px 12px; background:linear-gradient(180deg,#f8fbff,#ffffff); border-radius:12px; }
                    .cart-empty-img{ max-width:220px; margin:0 auto 18px; display:block; }
                    .cart-empty-title{ font-size:1.6rem; margin:8px 0; color:#222; }
                    .cart-empty-desc{ color:#666; margin-bottom:18px; }
                    
                    /* Table */
                    .cart-table{ width:100%; border-collapse:collapse; margin-top:20px; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 6px 20px rgba(10,20,40,0.04); }
                    .cart-table thead{ background:linear-gradient(90deg,#f3f8ff,#eef6ff); }
                    .cart-table th, .cart-table td{ padding:14px 16px; text-align:left; border-bottom:1px solid #eef3fb; vertical-align:middle; }
                    .cart-table img{ width:92px; height:92px; object-fit:cover; border-radius:8px; box-shadow:0 6px 18px rgba(2,10,30,0.04); }
                    
                    .qty-control{ display:flex; gap:8px; align-items:center; }
                    .qty-btn{ width:34px; height:34px; border-radius:8px; border:1px solid #e2edf9; background:#fff; cursor:pointer; font-size:18px; line-height:1; }
                    .qty-input{ width:56px; text-align:center; padding:6px 8px; border-radius:8px; border:1px solid #eef3fb; }
                    
                    .cart-summary{ margin-top:18px; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
                    .cart-total{ font-size:1.25rem; font-weight:700; color:#0b3b66; }
                    .cart-actions{ display:flex; gap:12px; justify-content:flex-end; }
                    
                    .btn-primary{ background:#2EA3FF; color:#fff; padding:10px 18px; border-radius:10px; border:0; font-weight:700; cursor:pointer; }
                    .btn-outline{ background:transparent; color:#2EA3FF; padding:10px 18px; border-radius:10px; border:1px solid rgba(46,163,255,0.25); cursor:pointer; font-weight:700; }
                    
                    /* responsive */
                    @media (max-width:800px){
                    .cart-table thead{ display:none; }
                    .cart-table td{ display:block; width:100%; box-sizing:border-box; }
                    .cart-table tr{ display:block; margin-bottom:12px; background:#fff; border-radius:10px; overflow:hidden; }
                    .cart-table img{ width:100%; height:auto; }
                    .cart-summary{ flex-direction:column; align-items:stretch; text-align:center; }
                    .cart-actions{ justify-content:center; width:100%; }
                    }
                </style>
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
                            
                            <!-- Empty / fallback controlled by XML -->
                            <xsl:choose>
                                <xsl:when test="cart/status='empty'">
                                    <div class="cart-empty" role="status" aria-live="polite">
                                        <xsl:choose>
                                            <xsl:when test="string-length(normalize-space(cart/emptyImage)) &gt; 0">
                                                <img src="{normalize-space(cart/emptyImage)}" alt="Panier vide" class="cart-empty-img"/>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <svg class="cart-empty-img" width="260" height="150" viewBox="0 0 64 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
                                    <!-- zone que le JS remplira dynamiquement depuis localStorage -->
                                    <div id="cart-root">
                                        <!-- fallback visible si JS désactivé -->
                                        <noscript>
                                            <div class="cart-empty">
                                                <h2 class="cart-empty-title">Activer JavaScript</h2>
                                                <p class="cart-empty-desc">Pour voir les produits ajoutés au panier, activez JavaScript dans votre navigateur.</p>
                                                <a class="btn btn-outline" href="index.php?page=produits">Voir les produits</a>
                                            </div>
                                        </noscript>
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
                
                <!-- JS: charge le fichier qui fera le rendu depuis localStorage -->
                <script src="/e-commerce-front/assets/js/panier.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
