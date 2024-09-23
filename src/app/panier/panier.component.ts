import { Component } from '@angular/core';
import { CrudService, OperationPanier } from '../service/crud.service';
import { Router } from '@angular/router';
import { Panier } from '../entity/panier.Entity';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  totalprix:Number=0
   
  listPanier: any[] = [];
  total: number;
  messageCommande=""
  constructor(public service: CrudService,private router:Router ) {}
  c : Panier = new Panier();
  ngOnInit(): void {
   this.getAllPanier();
    this.service.reflechPanier.subscribe(()=>{
      this.getAllPanier(); 
    })   
  }
  getAllPanier()
  {
    setTimeout(() => {
      this.listPanier=this.service.monPanier
     
   }, 100);
  }

  ajouterCommandelivraisonp(): void{
    this.service.ajouterCommande();
    this.router.navigate(['/panier']).then(()=>{window.location.reload() }) 
  }
  ajouterCommande(): void{
    this.service.ajouterCommande();
    this.router.navigate(['panierl'])
  }
 
 
 
  delete(panier: any) {
    this.service.deletePanier(panier)
  }

  plus(item: any) {
    this.service.patchQttProduit(item,OperationPanier.PLUS)
  }

  minus(item: any) {
    this.service.patchQttProduit(item,OperationPanier.MOIN)
  }
}
