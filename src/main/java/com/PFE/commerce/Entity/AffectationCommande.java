package com.PFE.commerce.Entity;

import jakarta.persistence.*;

@Entity
public class AffectationCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Livreur livreur;

    @ManyToOne
    private Commande commande;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    public Livreur getLivreur() {
        return livreur;
    }

    public void setLivreur(Livreur livreur) {
        this.livreur = livreur;
    }

    public AffectationCommande(Commande commande, Livreur livreur) {
        this.commande = commande;
        this.livreur = livreur;
    }

    public AffectationCommande() {
    }

    @Override
    public String toString() {
        return "AffectationCommande{" + "commande=" + commande + ", livreur=" + livreur + '}';
    }
}
