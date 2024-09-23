import { Component } from '@angular/core';
import { Fournisseur } from '../Entity/fournisseur.Entity';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listfournisseur',
  templateUrl: './listfournisseur.component.html',
  styleUrls: ['./listfournisseur.component.css']
})
export class ListfournisseurComponent {
  p:number=1;
collection:any[]
  listFournisseur:Fournisseur[];

  public constructor(private route:Router,private service:CrudService){}

  //afficherFournisseur
  ngOnInit():void{
    this.service.getFournisseur().subscribe(fournisseur => {
      this.listFournisseur = fournisseur
    }) 
  }

      //supprimer
  DeleteFournisseur(fournisseur: Fournisseur){
    if(confirm("Voulez vous supprimer cet fournisseur avec l'ID " + fournisseur.id + " ?")) {
     
      this.service.onDeleteFournisseur(fournisseur.id).subscribe(() => {
        this.route.navigate(['/listfournisseur']).then(() => {
          window.location.reload()
          alert("fournisseur à été supprimer")
        })
      })
   
  }
}
updatefournitat(four:Fournisseur){
  console.log(four);

  let index=this.listFournisseur.indexOf(four);
  if(four.etat==true)
  {let newFournisseur=new Fournisseur(four.id,four.nom,four.prenom,four.telephone,four.email,four.mdp,false)
this.service.updateFournisseur(four.id,newFournisseur).subscribe
(
  res=>{console.log(res)
  this.listFournisseur[index]=newFournisseur
  },
  err=>console.log(err)
)
  }
 
  else{

    let newFournisseur=new Fournisseur(four.id,four.nom,four.prenom,four.telephone,four.email,four.mdp,true)
    this.service.updateFournisseur(four.id,newFournisseur).subscribe
  (
    res=>{console.log(res)
    this.listFournisseur[index]=newFournisseur
    },
    err=>console.log(err)
  )

  }



}
}
