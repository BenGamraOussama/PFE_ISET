package com.PFE.commerce.Repository;

import com.PFE.commerce.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {
    //Admin findAdminByResetToken(String resetToken);

    boolean existsByEmail(String email);

    Admin findAdminByEmail(String email);
}
