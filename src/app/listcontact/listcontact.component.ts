import { Component } from '@angular/core';
import { Contact } from '../Entity/contact.Entity';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-listcontact',
  templateUrl: './listcontact.component.html',
  styleUrls: ['./listcontact.component.css']
})
export class ListcontactComponent {
  p:number=1;
collection:any[]
  listContact:Contact[];

  public constructor(private route:Router,private service:CrudService){}

  //afficherContact
  ngOnInit():void{
    this.service.getContact().subscribe(contact => {
      this.listContact = contact
    }) 
  }

      //supprimer
  DeleteContact(contact: Contact){
    if(confirm("Voulez vous supprimer cet contact avec l'ID " + contact.id + " ?")) {
     
      this.service.onDeleteContact(contact.id).subscribe(() => {
        this.route.navigate(['/listcontact']).then(() => {
          window.location.reload()
          alert("contact à été supprimer")
        })
      })
   
  }
}
}
