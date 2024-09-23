import { Component } from '@angular/core';
import { Produit } from '../entity/produit.Entity';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Cartprodui } from '../entity/cartproduit.Entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  p:number;
  listProduit:Produit[];
  lastTwoProducts: Produit[] = [];
  lastEightProducts: Produit[] = [];
  token: string |  null;
  userRole: string | null ;
  userDetails:any;



constructor(private router:Router,private service:CrudService) {  }



  
ngOnInit(): void {

  this.service.getProduit().subscribe((produit)=>{
    this.listProduit=produit
    this.getLastTwoProducts();
    this.getLastEightProducts();

  })

  this.userDetails = this.service.userDetails();

  //bech na7i connexion ki na3ml login 
  const storedToken = localStorage.getItem('myToken');
  if (storedToken) {
    this.token = storedToken;
  }
  //w naffichi 7aja 7aseb role mta3ha w role n7ote fi login.ts mta3 
  const storedUserRole = localStorage.getItem('role');
  if (storedUserRole) {
    this.userRole = storedUserRole;
  }
}

addToCart(produit: Produit) {
  const Cardprodui= new Cartprodui(produit)
  console.log(produit);
  this.service.addCartProduit(Cardprodui)
 this.service.addCartProduit(Cardprodui).subscribe(
  res=>{
    console.log(res);
    this.router.navigate(['']).then(()=>{
    window.location.reload() })
   }
  )}

getLastTwoProducts(): void {
  if (this.listProduit && this.listProduit.length >= 2) {
    this.lastTwoProducts = this.listProduit.slice(-2);
  } else if (this.listProduit) {
    this.lastTwoProducts = this.listProduit.slice();
  }
}

getLastEightProducts(): void {
  if (this.listProduit && this.listProduit.length >= 8) {
    this.lastEightProducts = this.listProduit.slice(-8);
  } else if (this.listProduit) {
    this.lastEightProducts = this.listProduit.slice();
  }
}

deconnexion(){
  console.log("logout");
  localStorage.clear()
 
  this.router.navigate(['']).then(()=>{window.location.reload()});
}

  
}
