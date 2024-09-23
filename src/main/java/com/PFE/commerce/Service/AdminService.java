package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Admin;
import com.PFE.commerce.Repository.AdminRepository;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    Admin ajouterAdmin(Admin admin);
    Admin modifierAdmin(Admin admin);


    List<Admin> getAdmin();
    void supprimerAdmin(Long id);
    Optional<Admin>getAdminById(Long id);
}
