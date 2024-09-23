package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Commande;
import com.PFE.commerce.Entity.Facture;
import com.PFE.commerce.Repository.FactureRepository;
import com.PFE.commerce.Repository.FournisseurRepository;
import com.PFE.commerce.beans.CommandeDto;
import com.PFE.commerce.beans.CommandeMatieresDto;
import com.PFE.commerce.beans.FactureDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FactureServiceImpl implements FactureService {

    @Autowired
    CommandeMatieresService commandeMatieresService;
    @Autowired
    CommandeService commandeService;
    @Autowired
    FactureRepository factureRepository;
    @Transactional
    @Override
    public FactureDto confirmer(Long id) {
        Optional<Facture> fa = factureRepository.findById(id);
        if(factureRepository.findById(id).isPresent())
        {
            fa.get().getCommande().setLivred(true);
            return factureToFactureDto(fa.get(), new FactureDto());
        }else
            return null;
    }


    @Override
    public FactureDto save(Long idCommande) {
        if(idCommande!=null)
        {
            Optional<Facture>factureOptional= factureRepository.findByCommandeId(idCommande);
            if(factureOptional.isPresent())
            {
                List<CommandeMatieresDto> c =commandeMatieresService.findAllByCommandeId(idCommande);

                FactureDto factureDto=factureToFactureDto(factureOptional.get(), new FactureDto());
                factureDto.setCommandeMatieresDtoList(c);
                return factureDto ;
            }else
            {
                Commande coma = commandeService.commandeByIdE(idCommande);

                Facture fa = factureRepository.save(new Facture(coma));
                FactureDto factureDto= factureToFactureDto(fa, new FactureDto());
                List<CommandeMatieresDto> c =commandeMatieresService.findAllByCommandeId(idCommande);
                factureDto.setCommandeMatieresDtoList(c);
                return factureDto;
            }



        }else
            return null;
    }

    @Override
    public FactureDto factureToFactureDto(Facture facture, FactureDto factureDto) {
        if(facture!=null){
            factureDto.setId(facture.getId());

            factureDto.setCommandeDto(facture.getCommande()==null?null:commandeService.commandeToCommandeDto(facture.getCommande(),new CommandeDto()));
            return factureDto;}
        else
            return null;    }


}
