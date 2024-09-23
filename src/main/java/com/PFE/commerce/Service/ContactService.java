package com.PFE.commerce.Service;

import com.PFE.commerce.Entity.Contact;

import java.util.List;
import java.util.Optional;

public interface ContactService {
    Contact ajouterContact(Contact contact);
    Contact modifierContact(Contact contact);
    List<Contact> getContact();
    void supprimerContact(Long id);
    Optional<Contact>getContactById(Long id);
}
