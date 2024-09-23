package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.Entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande,Long> {
}
