package com.PFE.commerce.Entity;


import jakarta.persistence.*;

@Entity
public class Panier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "clientId", referencedColumnName = "id")
    private Client client;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "produitId", referencedColumnName = "id")
    private Produit produit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
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

    private Integer quantite;

    public Panier(Client client, Produit produit, Integer quantite) {
        this.client = client;
        this.produit = produit;
        this.quantite = quantite;
    }

    public Panier() {
    }
}
