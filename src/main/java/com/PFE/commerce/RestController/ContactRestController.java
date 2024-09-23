package com.PFE.commerce.RestController;

import com.PFE.commerce.Entity.Categorie;
import com.PFE.commerce.Entity.Client;
import com.PFE.commerce.Entity.Contact;
import com.PFE.commerce.Repository.ContactRepository;
import com.PFE.commerce.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping(value = "/contact")
public class ContactRestController {
    @Autowired
    ContactRepository contactRepository;

    @Autowired
    ContactService contactService;
    @RequestMapping(method = RequestMethod.POST )
    public Contact AjouterContact (@RequestBody Contact contact){

        return contactService.ajouterContact(contact);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Contact> AfficherContact(){
        return contactService.getContact();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE )
    public void SupprimerContact(@PathVariable("id") Long id){
        contactService.supprimerContact(id);
    }

    @RequestMapping(value = "/{id}" , method = RequestMethod.GET)
    public Optional<Contact> getContactById(@PathVariable("id") Long id){

        Optional<Contact> contact = contactService.getContactById(id);
        return contact;
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.PUT)
    public Contact ModifierContact(@PathVariable("id")Long id, @RequestBody Contact contact){
        Contact savedUser = contactRepository.save(contact);

        Contact newContact = contactService.modifierContact(contact);
        return newContact;
    }
}
