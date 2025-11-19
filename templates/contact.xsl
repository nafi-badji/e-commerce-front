<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <!-- IMPORT MUST BE FIRST (direct child of xsl:stylesheet) -->
    <xsl:import href="base.xsl"/>
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <!-- Template qui s'applique quand base.xsl fait <xsl:apply-templates/> -->
    <xsl:template match="contact">
        <section class="contact-hero">
            <div class="container">
                <h1><xsl:value-of select="intro/heading"/></h1>
                <p class="muted"><xsl:value-of select="intro/sub"/></p>
            </div>
        </section>
        
        <section class="contact-main">
            <div class="container contact-grid">
                
                <!-- FORMULAIRE -->
                <div class="contact-card contact-form-card" role="form" aria-label="Formulaire de contact">
                    <h2>Nous écrire</h2>
                    <p class="muted"><xsl:value-of select="form/introText"/></p>
                    
                    <form id="contactForm" action="actions/contact.php" method="post" novalidate="novalidate">
                        <xsl:for-each select="form/fields/field">
                            <xsl:variable name="fname" select="@name"/>
                            <xsl:variable name="ftype" select="@type"/>
                            <xsl:variable name="flabel" select="@label"/>
                            <xsl:variable name="fplaceholder" select="@placeholder"/>
                            <xsl:variable name="freq" select="@required"/>
                            
                            <div class="field">
                                <label>
                                    <xsl:attribute name="for"><xsl:value-of select="$fname"/></xsl:attribute>
                                    <xsl:value-of select="$flabel"/>
                                </label>
                                
                                <xsl:choose>
                                    <xsl:when test="$ftype='textarea'">
                                        <xsl:element name="textarea">
                                            <xsl:attribute name="id"><xsl:value-of select="$fname"/></xsl:attribute>
                                            <xsl:attribute name="name"><xsl:value-of select="$fname"/></xsl:attribute>
                                            <xsl:attribute name="placeholder"><xsl:value-of select="$fplaceholder"/></xsl:attribute>
                                            <xsl:attribute name="rows">5</xsl:attribute>
                                            <xsl:if test="$freq='true'">
                                                <xsl:attribute name="required">required</xsl:attribute>
                                            </xsl:if>
                                        </xsl:element>
                                    </xsl:when>
                                    
                                    <xsl:otherwise>
                                        <xsl:element name="input">
                                            <xsl:attribute name="id"><xsl:value-of select="$fname"/></xsl:attribute>
                                            <xsl:attribute name="name"><xsl:value-of select="$fname"/></xsl:attribute>
                                            <xsl:attribute name="type"><xsl:value-of select="$ftype"/></xsl:attribute>
                                            <xsl:attribute name="placeholder"><xsl:value-of select="$fplaceholder"/></xsl:attribute>
                                            <xsl:if test="$freq='true'">
                                                <xsl:attribute name="required">required</xsl:attribute>
                                            </xsl:if>
                                        </xsl:element>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </div>
                            
                        </xsl:for-each>
                        
                        <div class="actions">
                            <button type="submit" class="btn btn-primary" id="contactSubmit">
                                <span><xsl:value-of select="form/submitLabel"/></span>
                            </button>
                        </div>
                        
                        <div id="contactFeedback" role="status" aria-live="polite" style="margin-top:12px;"></div>
                    </form>
                </div>
                
                <!-- INFOS -->
                <aside class="contact-card contact-info-card" aria-label="Coordonnées">
                    <h2>Informations</h2>
                    
                    <div class="info-row">
                        <strong>Adresse</strong>
                        <p><xsl:value-of select="details/address"/></p>
                    </div>
                    
                    <div class="info-row">
                        <strong>Téléphone</strong>
                        <p>
                            <a>
                                <xsl:attribute name="href"><xsl:text>tel:</xsl:text><xsl:value-of select="normalize-space(details/phone)"/></xsl:attribute>
                                <xsl:value-of select="details/phone"/>
                            </a>
                        </p>
                    </div>
                    
                    <div class="info-row">
                        <strong>E-mail</strong>
                        <p>
                            <a>
                                <xsl:attribute name="href"><xsl:text>mailto:</xsl:text><xsl:value-of select="normalize-space(details/email)"/></xsl:attribute>
                                <xsl:value-of select="details/email"/>
                            </a>
                        </p>
                    </div>
                    
                    <div class="info-row">
                        <strong>Horaires</strong>
                        <ul class="hours">
                            <li><xsl:value-of select="details/hours/weekday"/></li>
                            <li><xsl:value-of select="details/hours/saturday"/></li>
                            <li><xsl:value-of select="details/hours/sunday"/></li>
                        </ul>
                    </div>
                    
                    <div class="info-row">
                        <strong>Suivez-nous</strong>
                        <div class="icons">
                            <a href="#" title="Facebook"><img src="/e-commerce-front/assets/images/facebook.png" alt="Facebook" /></a>
                            <a href="#" title="Instagram"><img src="/e-commerce-front/assets/images/instagram.png" alt="Instagram" /></a>
                            <a href="#" title="Snapchat"><img src="/e-commerce-front/assets/images/snapchat.png" alt="Snapchat" /></a>
                        </div>
                    </div>
                    
                    <div class="map">
                        <a>
                            <xsl:attribute name="href">https://www.google.com/maps/search/?api=1&amp;query=Dakar</xsl:attribute>
                            <xsl:attribute name="target">_blank</xsl:attribute>
                            <xsl:attribute name="rel">noopener</xsl:attribute>
                            Voir sur la carte
                        </a>
                    </div>
                </aside>
                
            </div>
        </section>
        
        <!-- charger script externe si tu l'as (sinon supprime cette ligne) -->
        <script src="/e-commerce-front/assets/js/contact.js" defer="defer"></script>
    </xsl:template>
    
</xsl:stylesheet>
