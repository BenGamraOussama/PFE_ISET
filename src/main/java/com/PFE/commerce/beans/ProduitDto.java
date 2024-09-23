package com.PFE.commerce.beans;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;

public class ProduitDto {
    private Long id;
    private String nom;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private int prix;
    private int quantite;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;

    private Long idCategorie;
    private Long idFournisseur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrix() {
        return prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getIdCategorie() {
        return idCategorie;
    }

    public void setIdCategorie(Long idCategorie) {
        this.idCategorie = idCategorie;
    }

    public Long getIdFournisseur() {
        return idFournisseur;
    }

    public void setIdFournisseur(Long idFournisseur) {
        this.idFournisseur = idFournisseur;
    }

    public ProduitDto(Long id, String nom, String description, int prix, int quantite, String image, Long idCategorie, Long idFournisseur) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.quantite = quantite;
        this.image = image;
        this.idCategorie = idCategorie;
        this.idFournisseur = idFournisseur;
    }

    public ProduitDto() {
    }
}
