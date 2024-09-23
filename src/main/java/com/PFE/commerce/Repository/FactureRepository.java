package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {
    Optional<Facture> findByCommandeId(Long idCommande);
}
