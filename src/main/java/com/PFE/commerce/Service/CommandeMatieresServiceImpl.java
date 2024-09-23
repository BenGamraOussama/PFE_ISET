package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.CommandeMatieres;
import com.PFE.commerce.Repository.CommandeMatieresRepository;
import com.PFE.commerce.beans.CommandeMatieresDto;
import com.PFE.commerce.beans.ProduitDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class CommandeMatieresServiceImpl implements CommandeMatieresService{
    @Autowired
    private CommandeMatieresRepository commandeMatieresRepository;
    @Autowired
    private ProduitService produitService;
    @Override
    public CommandeMatieresDto CommandeMatieresToCommandeMatieresDto(CommandeMatieres commandeMatieres, CommandeMatieresDto commandeMatieresDto) {
        if(commandeMatieres==null)
            return null;
        else
        {
            commandeMatieresDto.setId(commandeMatieres.getId());
            commandeMatieresDto.setProduitDto(produitService.produitToProduitDto(commandeMatieres.getProduit(), new ProduitDto()));
            commandeMatieresDto.setQuantite(commandeMatieres.getQuantite());
            return commandeMatieresDto;
        }
    }

    @Override
    public List<CommandeMatieresDto> findAllByCommandeId(Long id) {
        return commandeMatieresRepository.findByCommandeId(id).stream().map(cm->CommandeMatieresToCommandeMatieresDto(cm,new CommandeMatieresDto())).collect(Collectors.toList());

    }

    @Override
    public List<CommandeMatieres> getCommandeMatieres() {
        return commandeMatieresRepository.findAll();
    }


}
