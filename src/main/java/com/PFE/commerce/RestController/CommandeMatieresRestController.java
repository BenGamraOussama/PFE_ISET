package com.PFE.commerce.RestController;

import com.PFE.commerce.Entity.CommandeMatieres;
import com.PFE.commerce.Service.CommandeMatieresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping(value = "/cmdmat")
public class CommandeMatieresRestController {
    @Autowired
    CommandeMatieresService commandeMatieresService;
    @RequestMapping(method = RequestMethod.GET)
    public List<CommandeMatieres> commandeMatieres(){
        return commandeMatieresService.getCommandeMatieres() ;
    }
}

