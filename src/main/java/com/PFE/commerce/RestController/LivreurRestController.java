package com.PFE.commerce.RestController;



import com.PFE.commerce.Entity.Livreur;
import com.PFE.commerce.Entity.Livreur;
import com.PFE.commerce.Entity.Livreur;
import com.PFE.commerce.Entity.Livreur;
import com.PFE.commerce.Repository.LivreurRepository;
import com.PFE.commerce.Service.AffectationCommandeService;
import com.PFE.commerce.Service.EmailService;
import com.PFE.commerce.Service.LivreurService;
import com.PFE.commerce.Service.ResetMdpService;
import com.PFE.commerce.beans.AffectationCommandeDto;
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
@RequestMapping(value = "/livreur")
public class LivreurRestController {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    LivreurRepository livreurRepository;

    @Autowired
    LivreurService livreurService;
    @Autowired
    AffectationCommandeService affectationCommandeService;

    @Autowired
    EmailService emailService;

    @Autowired
    ResetMdpService resetMdpService;
    @RequestMapping(method = RequestMethod.POST )

    ResponseEntity<?> AjouterLivreur (@RequestBody Livreur livreur){

        HashMap<String, Object> response = new HashMap<>();
        if(livreurRepository.existsByEmail(livreur.getEmail())){
            response.put("message", "email exist deja !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }else{
            livreur.setMdp(this.bCryptPasswordEncoder.encode(livreur.getMdp()));
            Livreur savedUser = livreurRepository.save(livreur);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Livreur> AfficherLivreur(){
        return livreurService.getLivreur();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerLivreur(@PathVariable("id") Long id){
        livreurService.supprimerLivreur(id);
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Livreur> getLivreurById(@PathVariable("id") Long id){

        Optional<Livreur> livreur = livreurService.getLivreurById(id);
        return livreur;
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Livreur ModifierLivreur(@PathVariable("id")Long id, @RequestBody Livreur livreur){
        livreur.setMdp(this.bCryptPasswordEncoder.encode(livreur.getMdp()));
        Livreur savedUser = livreurRepository.save(livreur);

        Livreur newLivreur = livreurService.modifierLivreur(livreur);
        return newLivreur;
    }

    @RequestMapping(value = "/updateDetails/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Livreur> modifierLivreur1(@RequestBody Livreur livreur, @PathVariable("id") Long id) {
        return livreurRepository.findById(id).map(existingLivreur -> {
            existingLivreur.setNom(livreur.getNom());
            existingLivreur.setPrenom(livreur.getPrenom());
            existingLivreur.setTelephone(livreur.getTelephone());
            existingLivreur.setAdresse(livreur.getAdresse());
            livreurRepository.save(existingLivreur);
            return ResponseEntity.ok(existingLivreur);
        }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/updateMdp/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Livreur> modifierPassword(@PathVariable("id") Long id, @RequestBody Livreur livreur) {
        return livreurRepository.findById(id).map(existingLivreur -> {

            existingLivreur.setMdp(bCryptPasswordEncoder.encode(livreur.getMdp()));

            livreurRepository.save(existingLivreur);
            return ResponseEntity.ok(existingLivreur);
        }).orElse(ResponseEntity.notFound().build());
    }
    @RequestMapping(value = "/forgotmdp", method = RequestMethod.POST)
    public ResponseEntity<?> forgotMdp(@RequestBody Livreur livreur) {
        System.out.println("Demande de réinitialisation de mot de passe reçue pour l'e-mail: " + livreur);
        Livreur userFromDB = livreurRepository.findLivreurByEmail(livreur.getEmail());
        if (userFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        } else {
            String nvmdp = resetMdpService.nvMdp();
            userFromDB.setMdp(bCryptPasswordEncoder.encode(nvmdp));
            //userFromDB.setResetToken(resetToken);
            //userFromDB.setResetTokenExpiry(Instant.now().plus(Duration.ofHours(24))); // Token expires in 24 hours
            livreurRepository.save(userFromDB);

            //String resetLink = "https://localhost:8081/api/livreur/resetmdp?token=" + resetToken;
            emailService.SendSimpleMessage(livreur.getEmail(), "Votre nouveau mot de passe", "Bonjour,\n" +
                    "Votre mot de passe sur ShopFlow a été re-initlaisé, le nouveau mot de passe est : " + nvmdp);
            return ResponseEntity.status(HttpStatus.OK).body("Instructions de réinitialisation du mot de passe envoyées à votre adresse e-mail");
        }
    }

    @PostMapping("/checkmdp")
    public ResponseEntity<Map<String, Object>> checkmdp(@RequestBody Livreur livreur) {
        System.out.println("in login-livreur"+livreur);
        HashMap<String, Object> response = new HashMap<>();

        Livreur userFromDB = livreurRepository.findLivreurByEmail(livreur.getEmail());
        System.out.println("userFromDB+livreur"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Livreur not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(livreur.getMdp(), userFromDB.getMdp());
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
    public ResponseEntity<Map<String, Object>> loginLivreur(@RequestBody Livreur livreur) {
        System.out.println("in login-livreur"+livreur);
        HashMap<String, Object> response = new HashMap<>();

        Livreur userFromDB = livreurRepository.findLivreurByEmail(livreur.getEmail());
        System.out.println("userFromDB+livreur"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Livreur not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        else {
            boolean compare = this.bCryptPasswordEncoder.matches(livreur.getMdp(), userFromDB.getMdp());
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

    @GetMapping("mon-list-a-livrer/{id}")
    public List<AffectationCommandeDto> findAllListALivrerByIdLivreur(@PathVariable Long id)
    {
        return  affectationCommandeService.findAllByLivreurId(id);
    }
}
