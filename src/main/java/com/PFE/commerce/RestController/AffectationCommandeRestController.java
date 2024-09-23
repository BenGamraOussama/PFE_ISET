package com.PFE.commerce.RestController;

import com.PFE.commerce.Service.AffectationCommandeService;
import com.PFE.commerce.beans.AffictationCommandeLRq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/affectation")
public class AffectationCommandeRestController {

    @Autowired
    AffectationCommandeService affectationCommandeService;

    @PostMapping("add")
    public ResponseEntity<?> addAffect(@RequestBody AffictationCommandeLRq affictationCommandeLRq) {

        return affectationCommandeService.addAffect(affictationCommandeLRq);
    }

}
