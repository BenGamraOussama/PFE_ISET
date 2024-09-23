import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Fournisseur } from '../entity/fournisseur.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-loginfournisseur',
  templateUrl: './loginfournisseur.component.html',
  styleUrls: ['./loginfournisseur.component.css']
})
export class LoginfournisseurComponent {
  loginForm: FormGroup
  userRole: string = 'fournisseur';
  token: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,
    private toast:NgToastService
  ) { 
    this.token = localStorage.getItem('myToken') 
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
        
      ]),
      mdp: new FormControl('',[
        Validators.required,
       
      ])
    }

    this.loginForm = this.fb.group(formControls)
  }

  get email() { return this.loginForm.get('email') }
  get mdp() { return this.loginForm.get('mdp') }
  ngOnInit(): void { 
  }

  login() {
    let data = this.loginForm.value;
    let fournisseur = new Fournisseur(data.null, data.null, data.null,data.null, data.email, data.mdp);
    if (data.email == 0 || data.mdp == 0) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
      this.service.loginfournisseurfromapi(fournisseur).subscribe(
        res => {
          this.token = res.token;
          localStorage.setItem("myToken", res.token);
          localStorage.setItem("role", "fournisseur");
          this.router.navigate(['listproduit']).then(() => window.location.reload());
        },
        err => {
          
          if (err.error.message === "Votre compte est désactivé") {
            this.toast.error({
              detail: 'Error Message',
              summary: 'Votre compte est désactivé',
            });
          } else {
           
            this.toast.error({
              detail: 'Error Message',
              summary: 'Problème de Serveur',
            });
          }
        }
        
      )
    }
  }
}
