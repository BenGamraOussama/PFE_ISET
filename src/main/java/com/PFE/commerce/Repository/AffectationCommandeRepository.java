package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.AffectationCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AffectationCommandeRepository extends JpaRepository<AffectationCommande, Long>{
    boolean existsByCommandeIdAndLivreurId(Long commande, Long livreur);

    boolean existsByCommandeId(Long commandeId);

    List<AffectationCommande> findByLivreurId(Long livreurId);
}
