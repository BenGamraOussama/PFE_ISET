package com.PFE.commerce.Entity;


import jakarta.persistence.*;

@Entity
public class Livreur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String telephone;
    private String email;
    private String mdp;
    private String adresse;
    @Column(columnDefinition = "tinyint(1) default 1")
    private boolean isLivreur=true;

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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public boolean isLivreur() {
        return isLivreur;
    }

    public void setLivreur(boolean livreur) {
        isLivreur = livreur;
    }

    public Livreur(String nom, String prenom, String telephone, String email, String mdp, String adresse, boolean isLivreur) {
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.email = email;
        this.mdp = mdp;
        this.adresse = adresse;
        this.isLivreur = isLivreur;
    }

    public Livreur() {
    }

}
