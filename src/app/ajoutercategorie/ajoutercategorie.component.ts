import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Categorie } from '../Entity/categorie.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajoutercategorie',
  templateUrl: './ajoutercategorie.component.html',
  styleUrls: ['./ajoutercategorie.component.css']
})
export class AjoutercategorieComponent {
  CategorieForm:FormGroup
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),}
     this.CategorieForm = this.fb.group(formControls)
   }
   get nom() {return this.CategorieForm.get('nom');}


   addNewCategorie() {
    let data = this.CategorieForm.value;
    console.log(data);
    let livreur = new Categorie(
     undefined, data.nom);
    console.log(Categorie);

    if (
      data.nom == 0 
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addCategorie(livreur).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Categorie est Envoyé avec succés',
        });

        //this.router.navigate(['/listCategorie']);
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
