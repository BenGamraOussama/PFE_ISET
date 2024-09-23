import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Livreur } from '../Entity/livreur.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouterlivreur',
  templateUrl: './ajouterlivreur.component.html',
  styleUrls: ['./ajouterlivreur.component.css']
})
export class AjouterlivreurComponent {
  LivreurForm:FormGroup
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      prenom: new FormControl('',[
        Validators.required,]),
      telephone: new FormControl('',[
        Validators.required,]),
      email: new FormControl('',[
          Validators.required,
        Validators.email]),
      mdp: new FormControl('',[
        Validators.required,]),
      adresse: new FormControl( '', [
        Validators.required,]),}
     this.LivreurForm = this.fb.group(formControls)
   }
   get nom() {return this.LivreurForm.get('nom');}
  get prenom() { return this.LivreurForm.get('prenom');}
  get telephone() { return this.LivreurForm.get('telephone');}
  get email() {return this.LivreurForm.get('email');}
  get mdp() {return this.LivreurForm.get('mdp');}
  get adresse() { return this.LivreurForm.get('adresse');}

   addNewLivreur() {
    let data = this.LivreurForm.value;
    console.log(data);
    let livreur = new Livreur(
     undefined, data.nom,data.prenom,data.telephone,data.email,data.mdp, data.adresse);
    console.log(Livreur);

    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.telephone == 0||
      data.email == 0 ||
      data.mdp == 0 ||
      data.adresse == 0
      ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addLivreur(livreur).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Livreur est Envoyé avec succés',
        });

      this.router.navigate(['/listLivreur']);
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
