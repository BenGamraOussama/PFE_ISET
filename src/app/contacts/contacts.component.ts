import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Contacts } from '../entity/contacts.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contactsForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,
    private toast:NgToastService
  ) { 
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),

      email: new FormControl('',[
        Validators.required,]),

      telephone: new FormControl('',[
        Validators.required,]),
      
      sujet: new FormControl('',[
        Validators.required,]),

      message: new FormControl('',[
        Validators.required,])
    }
    this.contactsForm = this.fb.group(formControls)
  }

  get nom() {return this.contactsForm.get('nom');}
  get email() {return this.contactsForm.get('email');}
  get telephone() {return this.contactsForm.get('telephone');}
  get sujet() { return this.contactsForm.get('sujet');}
  get message() {return this.contactsForm.get('message');}


  addNewContacts() {
    let data = this.contactsForm.value;
    console.log(data);
    let contacts = new Contacts(
     undefined, data.nom,data.email,data.telephone,data.sujet,data.message);
    console.log(contacts);

    if (
      data.nom == 0 ||
      data.email == 0 ||
      data.telephone == 0||
      data.sujet == 0||
      data.message == 0
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
      this.service.addContacts(contacts).subscribe(
        res=>{
          console.log(res);
          let token = res.token;
          localStorage.setItem("myToken",res.token);
          localStorage.setItem("role",res.role);
        this.router.navigate(['/home']);

      },
      
        err=>{
          console.log(err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Probléme de Serveur',
          });
          
        }
      )
    }
  }

  ngOnInit(): void { 
  }
}
