package com.PFE.commerce.RestController;

import com.PFE.commerce.Entity.*;
import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.Repository.ClientRepository;
import com.PFE.commerce.Service.ClientService;
import com.PFE.commerce.Service.EmailService;
import com.PFE.commerce.Service.ResetMdpService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/client")
public class ClientRestController {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    ClientService clientService;

    @Autowired
    EmailService emailService;

    @Autowired
    ResetMdpService resetMdpService;
    @RequestMapping(method = RequestMethod.POST )

    ResponseEntity<?> AjouteClient(@RequestBody Client client){
        return clientService.ajouterClient(client);
    }




    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationTokenC) {
        return clientService.ConfirmeEmail(confirmationTokenC);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Client> AfficherClient(){
        return clientService.getClient();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerClient(@PathVariable("id") Long id){
        clientService.supprimerClient(id);
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Client> getClientById(@PathVariable("id") Long id){

        Optional<Client> client = clientService.getClientById(id);
        return client;
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Client ModifierClient(@PathVariable("id")Long id, @RequestBody Client client){
        client.setMdp(this.bCryptPasswordEncoder.encode(client.getMdp()));
        Client savedUser = clientRepository.save(client);

        Client newClient = clientService.modifierClient(client);
        return newClient;
    }

    @RequestMapping(value = "/updateDetails/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Client> modifierClient1(@RequestBody Client client, @PathVariable("id") Long id) {
        return clientRepository.findById(id).map(existingClient -> {
            existingClient.setNom(client.getNom());
            existingClient.setPrenom(client.getPrenom());
            existingClient.setTelephone(client.getTelephone());
            existingClient.setAdresse(client.getAdresse());
            existingClient.setCin(client.getCin());
            clientRepository.save(existingClient);
            return ResponseEntity.ok(existingClient);
        }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/updateMdp/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Client> modifierPassword(@PathVariable("id") Long id, @RequestBody Client client) {
        return clientRepository.findById(id).map(existingClient -> {

            existingClient.setMdp(bCryptPasswordEncoder.encode(client.getMdp()));

            clientRepository.save(existingClient);
            return ResponseEntity.ok(existingClient);
        }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/forgotmdp", method = RequestMethod.POST)
    public ResponseEntity<?> forgotMdp(@RequestBody Client client) {
        System.out.println("Demande de réinitialisation de mot de passe reçue pour l'e-mail: " + client);
        Client userFromDB = clientRepository.findClientByEmail(client.getEmail());
        if (userFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        } else {
            String nvmdp = resetMdpService.nvMdp();
            userFromDB.setMdp(bCryptPasswordEncoder.encode(nvmdp));
            //userFromDB.setResetToken(resetToken);
            //userFromDB.setResetTokenExpiry(Instant.now().plus(Duration.ofHours(24))); // Token expires in 24 hours
            clientRepository.save(userFromDB);

            //String resetLink = "https://localhost:8081/api/client/resetmdp?token=" + resetToken;
            emailService.SendSimpleMessage(client.getEmail(), "Votre nouveau mot de passe", "Bonjour,\n" +
                    "Votre mot de passe sur ShopFlow a été re-initlaisé, le nouveau mot de passe est : " + nvmdp);
            return ResponseEntity.status(HttpStatus.OK).body("Instructions de réinitialisation du mot de passe envoyées à votre adresse e-mail");
        }
    }
    @PostMapping("/checkmdp")
    public ResponseEntity<Map<String, Object>> checkmdp(@RequestBody Client client) {
        System.out.println("in login-client"+client);
        HashMap<String, Object> response = new HashMap<>();

        Client userFromDB = clientRepository.findClientByEmail(client.getEmail());
        System.out.println("userFromDB+client"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Client not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(client.getMdp(), userFromDB.getMdp());
            System.out.println("compare"+compare);
            if (!compare) {
                response.put("message", "Password incorrect!");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }else
            {
                response.put("message", "Password correct!");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginClient(@RequestBody Client client) {
        System.out.println("in login-client"+client);
        HashMap<String, Object> response = new HashMap<>();

        Client userFromDB = clientRepository.findClientByEmail(client.getEmail());
        System.out.println("userFromDB+client"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Client not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else if (!userFromDB.isEtat()) {
            response.put("message", "Votre compte est désactivé");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);}
        else {
            boolean compare = this.bCryptPasswordEncoder.matches(client.getMdp(), userFromDB.getMdp());
            System.out.println("compare"+compare);
            if (!compare) {
                response.put("message", "Password incorrect!");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }else
            {
                String token = Jwts.builder()
                        .claim("data", userFromDB)
                        .signWith(SignatureAlgorithm.HS256, "SECRET")
                        .compact();
                response.put("token", token);
                System.out.println("hhh");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }
    }
    /*@PutMapping("/updatePassword/{id}")
    public ResponseEntity<Client> modifierPassword(@PathVariable("id") Long id, @RequestBody Client client) {
        return clientRepository.findById(id).map(existingClient -> {
            // Ideally, include security checks here

            // Update the password
            existingClient.setMdp(bCryptPasswordEncoder.encode(client.getMdp()));

            clientRepository.save(existingClient);
            return ResponseEntity.ok(existingClient);
        }).orElse(ResponseEntity.notFound().build());
    }*/

    /*@PutMapping("/updateDetails/{id}")
    public ResponseEntity<Client> modifierClient(@PathVariable("id") Long id, @RequestBody Client client) {
        return clientRepository.findById(id).map(existingClient -> {
            existingClient.setNom(client.getNom());
            existingClient.setPrenom(client.getPrenom());
            existingClient.setTelephone(client.getTelephone());
            existingClient.setAdresse(client.getAdresse());
            // Optionally update other non-sensitive fields

            clientRepository.save(existingClient);
            return ResponseEntity.ok(existingClient);
        }).orElse(ResponseEntity.notFound().build());
    }*/
}
