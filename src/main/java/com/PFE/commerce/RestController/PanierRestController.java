package com.PFE.commerce.RestController;

import com.PFE.commerce.Entity.Panier;
import com.PFE.commerce.Service.PanierService;
import com.PFE.commerce.Service.PanierServiceImpl;
import com.PFE.commerce.beans.PanierDto;
import com.PFE.commerce.beans.PanierRq;
import com.PFE.commerce.beans.PatchPanier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/panier")
public class PanierRestController {
    @Autowired
    PanierService panierService;

    @PostMapping("/add")
    public ResponseEntity<Panier> ajoutPanier(@RequestBody PanierRq panierRq) {
        System.out.println("panierRq"+panierRq);
        if(panierRq.getIdClient()!= null && panierRq.getIdProduit()!= null )
        {
            Panier newpanier = panierService.ajouterPanier(panierRq);
            return new ResponseEntity<>(newpanier, HttpStatus.CREATED);
        }else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    /*afficher panier par client*/
    @GetMapping("/get-all-by-id-client/{id}")
    public List<PanierDto> getAllByClientId(@PathVariable Long id)
    {
        return panierService.listePanierByClientId(id);
    }
    /*update quantite */
    @PatchMapping("/update-qtt")
    public ResponseEntity<?>patchPanierById(@RequestBody PatchPanier patchPanier)
    {
        if(patchPanier.getIdPanier()!=null)
        {
            return panierService.patchPanierById(patchPanier);
        }else
            return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    /* supprimer panier */

    @DeleteMapping("/delete-all-by-id-client/{id}")
    public void suppPanier(@PathVariable("id") Long id){
        panierService.supprimerById(id);

    }

}
