package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Categorie;

import java.util.List;
import java.util.Optional;

public interface CategorieService {
    Categorie ajouterCategorie(Categorie categorie);
    Categorie modifierCategorie(Categorie categorie);

    List<Categorie> getCategorie();
    void supprimerCategorie(Long id);
    Optional<Categorie> getCategorieById(Long id);
}
