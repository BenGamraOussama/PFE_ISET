package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Categorie;
import com.PFE.commerce.Entity.Fournisseur;
import com.PFE.commerce.Entity.Produit;
import com.PFE.commerce.Repository.CategorieRepository;
import com.PFE.commerce.Repository.FournisseurRepository;
import com.PFE.commerce.Repository.ProduitRepository;
import com.PFE.commerce.beans.ProduitDto;
import com.PFE.commerce.beans.SaveProduit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitServiceImpl implements ProduitService{

    @Autowired
    CategorieRepository categorieRepository;
    @Autowired
    FournisseurRepository fournisseurRepository;
    @Autowired
    ProduitRepository produitRepository;
    @Override
    public Produit ajouterProduit(SaveProduit model) {
        Produit produit=SaveProduit.toEntity(model);
        System.out.println("idcategorie"+model.getIdCategorie());
        Categorie categorie= categorieRepository.findById(model.getIdCategorie()).get();
        produit.setCategorie(categorie);
        System.out.println("idfournisseur"+model.getIdFournisseur());
        Fournisseur fournisseur=fournisseurRepository.findById(model.getIdFournisseur()).get();
        produit.setFournisseur(fournisseur);
        return produitRepository.save(produit);
    }

    @Override
    public Produit modifierProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public List<Produit> getProduit() {
        return produitRepository.findAll();
    }

    @Override
    public void supprimerProduit(Long id) {
        produitRepository.deleteById(id);
    }

    @Override
    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    @Override
    public Optional<Produit> findById(Long idProduit) {
        return produitRepository.findById(idProduit);
    }

    @Override
    public Produit modifierProduit(Long id, SaveProduit model) {
        Optional<Produit> existingProduitOptional = produitRepository.findById(id);
        if (existingProduitOptional.isPresent()) {
            Produit existingProduit = existingProduitOptional.get();

            existingProduit.setNom(model.getNom());
            existingProduit.setDescription(model.getDescription());
            existingProduit.setPrix(model.getPrix());
            existingProduit.setQuantite(model.getQuantite());
            existingProduit.setImage(model.getImage());

            Categorie categorie = categorieRepository.findById(model.getIdCategorie()).orElse(null);
            if (categorie != null) {
                existingProduit.setCategorie(categorie);
            }
            Fournisseur fournisseur = fournisseurRepository.findById(model.getIdFournisseur()).orElse(null);
            if (fournisseur != null) {
                existingProduit.setFournisseur(fournisseur);
            }
            return produitRepository.save(existingProduit);
        } else {
            return null;
        }
    }

    @Override
    public ProduitDto produitToProduitDto(Produit produit, ProduitDto produitDto) {
        if(produit!=null)
        {
            produitDto.setId(produit.getId());
            produitDto.setNom(produit.getNom());
            produitDto.setDescription(produit.getDescription());
            produitDto.setPrix(produit.getPrix());
            produitDto.setQuantite(produit.getQuantite());
            produitDto.setImage(produit.getImage());
            return  produitDto;
        }else
            return null;
    }


}

