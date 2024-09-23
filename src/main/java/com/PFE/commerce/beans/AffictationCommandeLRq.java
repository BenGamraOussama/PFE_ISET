package com.PFE.commerce.beans;

public class AffictationCommandeLRq {
    private Long id;
    private Long commande;
    private Long livreur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCommande() {
        return commande;
    }

    public void setCommande(Long commande) {
        this.commande = commande;
    }

    public Long getLivreur() {
        return livreur;
    }

    public void setLivreur(Long livreur) {
        this.livreur = livreur;
    }

    public AffictationCommandeLRq(Long commande, Long livreur) {
        this.commande = commande;
        this.livreur = livreur;
    }

    public AffictationCommandeLRq() {
    }

    @Override
    public String toString() {
        return "AffictationCommandeLRq{" + "commande=" + commande + ", livreur=" + livreur + '}';
    }
}
