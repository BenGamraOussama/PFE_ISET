package com.PFE.commerce.beans;

import com.PFE.commerce.Entity.Commande;

public class CommandeDto {
    private Long id;
    private boolean livred;
    private ClientDto client;

    public CommandeDto(Commande commande) {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isLivred() {
        return livred;
    }

    public void setLivred(boolean livred) {
        this.livred = livred;
    }

    public ClientDto getClient() {
        return client;
    }

    public void setClient(ClientDto client) {
        this.client = client;
    }

    public CommandeDto(boolean livred, ClientDto client) {
        this.livred = livred;
        this.client = client;
    }

    public CommandeDto() {
    }
}
