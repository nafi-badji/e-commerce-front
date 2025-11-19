<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <!-- importer le squelette général (header/footer) -->
    <xsl:import href="base.xsl"/>
    
    
    
    
    
    <xsl:template match="hero">
        <section class="hero-banner" role="banner">
            <!-- fond : si heroImage présent alors background-image, sinon gradient -->
            <xsl:choose>
                <xsl:when test="string-length(normalize-space(heroImage)) &gt; 0">
                    <div class="hero-bg" style="background-image: url({normalize-space(heroImage)});"></div>
                </xsl:when>
                <xsl:otherwise>
                    <div class="hero-bg gradient-bg"></div>
                </xsl:otherwise>
            </xsl:choose>
            
            <!-- la lanière (strap) : cadre centré contenant le texte -->
            <div class="hero-strap">
                <div class="hero-inner">
                    <h1 class="hero-title"><xsl:value-of select="heading"/></h1>
                    <p class="hero-sub"><xsl:value-of select="sub"/></p>
                    <a class="btn btn-primary hero-cta" href="{cta/@href}"><xsl:value-of select="cta"/></a>
                </div>
            </div>
        </section>
    </xsl:template>

    
    
    
    
    
    

    
    

    <!-- PRODUITS : grille centrée, textes stylés, fallback image -->
    <xsl:template match="featured">
        <section class="featured">
            <h2 class="section-title">Produits vedettes</h2>
            
            <div class="grid">
                <xsl:for-each select="product">
                    <article class="card-product">
                        <div class="card-media">
                            <xsl:choose>
                                <xsl:when test="string-length(normalize-space(image)) &gt; 0">
                                    <img src="{normalize-space(image)}" alt="{normalize-space(name)}" loading="lazy"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <img src="/e-commerce-front/assets/images/placeholder.png" alt="Image indisponible" loading="lazy"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </div>
                        
                        <div class="card-body">
                            <h3 class="product-name"><xsl:value-of select="name"/></h3>
                            <p class="excerpt"><xsl:value-of select="excerpt"/></p>
                            
                            <div class="meta">
                                <strong class="price"><xsl:value-of select="price"/> <small><xsl:value-of select="price/@currency"/></small></strong>
                                <a class="add" href="actions/add_to_cart.php?product_id={@id}">Ajouter au panier</a>
                            </div>
                        </div>
                    </article>
                </xsl:for-each>
            </div>
        </section>
    </xsl:template>
    
    <!-- Empêche l'affichage accidentel des noeuds de métadonnées -->
    <xsl:template match="siteName|logo|css|title|heroImage"/>
    
</xsl:stylesheet>
