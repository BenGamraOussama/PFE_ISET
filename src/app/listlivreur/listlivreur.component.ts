import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Livreur } from '../Entity/livreur.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listlivreur',
  templateUrl: './listlivreur.component.html',
  styleUrls: ['./listlivreur.component.css']
})
export class ListlivreurComponent {
  role:String
  listLivreur: Livreur[];
  searchQuery: string = ''; // Added for search functionality

  constructor(private service:CrudService,private router:Router ) { }


  //supprimer
  Deletelivreur(livreur: Livreur){
    if(confirm("Voulez vous supprimer cet livreur avec l'ID " + livreur.id + " ?")) {
     
      this.service.onDeleteLivreur(livreur.id).subscribe(() => {
        this.router.navigate(['/listlivreur']).then(() => {
          window.location.reload()
        })
      })
   
  }
}

get filteredLivreurs(): Livreur[] {
  if (!this.searchQuery) {
    return this.listLivreur;
  }
  return this.listLivreur.filter(livreur =>
    livreur.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    livreur.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

  ngOnInit(): void {
    this.service.getLivreur().subscribe(livreur => {
      this.listLivreur = livreur
    })
  }
}
