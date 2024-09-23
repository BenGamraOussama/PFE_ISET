package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Livreur;
import com.PFE.commerce.beans.LivreurDto;

import java.util.List;
import java.util.Optional;

public interface LivreurService {

    Livreur ajouterLivreur(Livreur livreur);
    Livreur modifierLivreur(Livreur livreur);
    List<Livreur> getLivreur();
    void supprimerLivreur(Long id);
    Optional<Livreur>getLivreurById(Long id);

    LivreurDto livreurToLivreurDto(Livreur livreur, LivreurDto livreurDto);
}
