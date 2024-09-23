import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Livreur } from '../Entity/livreur.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-affectation-commande',
  templateUrl: './affectation-commande.component.html',
  styleUrls: ['./affectation-commande.component.css']
})
export class AffectationCommandeComponent {
  listLiv:Livreur[]
    listCommande:any=[]
    commandeId:number=0;
    livreurId:number=0;
    message:string="";
    constructor(private services:CrudService,private router:Router,private fb:FormBuilder) { }
    changerLiv(event:any)
    {
     this.livreurId=event;
    }
    changerCommande(event:any)
    {
     this.commandeId=event;
    }
    ngOnInit(): void {
    this.getLiv()
    this.commandeL()
    }
    getLiv()
    {
      this.services.getLivreur().subscribe(liv => {
        this.listLiv = liv
        console.log("liv",this.listLiv)
      },err=>{
        console.log(err)
      })
    }
    commandeL()
    {
      this.services.getCommande().subscribe((data:any) => {
        this.listCommande = data
        console.log("comm",this.listCommande)
      })
    }
    add(liv:any,comm:any)
    {
      console.log(liv,comm)
      let rq:any={}
      rq.commande=this.commandeId
      rq.livreur=this.livreurId
      console.log(rq)
      if(rq.commande!= 0 &&  rq.livreur!= 0)
      {
        this.services.addAffect(rq).subscribe((data:any)=>{
          this.message=`<div class="alert alert-success" role="alert">
          Livreur affacté ! 
        </div>`
         },err=>{
           this.message=`<div class="alert alert-warning" role="alert">
           Livreur déjà affacté ! 
         </div>`
         })
      }else
      {
        this.message=`<div class="alert alert-warning" role="alert">
       choix livreur et comande obligatoire ! 
      </div>`
      }
      setTimeout(() => {
        this.message=""
      }, 3000);
      
    }
}
