package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.Entity.Panier;
import com.PFE.commerce.Entity.Produit;
import com.PFE.commerce.Repository.PanierRepository;
import com.PFE.commerce.beans.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PanierServiceImpl implements PanierService{

    @Autowired
    ClientService clientService;

    @Autowired
    ProduitService produitService;

    @Autowired
    PanierRepository panierRepository;

    @Transactional
    @Override
    public Panier ajouterPanier(PanierRq panierRq){
        Optional<Client> clientOptional =clientService.findById(panierRq.getIdClient());
        Optional<Produit> produitOptional=produitService.findById(panierRq.getIdProduit());
        Optional<Panier>panierOptional= panierRepository.findByProduitIdAndClientId(panierRq.getIdProduit(),panierRq.getIdClient());
        if(!panierOptional.isPresent())
            return panierRepository.save(new Panier(clientOptional.get(),produitOptional.get(),1));
        else
        {
            panierOptional.get().setQuantite(panierOptional.get().getQuantite()+1);
            return  panierOptional.get();
        }
    }

    @Override
    public List<PanierDto> listePanierByClientId(Long id){
        List<Panier> panierList=panierRepository.findByClientId(id);

        return panierList.stream().map(pannier->panierToPanierDto(pannier,new PanierDto())).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public ResponseEntity<?> patchPanierById(PatchPanier patchPanier) {
        Optional<Panier> panier = panierRepository.findById(patchPanier.getIdPanier());

        if(panier.isPresent())
        {
            Panier currentPanier = panier.get();
            Produit produit = currentPanier.getProduit();

            if (patchPanier.getOperation().equals(Operation.PLUS)) {
                // Vérifier si la quantité du produit disponible est suffisante
                if (produit.getQuantite() > currentPanier.getQuantite()) {
                    currentPanier.setQuantite(currentPanier.getQuantite() + 1);
                    panierRepository.save(currentPanier);
                    return new ResponseEntity<>(HttpStatus.OK);
                }else {
                    return new ResponseEntity<>("Quantité de produit insuffisante", HttpStatus.BAD_REQUEST);
                }
            }else {
                if(panier.get().getQuantite()==1) {
                    supprimerPanier(panier.get());
                    return new ResponseEntity<>(HttpStatus.OK);
                }else {
                    panier.get().setQuantite(panier.get().getQuantite()-1);
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            }
        }else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);    }

    @Override
    public void supprimerById(Long id) {
        panierRepository.deleteById(id);
    }

    @Override
    public void supprimerPanier(Panier panier) {
        panierRepository.delete(panier);
    }

    @Override
    public PanierDto panierToPanierDto(Panier panier, PanierDto panierDto) {
        { if(panier!=null) { panierDto.setId(panier.getId());
            panierDto.setClientId(panier.getClient()==null?null:clientService.clientToClientDto(panier.getClient(),new ClientDto()));
            panierDto.setProduitId(panier.getProduit()==null?null:produitService.produitToProduitDto(panier.getProduit(), new ProduitDto()));
            panierDto.setQuantite(panier.getQuantite());
            return panierDto;
        }else
            return null; }
    }
}
