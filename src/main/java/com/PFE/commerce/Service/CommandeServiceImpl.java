package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Commande;
import com.PFE.commerce.Entity.CommandeMatieres;
import com.PFE.commerce.Entity.Panier;
import com.PFE.commerce.Entity.Produit;
import com.PFE.commerce.Repository.ClientRepository;
import com.PFE.commerce.Repository.CommandeMatieresRepository;
import com.PFE.commerce.Repository.CommandeRepository;
import com.PFE.commerce.Repository.PanierRepository;
import com.PFE.commerce.beans.AjouterCommandeRq;
import com.PFE.commerce.beans.ClientDto;
import com.PFE.commerce.beans.CommandeDto;
import com.PFE.commerce.beans.PanierDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommandeServiceImpl implements CommandeService {

    @Autowired
    ClientRepository clientRepository;
    @Autowired
    PanierService panierService;
    @Autowired
    CommandeRepository commandeRepository;
    @Autowired
    PanierRepository panierRepository;
    @Autowired
    ClientService clientService;
    @Autowired
    CommandeMatieresRepository commandeMatieresRepository;

    @Override
    public ResponseEntity<?> ajouterCommande(AjouterCommandeRq ajouterCommandeRq) {
        if (ajouterCommandeRq.getIdClient() != null) {

            if (clientRepository.existsById(ajouterCommandeRq.getIdClient())) {
                List<PanierDto> panierList=panierService.listePanierByClientId(ajouterCommandeRq.getIdClient());

                if (!panierList.isEmpty()) {
                    Commande commande = commandeRepository.save(new Commande(false,clientRepository.getById(ajouterCommandeRq.getIdClient())));
                    List<CommandeMatieres> commandeMatieres = new ArrayList<>();
                    for (PanierDto idPanier : panierList) {

                        Optional<Panier> panier = panierRepository.findById(idPanier.getId());

                        if (panier.isPresent() && panier.get().getProduit() != null) {
                            Produit produit = panier.get().getProduit();
                            if (produit.getQuantite() >= panier.get().getQuantite()) {
                                commandeMatieres.add(new CommandeMatieres(produit, panier.get().getQuantite(), commande));
                                produit.setQuantite(produit.getQuantite() - panier.get().getQuantite()); // Mettre à jour la quantité disponible
                            } else {
                                // Gérer la situation où la quantité commandée est supérieure à la quantité disponible
                                return new ResponseEntity<>("La quantité demandée pour le produit " + produit.getNom() + " est supérieure à la quantité disponible", HttpStatus.BAD_REQUEST);
                            }
                        }
                    }
                    commandeMatieresRepository.saveAll(commandeMatieres);
                    //vider panier
                    for ( PanierDto idPanier : panierList) {
                        if (panierRepository.findById(idPanier.getId()).isPresent()) {
                            panierRepository.deleteById(idPanier.getId());
                        }
                    }
                    return new ResponseEntity<Void>(HttpStatus.CREATED);

                } else
                    return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);

            } else
                return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        } else
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);


    }

    @Override
    public List<Commande> listeCommande() {
       return commandeRepository.findAll();
    }

    @Override
    public CommandeDto commandeToCommandeDto(Commande commande, CommandeDto commandeDto) {
          if (commande != null) {
            commandeDto.setId(commande.getId());
            commandeDto.setClient(commande.getClient() == null ? null : clientService.clientToClientDto(commande.getClient(), new ClientDto()));
            commandeDto.setLivred(commande.isLivred());
            return commandeDto;
        } else
            return null;
    }

    @Override
    public Commande commandeByIdE(Long id) {
        if(commandeRepository.findById(id).isPresent())
            return commandeRepository.findById(id).get();
        else
            return null;
    }

    @Override
    public CommandeDto commandeById(Long id) {
        if(commandeRepository.findById(id).isPresent())
            return commandeToCommandeDto(commandeRepository.findById(id).get(),new CommandeDto());
        else
            return null;
    }


}
