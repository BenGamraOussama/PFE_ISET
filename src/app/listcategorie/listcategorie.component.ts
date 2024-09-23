import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../Entity/categorie.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listcategorie',
  templateUrl: './listcategorie.component.html',
  styleUrls: ['./listcategorie.component.css']
})
export class ListcategorieComponent {
  p:number=1;
  collection:any[]
    listCategorie:Categorie[];
  
    public constructor(private route:Router,private service:CrudService){}
  
    //afficherCategorie
    ngOnInit():void{
      this.service.getCategorie().subscribe(categorie => {
        this.listCategorie = categorie
      }) 
    }
  
        //supprimer
    DeleteCategorie(categorie: Categorie){
      if(confirm("Voulez vous supprimer cet Categorie avec l'ID " + categorie.id + " ?")) {
       
        this.service.onDeleteCategorie(categorie.id).subscribe(() => {
          this.route.navigate(['/listCategorie']).then(() => {
            window.location.reload()
            alert("Categorie à été supprimer")
          })
        })
     
    }
  }
}
