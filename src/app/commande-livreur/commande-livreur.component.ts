import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-commande-livreur',
  templateUrl: './commande-livreur.component.html',
  styleUrls: ['./commande-livreur.component.css']
})
export class CommandeLivreurComponent {
  constructor(public service:CrudService,private router:Router) { }
   
  data = [{
    'name': 'Jolly',
    'address': 'Mars',
    'email': 'example@abc.com'
  }]
  data2:any;
  dataString = JSON.stringify(this.data);
  ngOnInit(): void {
    this.service.getAllMyListALivrer()
    
    setTimeout(() => {
      console.log("list",this.service.listALivrer)
    }, 200);
    
  }

  

  toFacture(id:any)
  {
    this.router.navigate(['http://localhost:4200/facture/'+id])
  }
}
