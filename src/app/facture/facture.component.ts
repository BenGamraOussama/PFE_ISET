import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent {

  date: Date;
  message=""
  constructor(public service:CrudService, private route:ActivatedRoute, private router: Router) { }
    id:any
    confirmerLiv(id:number)
    {
      this.service.confirmFactureByIdFromApi(id).subscribe((data)=>{
        this.message='<div class="alert alert-success" role="alert">Commande Confirmé a la livraison</div>'
        this. dropMessage();
      },err=>{  this.message='<div class="alert alert-danger" role="alert">Confirmation de livraison ne pas effectuer</div>'
      this. dropMessage();
    })
    }
    dropMessage()
    {
      setTimeout(() => {
        this.message="";
        this.router.navigate(['commandeliv'])
      }, 3000);
    }
  ngOnInit(): void {
  this.date=new Date()
   
   this.id= this.route.snapshot.params['id']
 
    this.service.getFactureByIdCommande(this.id)
    
  }
}
