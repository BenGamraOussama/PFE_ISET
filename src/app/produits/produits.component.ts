import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../entity/categorie.Entity';
import { Produit } from '../entity/produit.Entity';
import { CrudService } from '../service/crud.service';
import { Cartprodui } from '../entity/cartproduit.Entity';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {
  listProduit:Produit[]
  listcategorie:Categorie[]

  
  token: string | null = null;
  searchQuery: string = '';
  role:String;
  activeCategory: string = '';

  public constructor(private service:CrudService,private router:Router){this.token = localStorage.getItem('myToken'); }


  setActiveCategory(categoryName: string): void {
    if (this.activeCategory === categoryName) {
      this.activeCategory = ''; // Set to empty string if already active
    } else {
      this.activeCategory = categoryName; // Set to the selected category
    }
  }
  


get filteredProduit(): Produit[] {

  let filtered = this.listProduit;
  if (this.activeCategory) {
    filtered = filtered.filter(produit => produit.categorie.nom === this.activeCategory);
  }



  else if (this.searchQuery) {
    filtered = filtered.filter(produit =>
      produit.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      produit.categorie.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  return filtered;
}

  get filteredCat(): Categorie[] {
    let filtered = this.listcategorie;

    if (this.activeCategory) {
      filtered = filtered.filter(categorie => categorie.nom === this.activeCategory);
    }



    if (this.searchQuery) {
      filtered = filtered.filter(categorie =>
        categorie.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }


  ngOnInit():void{
    this.service.getProduit().subscribe((produit)=>{
     this.listProduit=produit
   })

   this.service.getCategorie().subscribe(categorie=>{this.listcategorie=categorie})
  }

addtocart(produit: Produit) {
  const Cardprodui= new Cartprodui(produit)
  console.log(produit);
  this.service.addCartProduit(Cardprodui)
 this.service.addCartProduit(Cardprodui).subscribe(
  res=>{
    console.log(res);
  this.router.navigate(['/produit']).then(()=>{window.location.reload() }) 
  })}
}

