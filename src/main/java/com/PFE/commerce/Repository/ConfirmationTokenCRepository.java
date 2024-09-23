package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.ConfirmationTokenC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenCRepository extends JpaRepository<ConfirmationTokenC,Long> {
    ConfirmationTokenC findByConfirmationToken(String confirmationToken);
}