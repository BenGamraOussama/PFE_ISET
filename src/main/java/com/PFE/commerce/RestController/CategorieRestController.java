package com.PFE.commerce.RestController;

import com.PFE.commerce.Entity.Admin;
import com.PFE.commerce.Entity.Categorie;
import com.PFE.commerce.Repository.CategorieRepository;
import com.PFE.commerce.Service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/categorie")
public class CategorieRestController {
    @Autowired
    CategorieRepository categorieRepository;
    @Autowired
    CategorieService categorieService;
    @RequestMapping(method = RequestMethod.POST )
    ResponseEntity<?> AjouterCategorie (@RequestBody Categorie categorie){

        HashMap<String, Object> response = new HashMap<>();
        if(categorieRepository.existsByNom(categorie.getNom())){
            response.put("message", "Catégorie exist deja !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }else{
            Categorie savedUser = categorieRepository.save(categorie);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }


    @RequestMapping(method = RequestMethod.GET)
    public List<Categorie> AfficherCategorie(){
        return categorieService.getCategorie();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerCategorie(@PathVariable("id") Long id){
        categorieService.supprimerCategorie(id);
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Categorie> getCategorieById(@PathVariable("id") Long id){

        Optional<Categorie> categorie = categorieService.getCategorieById(id);
        return categorie;
    }



}
