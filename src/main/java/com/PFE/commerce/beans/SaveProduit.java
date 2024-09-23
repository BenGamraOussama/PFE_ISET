package com.PFE.commerce.beans;

import com.PFE.commerce.Entity.Produit;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class SaveProduit {

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

    public static Produit toEntity(SaveProduit model)
    {
        if(model == null)
        {
            return null ;
        }
        Produit produit=new Produit();
        produit.setId(model.getId());
        produit.setNom(model.getNom());
        produit.setDescription(model.getDescription());
        produit.setPrix(model.getPrix());
        produit.setQuantite(model.getQuantite());
        produit.setImage(model.getImage());
        return produit;
    }
}
