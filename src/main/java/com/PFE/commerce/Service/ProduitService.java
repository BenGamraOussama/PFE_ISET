package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Produit;
import com.PFE.commerce.beans.ProduitDto;
import com.PFE.commerce.beans.SaveProduit;

import java.util.List;
import java.util.Optional;

public interface ProduitService {
    Produit ajouterProduit(SaveProduit model);
    Produit modifierProduit(Produit produit);
    List<Produit> getProduit();
    void supprimerProduit(Long id);
    Optional<Produit>getProduitById(Long id);

    Optional<Produit> findById(Long idProduit);

    Produit modifierProduit(Long id, SaveProduit model);
    ProduitDto produitToProduitDto(final Produit produit, final ProduitDto produitDto );
}
