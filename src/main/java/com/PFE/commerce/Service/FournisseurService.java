package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Fournisseur;

import java.util.List;
import java.util.Optional;

public interface FournisseurService {

    Fournisseur ajouterFournisseur(Fournisseur fournisseur);
    Fournisseur modifierFournisseur(Fournisseur fournisseur, Long id);
    Fournisseur modifierFournisseur1(Fournisseur fournisseur, Long id);
    List<Fournisseur> getFournisseur();
    void supprimerFournisseur(Long id);
    Optional<Fournisseur> getFournisseurById(Long id);

}
