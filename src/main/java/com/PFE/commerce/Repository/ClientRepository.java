package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client,Long> {
    boolean existsByEmail(String email);

    Client findClientByEmail(String email);

    Client findByEmail(String email);
}
