<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <!-- Importer le squelette principal (base.xsl) -->
    <xsl:import href="base.xsl"/>
    
    <!-- Template qui produit le contenu principal (appliqué par base.xsl) -->
    <xsl:template match="about">
        
        <!-- Hero -->
        <section class="hero hero--about" role="region" aria-label="Présentation">
            <div class="hero-inner">
                <h1><xsl:value-of select="hero/heading"/></h1>
                <p class="muted"><xsl:value-of select="hero/sub"/></p>
            </div>
        </section>
        
        <!-- Histoire -->
        <section class="about-section history">
            <div class="container">
                <h2><xsl:value-of select="history/heading"/></h2>
                <xsl:for-each select="history/p">
                    <p><xsl:value-of select="normalize-space(.)"/></p>
                </xsl:for-each>
            </div>
        </section>
        
        <!-- Mission -->
        <section class="about-section mission">
            <div class="container split">
                <div class="col">
                    <h2><xsl:value-of select="mission/heading"/></h2>
                    <p><xsl:value-of select="mission/p"/></p>
                </div>
                <div class="col">
                    <ul class="highlights-list">
                        <xsl:for-each select="mission/ul/li">
                            <li><xsl:value-of select="."/></li>
                        </xsl:for-each>
                    </ul>
                </div>
            </div>
        </section>
        
        <!-- Équipe -->
        <section class="about-section team">
            <div class="container">
                <h2><xsl:value-of select="team/heading"/></h2>
                <div class="team-grid">
                    <xsl:for-each select="team/member">
                        <article class="team-member" id="{@id}">
                            <div class="avatar">
                                <img src="{normalize-space(photo)}" alt="{name} - {role}" onerror="this.src='/e-commerce-front/assets/images/team/default.jpg'"/>
                            </div>
                            <div class="info">
                                <h3><xsl:value-of select="name"/></h3>
                                <p class="role"><xsl:value-of select="role"/></p>
                                <p class="bio"><xsl:value-of select="bio"/></p>
                            </div>
                        </article>
                    </xsl:for-each>
                </div>
            </div>
        </section>
        
        <!-- Points forts -->
        <section class="about-section highlights">
            <div class="container">
                <h2><xsl:value-of select="highlights/heading"/></h2>
                <ul class="features">
                    <xsl:for-each select="highlights/item">
                        <li><xsl:value-of select="."/></li>
                    </xsl:for-each>
                </ul>
            </div>
        </section>
        
        <!-- CTA -->
        <section class="about-cta">
            <div class="container">
                <p class="cta-text"><xsl:value-of select="cta/text"/></p>
                <a class="btn btn-outline" href="index.php?page=contact">Nous contacter</a>
            </div>
        </section>
        
    </xsl:template>
    
    <!-- Empêcher l'affichage accidentel des métadonnées héritées -->
    <xsl:template match="siteName|logo|css|title"/>
    
</xsl:stylesheet>
