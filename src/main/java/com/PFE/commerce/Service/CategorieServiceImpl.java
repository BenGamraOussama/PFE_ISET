package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Categorie;
import com.PFE.commerce.Repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieServiceImpl implements CategorieService{
    @Autowired
    CategorieRepository categorieRepository;
    @Override
    public Categorie ajouterCategorie(Categorie categorie) {
        return  categorieRepository.save(categorie);
    }

    @Override
    public Categorie modifierCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    @Override
    public List<Categorie> getCategorie() {
        return categorieRepository.findAll();
    }

    @Override
    public void supprimerCategorie(Long id) {
        categorieRepository.deleteById(id);
    }

    @Override
    public Optional<Categorie> getCategorieById(Long id) {
        return categorieRepository.findById(id);
    }
}
