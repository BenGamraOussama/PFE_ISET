import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Livreur } from '../entity/livreur.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login-livreur',
  templateUrl: './login-livreur.component.html',
  styleUrls: ['./login-livreur.component.css']
})
export class LoginLivreurComponent {

  loginForm: FormGroup
  userRole: string = 'livreur';
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
    let livreur = new Livreur(data.null, data.null, data.null,data.null, data.email, data.mdp,data.null);
    if (data.email == 0 || data.mdp == 0) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
      this.service.loginLivreur(livreur).subscribe(
        res => {
          this.token = res.token;
          localStorage.setItem("myToken", res.token);
          localStorage.setItem("role", "livreur");
          this.router.navigate(['/commandeliv']).then(() => window.location.reload());
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
