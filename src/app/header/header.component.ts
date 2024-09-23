import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Contact } from '../Entity/contact.Entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  listContact:Contact[];
  userDetails:any
  constructor(private router:Router,private service:CrudService) {this.userDetails = this.service.userDetails();}

  logout(){
    console.log("logout");
    localStorage.clear()
   
    this.router.navigate(['/login']).then(() => {
      window.location.reload()
    })
  }
    //afficherContact
    ngOnInit(): void {
      this.service.getContact().subscribe(contact => {
        this.listContact = contact
        this.listContact = contact.reverse();
        this.listContact = contact.slice(0, 3);
      })

}
}
