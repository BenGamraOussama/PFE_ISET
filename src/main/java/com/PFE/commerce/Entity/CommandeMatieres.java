package com.PFE.commerce.Entity;

import jakarta.persistence.*;
@Entity
public class CommandeMatieres {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    private  Produit  produit;
    private Integer quantite;

    @ManyToOne
    private Commande commande;


    public CommandeMatieres(Produit produit, Integer quantite, Commande commande){
        this.produit = produit;
        this.quantite = quantite;
        this.commande = commande;
    }

    public CommandeMatieres() {
    }

    @Override
    public String toString() {
        return "CommandeMatieres{" +
                "id=" + id +
                ", produit=" + produit +
                ", quantite=" + quantite +
                ", commande=" + commande +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }
}
