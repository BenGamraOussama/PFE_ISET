package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategorieRepository extends JpaRepository<Categorie,Long> {

  //  Categorie findCategorieByNom(String nom);


    boolean existsByNom(String nom);
}
