import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Fournisseur } from '../entity/fournisseur.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-registerfournisseur',
  templateUrl: './registerfournisseur.component.html',
  styleUrls: ['./registerfournisseur.component.css']
})
export class RegisterfournisseurComponent {
  FournisseurForm:FormGroup
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      prenom: new FormControl('',[
        Validators.required,]),
      adresse: new FormControl('',[
        Validators.required,]),
      email: new FormControl('',[
        Validators.required,
        Validators.email]),
      mdp: new FormControl('',[
        Validators.required,]),
      telephone: new FormControl( '', [
        Validators.required,]),
}
     this.FournisseurForm = this.fb.group(formControls)
   }

   
  get nom() {return this.FournisseurForm.get('nom');}
  get prenom() { return this.FournisseurForm.get('prenom');}
  get telephone() { return this.FournisseurForm.get('telephone');}
  get email() {return this.FournisseurForm.get('email');}
  get mdp() {return this.FournisseurForm.get('mdp');}

   addNewFournisseur() {
    let data = this.FournisseurForm.value;
    console.log(data);
    let fournisseur = new Fournisseur(
     undefined, data.nom,data.prenom,data.telephone,data.email,data.mdp);
    console.log(fournisseur);

    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.telephone == 0 ||
      data.email == 0 ||
      data.mdp == 0
      ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addFournisseur(fournisseur).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'inscription a été affectuer avec succés',
        });

       this.router.navigate(['/loginFournisseur']);
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
