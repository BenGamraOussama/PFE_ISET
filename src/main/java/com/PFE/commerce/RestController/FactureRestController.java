package com.PFE.commerce.RestController;

import com.PFE.commerce.Service.FactureService;
import com.PFE.commerce.beans.FactureDto;
import com.PFE.commerce.beans.FactureRq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/facture")
public class FactureRestController {
    @Autowired
    FactureService factureService;
    @PostMapping("facture")
    public FactureDto saveFacture(@RequestBody FactureRq factureRq)
    {
        return factureService.save(factureRq.getId());
    }
    @PatchMapping("confirme/{id}")
    public FactureDto confirmer(@PathVariable Long id)
    {
        return factureService.confirmer(id);
    }
}
