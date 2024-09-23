package com.PFE.commerce.beans;

public class PanierRq {
    private Long idProduit;
    private Long idClient;

    public Long getIdProduit() {
        return idProduit;
    }

    public void setIdProduit(Long idProduit) {
        this.idProduit = idProduit;
    }

    public Long getIdClient() {
        return idClient;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public PanierRq(Long idProduit, Long idClient) {
        this.idProduit = idProduit;
        this.idClient = idClient;
    }

    public PanierRq() {
    }
}
