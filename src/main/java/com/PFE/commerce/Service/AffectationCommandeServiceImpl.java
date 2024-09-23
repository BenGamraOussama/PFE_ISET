package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.AffectationCommande;
import com.PFE.commerce.Entity.Commande;
import com.PFE.commerce.Entity.Livreur;
import com.PFE.commerce.Repository.AffectationCommandeRepository;
import com.PFE.commerce.Repository.CommandeRepository;
import com.PFE.commerce.Repository.LivreurRepository;
import com.PFE.commerce.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AffectationCommandeServiceImpl implements AffectationCommandeService {

    @Autowired
    CommandeService commandeService;
    @Autowired
    LivreurService livreurService;
    @Autowired
    LivreurRepository livreurRepository;
    @Autowired
    CommandeRepository commandeRepository;
    @Autowired
    AffectationCommandeRepository affectationCommandeRepository;
    @Override
    public ResponseEntity<?> addAffect(AffictationCommandeLRq affictationCommandeLRq) {
        boolean testExist=affectationCommandeRepository.existsByCommandeIdAndLivreurId(affictationCommandeLRq.getCommande(), affictationCommandeLRq.getLivreur());
        System.out.println("testExist"+testExist);
        if(!testExist){
            Optional<Livreur> liv = livreurRepository.findById(affictationCommandeLRq.getLivreur());
            Optional<Commande> comd = commandeRepository.findById(affictationCommandeLRq.getCommande());
            if(liv.isPresent() && comd.isPresent())
            {
                AffectationCommande aff = affectationCommandeRepository.save(new AffectationCommande(comd.get(), liv.get()));
                return new ResponseEntity<AffectationCommande>(aff, HttpStatus.CREATED);
            }else
                return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }else
            return new ResponseEntity<Void>(HttpStatus.FOUND);
    }

    @Override
    public List<AffectationCommandeDto> findAllByLivreurId(Long id) {
        return affectationCommandeRepository.findByLivreurId(id).stream().map(affectationCommande -> affectationCommandeToAffectationCommandeDto((AffectationCommande) affectationCommande,new AffectationCommandeDto())).collect(Collectors.toList());
    }

    @Override
    public AffectationCommandeDto affectationCommandeToAffectationCommandeDto(AffectationCommande affectationCommande, AffectationCommandeDto affectationCommandeDto) {
        if(affectationCommande==null)
            return null;
        else
        {
            affectationCommandeDto.setCommandeDto(affectationCommande.getCommande()==null?null:commandeService.commandeToCommandeDto(affectationCommande.getCommande(),new CommandeDto()));
            affectationCommandeDto.setLivreurDto(affectationCommande.getLivreur()==null?null:livreurService.livreurToLivreurDto(affectationCommande.getLivreur(),new LivreurDto()));
            affectationCommandeDto.setId(affectationCommande.getId());
            return affectationCommandeDto;
        }    }
}
