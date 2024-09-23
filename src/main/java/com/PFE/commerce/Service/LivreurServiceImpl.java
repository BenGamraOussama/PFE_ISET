package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Livreur;
import com.PFE.commerce.Repository.LivreurRepository;
import com.PFE.commerce.beans.LivreurDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivreurServiceImpl implements LivreurService{

    @Autowired
    LivreurRepository livreurRepository;
    @Override
    public Livreur ajouterLivreur(Livreur livreur) {
        return livreurRepository.save(livreur);
    }

    @Override
    public Livreur modifierLivreur(Livreur livreur) {
        return livreurRepository.save(livreur);
    }

    @Override
    public List<Livreur> getLivreur() {
        return livreurRepository.findAll();
    }

    @Override
    public void supprimerLivreur(Long id) {
        livreurRepository.deleteById(id);
    }

    @Override
    public Optional<Livreur> getLivreurById(Long id) {
        return livreurRepository.findById(id);
    }

    @Override
    public LivreurDto livreurToLivreurDto(Livreur livreur, LivreurDto livreurDto) {
        if(livreur==null)
        {
            return null;
        }else
        {
            livreurDto.setId(livreur.getId());
            livreurDto.setNom(livreur.getNom());
            livreurDto.setPrenom(livreur.getPrenom());
            livreurDto.setTelephone(livreur.getTelephone());
            livreurDto.setEmail(livreur.getEmail());
            livreurDto.setMdp(livreur.getMdp());
            livreurDto.setAdresse(livreur.getAdresse());
            livreurDto.setLivreur(livreur.isLivreur());
            return livreurDto;
        }
    }
}
