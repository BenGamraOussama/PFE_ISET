package com.PFE.commerce.Entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Commande implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean livred;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "idClient", referencedColumnName = "id")
    private Client client;



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

    public boolean isLivred() {
        return livred;
    }

    public void setLivred(boolean livred) {
        this.livred = livred;
    }

    public Commande() {
    }

    public Commande(boolean livred, Client client) {
        this.livred = livred;
        this.client = client;
    }

}
