import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Client } from '../entity/client.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-registerclient',
  templateUrl: './registerclient.component.html',
  styleUrls: ['./registerclient.component.css']
})
export class RegisterclientComponent {
  ClientForm:FormGroup

    constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
      
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      prenom: new FormControl('',[
        Validators.required,]),
      telephone: new FormControl( '', [
        Validators.required,]),
      email: new FormControl('',[
          Validators.required,
        Validators.email]),
      mdp: new FormControl('',[
        Validators.required,]),

      adresse: new FormControl('',[
        Validators.required,]),
      cin: new FormControl('',[
        Validators.required,]),}
     this.ClientForm = this.fb.group(formControls)
   }
   get nom() {return this.ClientForm.get('nom');}
  get prenom() { return this.ClientForm.get('prenom');}
  get telephone() { return this.ClientForm.get('telephone');}
  get email() {return this.ClientForm.get('email');}
  get mdp() {return this.ClientForm.get('mdp');}
  get adresse() { return this.ClientForm.get('adresse');}
  get cin() { return this.ClientForm.get('cin');}
   
  
  
  addNewClient() {
    let data = this.ClientForm.value;
    console.log(data);
    let client = new Client(
     undefined, data.nom,data.prenom,data.telephone,data.email,data.mdp,data.adresse,data.cin);
    console.log(client);

    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.telephone ==0||
      data.email == 0 ||
      data.mdp == 0 ||
      data.adresse ==0||
      data.cin ==0

    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addClient(client).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'inscription a été affectuer avec succés',
        });
      },
      err=>{
        console.log(err);
        this.toast.error({
          detail: 'Error Message',
          summary: 'Probléme de Serveur',
        }); }
    )
    }
  }



    ngOnInit(): void {
    }
}
