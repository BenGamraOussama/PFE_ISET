import { Component } from '@angular/core';
import { Saveproduit } from '../entity/saveProduit.Entity';
import { Router } from '@angular/router';
import { Produit } from '../entity/produit.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.css']
})
export class ListproduitComponent {
  idFournisseur: number;
  userDetails:any
 listProduit:Produit[]

  public constructor(private service:CrudService,private router:Router){}

  ngOnInit(): void {
    this.userDetails = this.service.userDetails();
    // Supposons que vous récupérez l'ID du fournisseur à partir d'une source, par exemple, un service d'authentification
    this.idFournisseur = this.userDetails.id; // Utilisation correcte de userDetails pour récupérer l'ID
  
    // Utilisez l'ID du fournisseur pour récupérer les produits liés à ce fournisseur
    this.service.getProduit().subscribe((produits: Produit[]) => {
      // Filtrer les produits pour obtenir uniquement ceux ajoutés par le fournisseur actuel
      this.listProduit = produits.filter(produit => produit.fournisseur.id === this.idFournisseur);
    });
  }


 deleteProduit(produit:Produit){
  if(confirm("Voulez vous supprimer cet produit avec l'ID " + produit.id + " ?")){
     this.service.DeleteProduit(produit.id).subscribe(()=>{
      this.router.navigate(['/listproduit']).then(()=>{
        window.location.reload()
      })
    })
}
}
}
