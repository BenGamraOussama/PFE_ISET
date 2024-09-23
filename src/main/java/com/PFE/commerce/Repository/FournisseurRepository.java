package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur,Long> {
    boolean existsByEmail(String email);

    Fournisseur findFournisseurByEmail(String email);
}
