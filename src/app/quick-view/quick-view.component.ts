import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartprodui } from '../entity/cartproduit.Entity';
import { Categorie } from '../entity/categorie.Entity';
import { Produit } from '../entity/produit.Entity';
import { CrudService } from '../service/crud.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent {
  id: number;
  produit: Produit;
  role:string;
  constructor(private service:CrudService,private router: ActivatedRoute,private toast: NgToastService, ) {  }
  
  

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const produitId = +params['id'];
      this.service.findProduitById(produitId).subscribe(
        (result: Produit) => {
          this.produit = result;
        },
        (error) => {
          this.toast.error({ detail: "Erreur", summary: "Produit introuvable", duration: 5000 });
        }
      );
    });
  }
}
