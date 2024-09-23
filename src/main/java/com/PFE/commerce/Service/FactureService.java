package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Facture;
import com.PFE.commerce.beans.FactureDto;

public interface FactureService {
    FactureDto confirmer(Long id);

    FactureDto save(Long idCommande);
    FactureDto factureToFactureDto(final Facture facture, final FactureDto factureDto);

}
