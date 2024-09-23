package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Panier;
import com.PFE.commerce.beans.PanierDto;
import com.PFE.commerce.beans.PanierRq;
import com.PFE.commerce.beans.PatchPanier;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface PanierService {

    Panier ajouterPanier(PanierRq panierRq);
    List<PanierDto> listePanierByClientId(Long id);
    ResponseEntity<?> patchPanierById(PatchPanier patchPanier);
    void supprimerById(Long id);

    void supprimerPanier(Panier panier);
    PanierDto panierToPanierDto(final Panier panier, final PanierDto panierDto);
}
