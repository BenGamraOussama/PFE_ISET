package com.PFE.commerce.RestController;

import com.PFE.commerce.Entity.Contact;
import com.PFE.commerce.Entity.Livreur;
import com.PFE.commerce.Entity.Produit;
import com.PFE.commerce.Repository.ProduitRepository;
import com.PFE.commerce.Service.ProduitService;
import com.PFE.commerce.beans.SaveProduit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/produit")
public class ProduitRestController {
    @Autowired
    ProduitRepository produitRepository;

    @Autowired
    ProduitService produitService;
    @RequestMapping(method = RequestMethod.POST )
    public Produit AjouterProduit (@RequestBody SaveProduit model){

        return produitService.ajouterProduit(model);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Produit> AfficherProduit(){
        return produitService.getProduit();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerProduit(@PathVariable("id") Long id){
        produitService.supprimerProduit(id);
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Produit> getProduitById(@PathVariable("id") Long id){

        Optional<Produit> produit = produitService.getProduitById(id);
        return produit;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Produit modifierProduit(@PathVariable("id") Long id, @RequestBody SaveProduit model) {
        return produitService.modifierProduit(id, model);
    }
}
