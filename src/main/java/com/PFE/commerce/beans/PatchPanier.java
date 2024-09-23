package com.PFE.commerce.beans;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class PatchPanier {
    private  Long idPanier;
    @Enumerated(EnumType.STRING)
    private Operation operation;

    public Long getIdPanier() {
        return idPanier;
    }

    public void setIdPanier(Long idPanier) {
        this.idPanier = idPanier;
    }

    public Operation getOperation() {
        return operation;
    }

    public void setOperation(Operation operation) {
        this.operation = operation;
    }

    public PatchPanier(Long idPanier, Operation operation) {
        this.idPanier = idPanier;
        this.operation = operation;
    }

    public PatchPanier() {
    }
}
