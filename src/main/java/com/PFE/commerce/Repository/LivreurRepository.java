package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.Livreur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivreurRepository extends JpaRepository<Livreur,Long> {
    boolean existsByEmail(String email);

    Livreur findLivreurByEmail(String email);
}
