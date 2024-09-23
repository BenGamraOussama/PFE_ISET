package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.CommandeMatieres;
import com.PFE.commerce.beans.CommandeMatieresDto;

import java.util.List;

public interface CommandeMatieresService {
    CommandeMatieresDto CommandeMatieresToCommandeMatieresDto(final CommandeMatieres commandeMatieres, final CommandeMatieresDto commandeMatieresDto);
    List<CommandeMatieresDto> findAllByCommandeId(Long id);
    List<CommandeMatieres> getCommandeMatieres();
}
