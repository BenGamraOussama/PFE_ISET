package com.PFE.commerce.beans;



import java.util.List;

public class AjouterCommandeRq {
    private List<Long> idPanierList;
    private Long idClient;

    public List<Long> getIdPanierList() {
        return idPanierList;
    }

    public void setIdPanierList(List<Long> idPanierList) {
        this.idPanierList = idPanierList;
    }

    public Long getIdClient() {
        return idClient;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public AjouterCommandeRq(List<Long> idPanierList, Long idClient) {
        this.idPanierList = idPanierList;
        this.idClient = idClient;
    }

    public AjouterCommandeRq() {
    }
}
