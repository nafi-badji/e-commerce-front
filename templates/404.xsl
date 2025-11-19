<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="base.xsl"/>
    
    <!-- template pour afficher le contenu 404 — base.xsl gère la racine -->
    <xsl:template match="content">
        <section style="text-align:center;padding:48px 20px;">
            <h1><xsl:value-of select="heading"/></h1>
            <p style="margin:12px 0;color:#666;"><xsl:value-of select="message"/></p>
            <p><a href="{home/@href}" style="display:inline-block;padding:10px 14px;background:#4aa3ff;color:#fff;border-radius:8px;text-decoration:none;"> <xsl:value-of select="home"/></a></p>
        </section>
    </xsl:template>
    
    <!-- éviter d'afficher siteName/logo/css si apply-templates descend dessus -->
    <xsl:template match="siteName|logo|css|title"/>
    
</xsl:stylesheet>
