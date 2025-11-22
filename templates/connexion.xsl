<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <!-- TEMPLATE PRINCIPAL (page connexion autonome) -->
    <xsl:template match="/page">
        <html lang="fr">
            <head>
                <meta charset="utf-8"/>
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
                
                <!-- Lien vers ton CSS global -->
                <link rel="stylesheet" href="/e-commerce-front/assets/css/style.css" />
                <style>
                    /* Styles spécifiques à la page connexion (s'ajoutent au style.css) */
                    .login-page {
                    min-height: calc(100vh - 220px); /* pousse le footer en bas si peu de contenu */
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:40px 18px;
                    background: linear-gradient(180deg, rgba(250,250,251,1), rgba(245,247,250,1));
                    }
                    .login-card{
                    width:100%;
                    max-width:980px;
                    display:grid;
                    grid-template-columns: 1fr 360px;
                    gap:28px;
                    align-items:start;
                    background:rgba(255,255,255,0.95);
                    border-radius:12px;
                    padding:28px;
                    box-shadow:0 10px 30px rgba(10,20,30,0.06);
                    border:1px solid rgba(15,30,50,0.04);
                    }
                    .login-form{
                    padding-right:18px;
                    }
                    .brand-small{
                    display:flex;align-items:center;gap:12px;margin-bottom:14px;
                    }
                    .brand-small img{height:48px;width:48px;object-fit:contain;border-radius:50%;border:1px solid rgba(0,0,0,0.06);padding:8px;background:#fff;}
                    .brand-small h3{margin:0;font-size:1.05rem;color:#233047;font-weight:700}
                    .field{margin-top:14px}
                    .field label{display:block;font-size:0.9rem;color:#607184;margin-bottom:8px}
                    .field input[type="text"], .field input[type="email"], .field input[type="password"]{
                    width:100%;padding:12px 14px;border-radius:8px;border:1px solid rgba(15,30,50,0.08);background:transparent;
                    outline:none;font-size:0.98rem;color:#12202b;
                    transition:all .15s ease;
                    }
                    .field input:focus{box-shadow:0 6px 20px rgba(74,163,255,0.08);border-color:rgba(74,163,255,0.6)}
                    .actions{margin-top:16px;display:flex;align-items:center;gap:12px}
                    .btn-primary{
                    display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:10px;
                    background:linear-gradient(180deg,#3fa4ff,#2f7fe6);color:white;font-weight:700;border:none;
                    cursor:pointer;box-shadow:0 10px 22px rgba(47,127,230,0.15);
                    }
                    .btn-primary svg{width:18px;height:18px;opacity:0.95}
                    .link-muted{color:#2f6a88;font-weight:600;text-decoration:none}
                    .help-box{padding:18px;background:linear-gradient(180deg,#fcfdff,#f6fbff);border-radius:8px;border:1px solid rgba(15,30,50,0.03)}
                    .help-box h4{margin:0 0 8px 0;font-size:1.02rem;color:#1f2d3a}
                    .small{font-size:0.9rem;color:#6f8090;margin-top:12px}
                    .show-pass{cursor:pointer;background:transparent;border:none;color:#2c6fb7;font-weight:600}
                    .remember{display:flex;align-items:center;gap:8px;font-size:0.95rem;color:#4b6576}
                    @media(max-width:920px){
                    .login-card{grid-template-columns:1fr;max-width:720px}
                    }
                    @media(max-width:520px){
                    .login-card{padding:18px}
                    .brand-small img{height:40px;width:40px}
                    }
                </style>
                
            </head>
            
            <body>
                <!-- header minimal : on reprend le header visuel de style.css -->
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
                            </ul>
                        </nav>
                        
                        <!-- Connexion (si back-end gère l'état, remplacer par Déconnexion) -->
                        <div class="header-right">
                            <a class="btn-login" href="index.php?page=connexion">Deconnexion</a>
                        </div>
                    </div>
                </header>
                
                <!-- MAIN -->
                <main class="login-page">
                    <div class="login-card" role="region" aria-label="Formulaire de connexion">
                        
                        <!-- LEFT: formulaire -->
                        <div class="login-form">
                            <div class="brand-small">
                                <img src="{normalize-space(logo)}" alt="logo"/>
                                <div>
                                    <h3><xsl:value-of select="siteName"/></h3>
                                    <div style="color:#7a8b95;font-size:.95rem">Connexion</div>
                                </div>
                            </div>
                            
                            <!-- FORM : utilise attributes valides pour XML -->
                            <form action="actions/login.php" method="post" novalidate="novalidate">
                                <div class="field">
                                    <label for="email">Adresse e-mail</label>
                                    <input id="email" type="email" name="email" placeholder="prenom@exemple.com" required="required" />
                                </div>
                                
                                <div class="field">
                                    <label for="password">Mot de passe</label>
                                    <div style="display:flex;gap:10px;align-items:center;">
                                        <input id="password" type="password" name="password" placeholder="••••••••" required="required" style="flex:1"/>
                                        <button type="button" class="show-pass" onclick="togglePassword()" aria-label="Afficher ou masquer le mot de passe">👁</button>
                                    </div>
                                </div>
                                
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
                                    <label class="remember"><input type="checkbox" name="remember" value="1"/> Se souvenir de moi</label>
                                    <a class="link-muted" href="index.php?page=inscription">Créer un compte</a>
                                </div>
                                
                                <div class="actions">
                                    <button class="btn-primary" type="submit">
                                        <!-- icône cadenas -->
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#fff"/><path d="M7 10V8a5 5 0 1110 0v2" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                        Se connecter
                                    </button>
                                </div>
                                
                                <div class="small">Accédez à votre espace client pour commander, suivre vos achats et gérer votre compte.</div>
                            </form>
                        </div>
            
                        <!-- Bouton Retour à l’accueil -->
                        <div class="back-home">
                            <a href="index.php?page=accueil" class="back-link">
                                <!-- Petite flèche SVG -->
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" 
                                     xmlns="http://www.w3.org/2000/svg" class="icon-back">
                                    <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" 
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Revenir à l’accueil</span>
                            </a>
                        </div>
                        
                        <!-- RIGHT : encart aide / infos -->
                        <aside class="help-box">
                            <h4>Bienvenue chez <xsl:value-of select="siteName"/></h4>
                            <p style="color:#6b7f8f;line-height:1.5;margin-top:8px">Découvrez nos collections de chemises, robes et pantalons — style et qualité conçus au Sénégal.</p>
                            
                            <ul style="margin-top:14px;color:#2f6a88">
                                <li><strong>Livraison rapide</strong><div class="small" style="margin-top:6px;color:#5d6d75">Option express pour Dakar et régions.</div></li>
                                <li style="margin-top:10px"><strong>Paiement sécurisé</strong><div class="small" style="margin-top:6px;color:#5d6d75">Transactions protégées.</div></li>
                                <li style="margin-top:10px"><strong>SAV local</strong><div class="small" style="margin-top:6px;color:#5d6d75">Support client à Dakar — assistance en français.</div></li>
                            </ul>
                        </aside>
                        
                    </div>
                </main>
                
               
                
                <!-- FOOTER : simple, plein largeur -->
                <footer class="site-footer">
                    <div class="footer-inner">
                        <div class="footer-col about">
                            <h4>À propos</h4>
                            <p><xsl:value-of select="siteName"/> propose une sélection moderne de vêtements : robes, chemises, pantalons et accessoires tendance au Sénégal.</p>
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
                    <div class="footer-copy">© <xsl:value-of select="siteName"/> — 2025</div>
                </footer>
                
                <!-- petit script pour voir/masquer le mot de passe -->
                <script>
                    function togglePassword(){
                    var p = document.getElementById('password');
                    if(!p) return;
                    if(p.type === 'password'){ p.type = 'text'; } else { p.type = 'password'; }
                    }
                </script>
                <!-- Au bon endroit dans connexion.xsl (dans <script> après la soumission réussie) -->
                <script>
                    // Exemple simple : après validation côté serveur tu peux set le flag côté front
                    function onLoginSuccess() {
                    localStorage.setItem('user_logged', '1');
                    // redirige vers la page sur laquelle tu veux (par ex produits)
                    window.location.href = 'index.php?page=produits';
                    }
                    
                    // Si tu fais un submit normal, appelle onLoginSuccess() après retour OK du serveur.
                </script>

            </body>
        </html>
    </xsl:template>
    
</xsl:stylesheet>
