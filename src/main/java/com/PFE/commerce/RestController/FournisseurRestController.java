package com.PFE.commerce.RestController;


import com.PFE.commerce.Entity.Fournisseur;
import com.PFE.commerce.Entity.Fournisseur;
import com.PFE.commerce.Repository.FournisseurRepository;
import com.PFE.commerce.Service.EmailService;
import com.PFE.commerce.Service.FournisseurService;
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
@RequestMapping(value = "/fournisseur")
public class FournisseurRestController {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    FournisseurRepository fournisseurRepository;

    @Autowired
    FournisseurService fournisseurService;

    @Autowired
    EmailService emailService;

    @Autowired
    ResetMdpService resetMdpService;
    @RequestMapping(method = RequestMethod.POST )

    ResponseEntity<?> AjouterFournisseur (@RequestBody Fournisseur fournisseur){

        HashMap<String, Object> response = new HashMap<>();
        if(fournisseurRepository.existsByEmail(fournisseur.getEmail())){
            response.put("message", "email exist deja !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }else{
            fournisseur.setMdp(this.bCryptPasswordEncoder.encode(fournisseur.getMdp()));
            Fournisseur savedUser = fournisseurRepository.save(fournisseur);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Fournisseur> AfficherFournisseur(){
        return fournisseurService.getFournisseur();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerFournisseur(@PathVariable("id") Long id){
        fournisseurService.supprimerFournisseur(id);
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Fournisseur> getFournisseurById(@PathVariable("id") Long id){

        Optional<Fournisseur> fournisseur = fournisseurService.getFournisseurById(id);
        return fournisseur;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Fournisseur modifierFournisseur(@RequestBody Fournisseur fournisseur, @PathVariable("id") Long id) {
        Fournisseur newFournisseur = null;
        if (fournisseurRepository.findById(id).isPresent()) { //ken user deja mawjoud
            Fournisseur fournisseur1 = fournisseurRepository.findById(id).get();
            var fouid = fournisseur.getId();
            var nom = fournisseur.getNom();
            var prenom = fournisseur.getPrenom();
            var tel = fournisseur.getTelephone();
            var email = fournisseur.getEmail();
            var mdp = fournisseur1.getMdp();
            fournisseur1.setId(fouid);
            fournisseur1.setNom(nom);
            fournisseur1.setPrenom(prenom);
            fournisseur1.setTelephone(tel);
            fournisseur1.setEmail(email);
            fournisseur1.setMdp(mdp);

//mta3 yjih mail fih l etat
            fournisseur.setMdp(this.bCryptPasswordEncoder.encode(fournisseur1.getMdp()));
            if (fournisseur.isEtat() != fournisseur1.isEtat()) {
                //ternary expression
                String etat = fournisseur1.isEtat() ? "Bloqué" : "Accepté";
                emailService.SendSimpleMessage(fournisseur1.getEmail(), "L'etat de votre compte", "votre compte a été " + etat);
            }
            fournisseur1.setEtat(fournisseur.isEtat());
            newFournisseur = fournisseurRepository.save(fournisseur1);
        }
        return newFournisseur;
    }
    @RequestMapping(value = "/updateDetails/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Fournisseur> modifierFournisseur1(@RequestBody Fournisseur fournisseur, @PathVariable("id") Long id) {
        return fournisseurRepository.findById(id).map(existingFournisseur -> {
            existingFournisseur.setNom(fournisseur.getNom());
            existingFournisseur.setPrenom(fournisseur.getPrenom());
            existingFournisseur.setTelephone(fournisseur.getTelephone());
            fournisseurRepository.save(existingFournisseur);
            return ResponseEntity.ok(existingFournisseur);
        }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/updateMdp/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Fournisseur> modifierPassword(@PathVariable("id") Long id, @RequestBody Fournisseur fournisseur) {
        return fournisseurRepository.findById(id).map(existingFournisseur -> {

            existingFournisseur.setMdp(bCryptPasswordEncoder.encode(fournisseur.getMdp()));

            fournisseurRepository.save(existingFournisseur);
            return ResponseEntity.ok(existingFournisseur);
        }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/forgotmdp", method = RequestMethod.POST)
    public ResponseEntity<?> forgotMdp(@RequestBody Fournisseur fournisseur) {
        System.out.println("Demande de réinitialisation de mot de passe reçue pour l'e-mail: " + fournisseur);
        Fournisseur userFromDB = fournisseurRepository.findFournisseurByEmail(fournisseur.getEmail());
        if (userFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        } else {
            String nvmdp = resetMdpService.nvMdp();
            userFromDB.setMdp(bCryptPasswordEncoder.encode(nvmdp));
            //userFromDB.setResetToken(resetToken);
            //userFromDB.setResetTokenExpiry(Instant.now().plus(Duration.ofHours(24))); // Token expires in 24 hours
            fournisseurRepository.save(userFromDB);

            //String resetLink = "https://localhost:8081/api/fournisseur/resetmdp?token=" + resetToken;
            emailService.SendSimpleMessage(fournisseur.getEmail(), "Votre nouveau mot de passe", "Bonjour,\n" +
                    "Votre mot de passe sur ShopFlow a été re-initlaisé, le nouveau mot de passe est : " + nvmdp);
            return ResponseEntity.status(HttpStatus.OK).body("Instructions de réinitialisation du mot de passe envoyées à votre adresse e-mail");
        }
    }


    @PostMapping("/checkmdp")
    public ResponseEntity<Map<String, Object>> checkmdp(@RequestBody Fournisseur fournisseur) {
        System.out.println("in login-fournisseur"+fournisseur);
        HashMap<String, Object> response = new HashMap<>();

        Fournisseur userFromDB = fournisseurRepository.findFournisseurByEmail(fournisseur.getEmail());
        System.out.println("userFromDB+fournisseur"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Fournisseur not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(fournisseur.getMdp(), userFromDB.getMdp());
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
    public ResponseEntity<Map<String, Object>> loginfournisseur(@RequestBody Fournisseur fournisseur) {
        System.out.println("in login-Etudiant"+fournisseur);
        HashMap<String, Object> response = new HashMap<>();

        Fournisseur userFromDB = fournisseurRepository.findFournisseurByEmail(fournisseur.getEmail());
        System.out.println("userFromDB+fournisseur"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "fournisseur not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else if (!userFromDB.isEtat()) {
            response.put("message", "Votre compte est désactivé");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);}
        else {
            boolean compare = this.bCryptPasswordEncoder.matches(fournisseur.getMdp(),userFromDB.getMdp());
            System.out.println("compare"+compare);
            if (!compare) {
                response.put("message", "fournisseur not found !");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }else
            {
                String token = Jwts.builder()
                        .claim("data", userFromDB)
                        .claim("role", "fournisseur")
                        .signWith(SignatureAlgorithm.HS256, "SECRET")
                        .compact();
                response.put("token", token);
                System.out.println("hhh");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }
    }

}
