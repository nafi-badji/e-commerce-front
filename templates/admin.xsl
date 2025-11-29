<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/page">
        <html lang="fr">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <title>Administration - <xsl:value-of select="siteName"/></title>
                
                <link rel="stylesheet" href="/e-commerce-front/assets/css/style.css"/>
                <style>
                    /* mini-styles admin (tu peux déplacer dans style.css) */
                    .admin-wrap{max-width:1200px;margin:28px auto;padding:0 16px;}
                    .admin-grid{display:grid;grid-template-columns:1fr 360px;gap:22px;align-items:start}
                    .card{background:#fff;padding:18px;border-radius:10px;box-shadow:0 6px 18px rgba(2,10,30,0.04);border:1px solid #f1f6fb}
                    .admin-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
                    .btn{display:inline-block;padding:10px 14px;border-radius:8px;border:0;cursor:pointer}
                    .btn-primary{background:linear-gradient(90deg,#4aa3ff,#1673d6);color:#fff}
                    .btn-danger{background:#ff6b6b;color:#fff}
                    .muted{color:#6b7280}
                    .products-table{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
                    .product-card{padding:12px;border-radius:8px;background:#fafcff;border:1px solid #eef6ff;display:flex;flex-direction:column;gap:8px}
                    .product-card img{width:100%;height:160px;object-fit:cover;border-radius:8px}
                    .product-actions{display:flex;gap:8px;flex-wrap:wrap}
                    .orders-list{display:flex;flex-direction:column;gap:12px}
                    .order-card{display:flex;justify-content:space-between;gap:12px;padding:12px;border-radius:8px;background:linear-gradient(#fff,#fbfdff);border:1px solid rgba(2,10,30,0.03)}
                    .small{font-size:.9rem;color:#6b7280}
                    .form-row{display:flex;gap:8px}
                    .form-row .field{flex:1}
                    input[type="text"],input[type="number"],textarea,select{width:100%;padding:8px;border-radius:8px;border:1px solid #dde7f3;background:#fff}
                    label{display:block;font-weight:600;margin-bottom:6px}
                    .admin-empty{padding:40px;text-align:center;color:#6b7280}
                    @media(max-width:980px){ .admin-grid{grid-template-columns:1fr} .product-card img{height:160px} }
                </style>
                
            </head>
            
            <body>
                <!-- HEADER (utilise ta structure existante si tu as base.xsl) -->
                <header class="site-header">
                    <div class="header-inner">
                        <!-- LOGO / BRAND -->
                        <!-- LOGO / BRAND : forcer même logo que la page d'accueil -->
                        <div class="header-left">
                            <a class="brand" href="index.php?page=accueil">
                                <!-- chemin absolu correct pour XAMPP -->
                                <img class="brand-logo" src="/e-commerce-front/assets/images/logo.png" alt="MN Prestige" />
                                <span class="brand-name">MN-Prestige</span>
                            </a>
                        </div>
                        <nav class="header-nav">
                            <ul>
                                <li><a href="index.php?page=accueil">Accueil</a></li>
                                <li><a href="index.php?page=produits">Produits</a></li>
                                <li><a href="index.php?page=contact">Contact</a></li>
                                <li><a href="index.php?page=apropos">À propos</a></li>
                            </ul>
                        </nav>
                       
                    </div>
                </header>
                
                <main class="admin-wrap">
                    <div class="admin-top">
                        <h1>Prestige ~ Administration</h1>
                        <div>
                            <button id="logoutAdmin" class="btn">Se déconnecter (admin)</button>
                        </div>
                    </div>
                    
                    <!-- verification access (JS check) -->
                    <div id="adminBlocked" class="card" style="display:none;">
                        <h2>Accès administrateur requis</h2>
                        <p class="muted">Vous n'êtes pas connecté comme administrateur. Connectez-vous en admin pour accéder à cette interface.</p>
                        <p><small>Pour tests front-only : ouvrez la console et tapez <code>localStorage.setItem('is_admin','1')</code></small></p>
                    </div>
                    
                    <div id="adminContent" style="display:none;">
                        <div class="admin-grid">
                            <!-- gauche: gestion produits -->
                            <div>
                                <div class="card">
                                    <div style="display:flex;justify-content:space-between;align-items:center;">
                                        <h3>Produits</h3>
                                        <div>
                                            <button id="btnNewProduct" class="btn btn-primary">+ Nouveau produit</button>
                                        </div>
                                    </div>
                                    
                                    <div id="productsContainer" style="margin-top:14px;">
                                        <!-- grid injected by JS -->
                                        <div class="admin-empty">Chargement des produits…</div>
                                    </div>
                                </div>
                                
                                <!-- form modal simple (inline) -->
                                <div id="productFormWrap" style="display:none;margin-top:14px" class="card">
                                    <h4 id="formTitle">Ajouter un produit</h4>
                                    <div style="margin-top:8px">
                                        <div class="form-row">
                                            <div class="field">
                                                <label>Nom</label>
                                                <input id="p_name" type="text" />
                                            </div>
                                            <div class="field">
                                                <label>Prix (FCFA)</label>
                                                <input id="p_price" type="number" min="0" />
                                            </div>
                                        </div>
                                        
                                        <div class="form-row" style="margin-top:8px">
                                            <div class="field">
                                                <label>Stock</label>
                                                <input id="p_stock" type="number" min="0" />
                                            </div>
                                            <div class="field">
                                                <label>Catégorie</label>
                                                <input id="p_cat" type="text" />
                                            </div>
                                        </div>
                                        
                                        <div style="margin-top:8px">
                                            <label>Image </label>
                                            <input id="p_image" type="text" placeholder="/e-commerce-front/assets/images/produit.png" />
                                        </div>
                                        
                                        <div style="margin-top:8px">
                                            <label>Description courte</label>
                                            <textarea id="p_short" rows="3"></textarea>
                                        </div>
                                        
                                        <div style="margin-top:12px;display:flex;gap:8px">
                                            <button id="saveProduct" class="btn btn-primary">Enregistrer</button>
                                            <button id="cancelProduct" class="btn">Annuler</button>
                                            <button id="deleteProduct" class="btn btn-danger" style="display:none;margin-left:auto">Supprimer</button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <!-- droite: gestion commandes -->
                            <aside>
                                <div class="card">
                                    <h3>Commandes clients</h3>
                                    <div id="ordersContainer" style="margin-top:12px">
                                        <div class="admin-empty">Chargement des commandes…</div>
                                    </div>
                                </div>
                                
                                <div class="card" style="margin-top:12px">
                                    <h4>Actions rapides</h4>
                                    <p class="small muted">Ces actions sont locales .</p>
                                    <div style="display:flex;gap:8px;margin-top:8px;">
                                        <button id="seedDemo" class="btn">Charger demo</button>
                                        <button id="clearData" class="btn btn-danger">Effacer données</button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>
                
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
                
                <!-- script placé ici (valide XML) -->
                <script src="/e-commerce-front/assets/js/admin.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
