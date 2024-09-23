package com.PFE.commerce.Service;


import com.PFE.commerce.Entity.AffectationCommande;
import com.PFE.commerce.beans.AffectationCommandeDto;
import com.PFE.commerce.beans.AffictationCommandeLRq;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AffectationCommandeService {
    ResponseEntity<?>addAffect(AffictationCommandeLRq affictationCommandeLRq );

    List<AffectationCommandeDto> findAllByLivreurId(Long id);
    AffectationCommandeDto affectationCommandeToAffectationCommandeDto(final AffectationCommande affectationCommande, final AffectationCommandeDto affectationCommandeDto);
}
