package com.PFE.commerce.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.Instant;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String mdp;
    private String role;
    //private String resetToken;
    //private Instant resetTokenExpiry;

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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    /*public String getResetToken() {
        return resetToken;
    }

   public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public Instant getResetTokenExpiry() {
        return resetTokenExpiry;
    }

    public void setResetTokenExpiry(Instant resetTokenExpiry) {
        this.resetTokenExpiry = resetTokenExpiry;
    }*/

    public Admin(Long id, String nom, String prenom, String email, String mdp, String role/*, String resetToken, Instant resetTokenExpiry*/) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.mdp = mdp;
        this.role = role;

    }

    public Admin() {
    }
}
