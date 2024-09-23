package com.PFE.commerce.beans;

public class CommandeMatieresDto {
    private Long id;
    private ProduitDto produitDto;
    private Integer quantite;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProduitDto getProduitDto() {
        return produitDto;
    }

    public void setProduitDto(ProduitDto produitDto) {
        this.produitDto = produitDto;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }


    public CommandeMatieresDto() {
    }

    public CommandeMatieresDto(ProduitDto produitDto, Integer quantite) {
        this.produitDto = produitDto;
        this.quantite = quantite;
    }

    @Override
    public String toString() {
        return "CommandeMatieresDto{" +
                "id=" + id +
                ", produitDto=" + produitDto +
                ", quantite=" + quantite +
                '}';
    }
}
