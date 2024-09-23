package com.PFE.commerce.RestController;

import com.PFE.commerce.Entity.Admin;
import com.PFE.commerce.Entity.Admin;
import com.PFE.commerce.Repository.AdminRepository;
import com.PFE.commerce.Service.AdminService;
import com.PFE.commerce.Service.EmailService;
import com.PFE.commerce.Service.ResetMdpService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/admin")
public class AdminRestController {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    AdminService adminService;

    @Autowired
    EmailService emailService;

    @Autowired
    ResetMdpService resetMdpService;
    @RequestMapping(method = RequestMethod.POST )
    ResponseEntity<?> AjouterAdmin (@RequestBody Admin admin){

        HashMap<String, Object> response = new HashMap<>();
        if(adminRepository.existsByEmail(admin.getEmail())){
            response.put("message", "email exist deja !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }else{
            admin.setMdp(this.bCryptPasswordEncoder.encode(admin.getMdp()));
            Admin savedUser = adminRepository.save(admin);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Admin> AfficherAdmin(){
        return adminService.getAdmin();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerAdmin(@PathVariable("id") Long id){
        adminService.supprimerAdmin(id);

    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Admin> getAdminById(@PathVariable("id") Long id){

        Optional<Admin> admin = adminService.getAdminById(id);
        return admin;
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Admin ModifierAdmin(@PathVariable("id")Long id, @RequestBody Admin admin){
        admin.setMdp(this.bCryptPasswordEncoder.encode(admin.getMdp()));
        Admin savedUser = adminRepository.save(admin);

        Admin newAdmin = adminService.modifierAdmin(admin);
        return newAdmin;
    }
    @RequestMapping(value = "/updateRole/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Admin> modifierAdminR(@RequestBody Admin admin, @PathVariable("id") Long id) {
        return adminRepository.findById(id).map(existingAdmin -> {
            existingAdmin.setRole(admin.getRole());
            adminRepository.save(existingAdmin);
            return ResponseEntity.ok(existingAdmin);
        }).orElse(ResponseEntity.notFound().build());
    }
    @RequestMapping(value = "/updateDetails/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Admin> modifierAdmin1(@RequestBody Admin admin, @PathVariable("id") Long id) {
        return adminRepository.findById(id).map(existingAdmin -> {
            existingAdmin.setNom(admin.getNom());
            existingAdmin.setPrenom(admin.getPrenom());
            adminRepository.save(existingAdmin);
            return ResponseEntity.ok(existingAdmin);
        }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/updateMdp/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Admin> modifierPassword(@PathVariable("id") Long id, @RequestBody Admin admin) {
        return adminRepository.findById(id).map(existingAdmin -> {

            existingAdmin.setMdp(bCryptPasswordEncoder.encode(admin.getMdp()));

            adminRepository.save(existingAdmin);
            return ResponseEntity.ok(existingAdmin);
        }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/forgotmdp", method = RequestMethod.POST)
    public ResponseEntity<?> forgotMdp(@RequestBody Admin admin) {
        System.out.println("Demande de réinitialisation de mot de passe reçue pour l'e-mail: " + admin);
        Admin userFromDB = adminRepository.findAdminByEmail(admin.getEmail());
        if (userFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        } else {
            String nvmdp = resetMdpService.nvMdp();
            userFromDB.setMdp(bCryptPasswordEncoder.encode(nvmdp));
            //userFromDB.setResetToken(resetToken);
            //userFromDB.setResetTokenExpiry(Instant.now().plus(Duration.ofHours(24))); // Token expires in 24 hours
            adminRepository.save(userFromDB);

            //String resetLink = "https://localhost:8081/api/admin/resetmdp?token=" + resetToken;
            emailService.SendSimpleMessage(admin.getEmail(), "Votre nouveau mot de passe", "Bonjour,\n" +
                    "Votre mot de passe sur ShopFlow a été re-initlaisé, le nouveau mot de passe est : " + nvmdp);
            return ResponseEntity.status(HttpStatus.OK).body("Instructions de réinitialisation du mot de passe envoyées à votre adresse e-mail");
        }
    }
    @PostMapping("/checkmdp")
    public ResponseEntity<Map<String, Object>> checkmdp(@RequestBody Admin admin) {
        System.out.println("in login-admin"+admin);
        HashMap<String, Object> response = new HashMap<>();

        Admin userFromDB = adminRepository.findAdminByEmail(admin.getEmail());
        System.out.println("userFromDB+admin"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Admin not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(admin.getMdp(), userFromDB.getMdp());
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

    /*@RequestMapping(value = "/reset-password", method = RequestMethod.POST)
    public ResponseEntity<?> resetPassword(@RequestBody Admin admin) {
        String token = admin.getResetToken();
        String password = admin.getMdp();

        Admin adminFromDB = adminRepository.findAdminByResetToken(token);
        if (adminFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid or expired token");
        } else if (adminFromDB.getResetTokenExpiry().isBefore(Instant.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token expired");
        } else {
            adminFromDB.setMdp(bCryptPasswordEncoder.encode(password));
            adminFromDB.setResetToken(null);
            adminFromDB.setResetTokenExpiry(null);
            adminRepository.save(adminFromDB);
            return ResponseEntity.status(HttpStatus.OK).body("Password reset successfully");
        }
    }*/

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Admin admin) {
        System.out.println("in login-admin"+admin);
        HashMap<String, Object> response = new HashMap<>();

        Admin userFromDB = adminRepository.findAdminByEmail(admin.getEmail());
        System.out.println("userFromDB+admin"+userFromDB);
        if (userFromDB == null) {
            response.put("message", "Admin not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(admin.getMdp(), userFromDB.getMdp());
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
                response.put("role", userFromDB.getRole());
                System.out.println("hhh");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

        }
    }
}
