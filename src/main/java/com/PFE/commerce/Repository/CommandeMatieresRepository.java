package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.CommandeMatieres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CommandeMatieresRepository extends JpaRepository<CommandeMatieres,Long> {

    List<CommandeMatieres> findByCommandeId(Long id);
}
