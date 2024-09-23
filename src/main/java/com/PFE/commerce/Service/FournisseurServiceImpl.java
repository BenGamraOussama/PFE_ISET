package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Fournisseur;
import com.PFE.commerce.Repository.FournisseurRepository;
import com.PFE.commerce.Repository.LivreurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FournisseurServiceImpl implements FournisseurService{

    @Autowired
    FournisseurRepository fournisseurRepository;
    @Override
    public Fournisseur ajouterFournisseur(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    @Override
    public Fournisseur modifierFournisseur(Fournisseur fournisseur, Long id) {
        return fournisseurRepository.save(fournisseur);
    }

    @Override
    public Fournisseur modifierFournisseur1(Fournisseur fournisseur, Long id) {
        return fournisseurRepository.save(fournisseur);
    }

    @Override
    public List<Fournisseur> getFournisseur() {
        return fournisseurRepository.findAll();
    }

    @Override
    public void supprimerFournisseur(Long id) {
        fournisseurRepository.deleteById(id);
    }

    @Override
    public Optional<Fournisseur> getFournisseurById(Long id) {
        return fournisseurRepository.findById(id);
    }
}
