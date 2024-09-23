package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Commande;
import com.PFE.commerce.beans.AjouterCommandeRq;
import com.PFE.commerce.beans.CommandeDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommandeService {
    ResponseEntity<?> ajouterCommande(AjouterCommandeRq ajoutercommandeRq);

    List<Commande> listeCommande();

    CommandeDto commandeToCommandeDto(final Commande commande, CommandeDto commandeDto);

    Commande commandeByIdE(Long id);
    CommandeDto commandeById(Long id);
}
