package com.PFE.commerce.beans;

public class PanierDto {
    private Long id;
    private ClientDto clientId;
    private ProduitDto produitId;
    private Integer quantite;
    private Integer prix;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ClientDto getClientId() {
        return clientId;
    }

    public void setClientId(ClientDto clientId) {
        this.clientId = clientId;
    }

    public ProduitDto getProduitId() {
        return produitId;
    }

    public void setProduitId(ProduitDto produitId) {
        this.produitId = produitId;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Integer getPrix() {
        return prix;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }


    public PanierDto(Long id, ClientDto clientId, ProduitDto produitId, Integer quantite, Integer prix) {
        this.id = id;
        this.clientId = clientId;
        this.produitId = produitId;
        this.quantite = quantite;
        this.prix = prix;
    }

    public PanierDto() {
    }
}

