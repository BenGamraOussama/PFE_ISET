package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PanierRepository extends JpaRepository<Panier,Long> {
    Optional<Panier> findByProduitIdAndClientId(Long idProduit, Long idClient);

    List<Panier> findByClientId(Long id);
}
