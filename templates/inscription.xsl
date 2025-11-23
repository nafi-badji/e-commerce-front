<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/page">
        <html lang="fr">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title><xsl:value-of select="title"/> - <xsl:value-of select="siteName"/></title>
                
                <!-- CSS global -->
                <link rel="stylesheet" href="/e-commerce-front/assets/css/style.css"/>
                <!-- police premium (note : les & sont échappés avec &amp;) -->
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&amp;family=Inter:wght@300;400;600;700&amp;display=swap" rel="stylesheet"/>
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
                            </ul>
                        </nav>
                        
                        <div class="header-right">
                            <a class="btn-login" href="index.php?page=connexion">Connexion</a>
                        </div>
                    </div>
                </header>
                
                <!-- MAIN : centered, responsive -->
                <main class="register-page">
                    <div class="register-card-centered">
                        
                        <!-- Left column: form -->
                        <div class="register-card register-card--form" role="region" aria-label="Créer un compte">
                            <div class="brand-small">
                                <img src="{normalize-space(logo)}" alt="logo" class="brand-small-logo"/>
                                <div>
                                    <h3 class="brand-small-title"><xsl:value-of select="siteName"/></h3>
                                    <div class="muted">Créer un compte</div>
                                </div>
                            </div>
                            
                            <form id="registerForm" class="register-form" action="actions/register.php" method="post" enctype="multipart/form-data" novalidate="novalidate">
                                <div class="grid-2">
                                    <div class="field">
                                        <label for="firstname">Prénom</label>
                                        <input id="firstname" name="firstname" type="text" placeholder="Prénom" required="required" />
                                    </div>
                                    <div class="field">
                                        <label for="lastname">Nom</label>
                                        <input id="lastname" name="lastname" type="text" placeholder="Nom" required="required" />
                                    </div>
                                </div>
                                
                                <div class="field">
                                    <label for="email">Adresse e-mail</label>
                                    <input id="email" name="email" type="email" placeholder="prenom@exemple.com" required="required" />
                                </div>
                                
                                <div class="grid-2">
                                    <div class="field">
                                        <label for="password">Mot de passe</label>
                                        <div class="input-icon">
                                            <input id="password" name="password" type="password" placeholder="8+ caractères" required="required" />
                                            <button type="button" class="pwd-toggle" onclick="togglePwd('password', this)" aria-label="Afficher le mot de passe">Voir</button>
                                        </div>
                                        <small class="muted">Au moins 8 caractères, 1 lettre, 1 chiffre recommandé.</small>
                                    </div>
                                    
                                    <div class="field">
                                        <label for="confirm">Confirmer le mot de passe</label>
                                        <div class="input-icon">
                                            <input id="confirm" name="confirm" type="password" placeholder="Confirmer" required="required" />
                                            <button type="button" class="pwd-toggle" onclick="togglePwd('confirm', this)" aria-label="Afficher la confirmation">Voir</button>
                                        </div>
                                        <div id="pw-match" class="small muted" aria-live="polite"></div>
                                    </div>
                                </div>
                                
                                <div class="grid-2">
                                    <div class="field">
                                        <label for="phone">Téléphone</label>
                                        <input id="phone" name="phone" type="text" placeholder="+221 77 123 45 67" />
                                    </div>
                                    <div class="field">
                                        <label for="dob">Date de naissance</label>
                                        <input id="dob" name="dob" type="date" />
                                    </div>
                                </div>
                                
                                <div class="field upload-field">
                                    <label for="avatar">Photo de profil (optionnel)</label>
                                    <div class="avatar-row">
                                        <input id="avatar" name="avatar" type="file" accept="image/*" onchange="previewAvatar(event)" />
                                        <div id="avatarPreview" class="avatar-preview" aria-hidden="true" title="Aperçu"></div>
                                    </div>
                                </div>
                                
                                <div class="field">
                                    <label class="checkbox"><input type="checkbox" id="terms" name="terms" value="1" required="required"/> J'accepte les <a href="index.php?page=apropos">conditions</a></label>
                                </div>
                                
                                <div class="actions">
                                    <button id="registerBtn" class="btn btn-primary" type="submit">
                                        <span class="icon">Créer le compte</span>
                                    </button>
                                </div>
                                
                                <p class="muted" style="margin-top:12px;">Vous avez déjà un compte ? <a href="index.php?page=connexion">Se connecter</a></p>
                                
                                <div class="back-home-premium" style="margin-top:18px;">
                                    <a href="index.php?page=accueil" class="back-link-premium">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        <span>Revenir à l’accueil</span>
                                    </a>
                                </div>
                                
                            </form>
                        </div>
                        
                       
                        
                    </div>
                </main>
                
                <!-- FOOTER -->
                <footer class="site-footer">
                    <div class="footer-inner">
                        <div>
                            <h4>À propos</h4>
                            <p>MN Prestige propose une sélection moderne de vêtements : robes, chemises, pantalons et accessoires tendance.</p>
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
                    <div class="footer-copy">© MN Prestige — 2025</div>
                </footer>
                
                <!-- JS helpers -->
                <script src="/e-commerce-front/assets/js/inscription.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
