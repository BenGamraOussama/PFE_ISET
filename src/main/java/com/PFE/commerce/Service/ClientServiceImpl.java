package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.Entity.ConfirmationTokenC;
import com.PFE.commerce.Repository.ClientRepository;
import com.PFE.commerce.Repository.ConfirmationTokenCRepository;
import com.PFE.commerce.beans.ClientDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService{

    @Autowired
    ClientRepository clientRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    ConfirmationTokenCRepository confirmationTokenRepository;
    @Autowired
    EmailServiceC emailServiceC;

    @Override
    public ResponseEntity<Object> ajouterClient(Client client) {
        Client existingUser = clientRepository.findByEmail(client.getEmail());
        if (existingUser!=null) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        client.setMdp(this.bCryptPasswordEncoder.encode(client.getMdp()));
        clientRepository.save(client);
        ConfirmationTokenC confirmationToken = new ConfirmationTokenC(client);

        confirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(client.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8081/api/client/confirm-account?token="+confirmationToken.getConfirmationToken());
        emailServiceC.sendEmail(mailMessage);

        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());

        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }




    @Override
    public ResponseEntity<?> ConfirmeEmail(String confirmationTokenC) {

        ConfirmationTokenC token = confirmationTokenRepository.findByConfirmationToken(confirmationTokenC);

        if(token != null)
        {
            Client client = clientRepository.findByEmail(token.getClient().getEmail());
            System.out.println("email from token " +token.getClient().getEmail());
            client.setEtat(true);
            clientRepository.save(client);
            return ResponseEntity.ok("Email verified successfully! "+"http://localhost:4200/login");
        }else {
            return ResponseEntity.badRequest().body("Error: Couldn't verify email");}
    }
    @Override
    public Client modifierClient(Client client) { return clientRepository.save(client); }

    @Override
    public Client modifierClient1(Client client, Long id) {
        return clientRepository.save(client);
    }

    @Override
    public Client modifierPwd(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public List<Client> getClient() { return clientRepository.findAll(); }

    @Override
    public void supprimerClient(Long id) { clientRepository.deleteById(id); }

    @Override
    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    @Override
    public Optional<Client> findById(Long idClient) {
        return clientRepository.findById(idClient);    }

    @Override
    public ClientDto clientToClientDto(Client client, ClientDto clientDto) {
        if(client!=null)
        {   clientDto.setAdresse(client.getAdresse());
            clientDto.setEmail(client.getEmail());
            clientDto.setTelephone(client.getTelephone());
            clientDto.setId(client.getId());
            clientDto.setNom(client.getNom());
            clientDto.setPrenom(client.getPrenom());
            clientDto.setQrcode(client.getNom()+" "+client.getPrenom()+" "+client.getTelephone()+" "+client.getAdresse());

            return clientDto; }
        return null;    }
}
