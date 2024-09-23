package com.PFE.commerce.RestController;

import com.PFE.commerce.Entity.Commande;
import com.PFE.commerce.Service.CommandeService;
import com.PFE.commerce.beans.AjouterCommandeRq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/commande")
public class CommandeRestController {

    @Autowired
    CommandeService commandeService;
    @PostMapping("/ajouter-commande")
    public ResponseEntity<?> ajouterCommande(@RequestBody AjouterCommandeRq ajouterCommandeRq)
    {
        return commandeService.ajouterCommande(ajouterCommandeRq);
    }
    @GetMapping ("/get-commande-id/{id}")
    public ResponseEntity<?> ajouterCommande(@PathVariable Long id)
    {    if(id!=null)
        return new ResponseEntity<>(commandeService.commandeById(id), HttpStatus.OK);
    else
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/not-livred")
    public List<Commande> afficherCommandeNotLivred(){
        return commandeService.listeCommande().stream().filter((com)->!com.isLivred()).collect(Collectors.toList());}
}
