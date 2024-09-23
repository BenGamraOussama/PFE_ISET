package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.beans.ClientDto;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ClientService {

    ResponseEntity<Object> ajouterClient(Client client);
    ResponseEntity<?> ConfirmeEmail(String confirmationTokenC);
    Client modifierClient(Client client);
    Client modifierClient1(Client client, Long id);

    Client modifierPwd(Client client);

    List<Client> getClient();
    void supprimerClient(Long id);

    Optional<Client>getClientById(Long id);

    Optional<Client> findById(Long idClient);
    ClientDto clientToClientDto(final Client client, final ClientDto clientDto);
}
