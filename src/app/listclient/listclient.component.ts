import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../Entity/client.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listclient',
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.css']
})
export class ListclientComponent {
  p:number=1;
  collection:any[]
    listClient:Client[];
  
    public constructor(private route:Router,private service:CrudService){}
  
    //afficherClient
    ngOnInit():void{
      this.service.getClient().subscribe(client => {
        this.listClient = client
      }) 
    }
  
        //supprimer
    DeleteClient(client: Client){
      if(confirm("Voulez vous supprimer cet client avec l'ID " + client.id + " ?")) {
       
        this.service.onDeleteClient(client.id).subscribe(() => {
          this.route.navigate(['/listclient']).then(() => {
            window.location.reload()
            alert("client à été supprimer")
          })
        })
     
    }
  }
}
