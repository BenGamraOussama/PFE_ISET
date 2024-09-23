import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../Entity/produit.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.css']
})
export class ListproduitComponent {
  p:number=1;
  collection: any[]
  listProduit: Produit[];
  searchQuery: string = ''; // Added for search functionality

  public constructor(private route: Router, private service:CrudService){}

  //supprimer produit
  DeleteProduit(produit: Produit){
    if (confirm("voulez vous supprimer ce produit avec l'ID "+ produit.id+ "?")){
      this.service.onDeleteProduit(produit.id).subscribe(()=> {
        this.route.navigate(['/listproduit']).then(()=> {
          window.location.reload()
          alert("Produit à été supprimer")
        })
      })
    }
  }

  get filteredProduits(): Produit[] {
    if (!this.searchQuery) {
      return this.listProduit;
    }
    return this.listProduit.filter(produit =>
      produit.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  //affiche produit
  ngOnInit():void{
    this.service.getProduit().subscribe(produit => {
      this.listProduit= produit
    })
  }

}
