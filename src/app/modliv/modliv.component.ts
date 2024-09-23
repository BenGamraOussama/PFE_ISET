import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Livreur } from '../entity/livreur.Entity';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modliv',
  templateUrl: './modliv.component.html',
  styleUrls: ['./modliv.component.css']
})
export class ModlivComponent {
 
      updateForm: FormGroup;
      updatePasswordForm: FormGroup;
      userRole: string | null;
      id: number;
      token: string | null = null;
  
      constructor(
          private fb: FormBuilder,
          private service: CrudService,
          private route: Router,
          private router: ActivatedRoute,
          private toast: NgToastService
      ) {
          this.token = localStorage.getItem('myToken');
          let formControls = {
              nom: new FormControl('', [
                  Validators.required,
              ]),
              prenom: new FormControl('', [
                  Validators.required,
              ]),
              telephone: new FormControl('', [
                  Validators.required,
              ]),
              email: new FormControl('', [
                  Validators.required,
                  Validators.email
              ]),
              mdp: new FormControl('', [
                  Validators.required,
              ]),
              adresse: new FormControl('', [
                Validators.required,
            ])
          }
  
          this.updateForm = this.fb.group(formControls);
  
          this.updatePasswordForm = this.fb.group({
              email: new FormControl('', [Validators.required, Validators.email]),
              mdp: new FormControl('', [Validators.required]),          
              newmdp: new FormControl('', [Validators.required]),
              confmdp: new FormControl('', [Validators.required]),
          });
      }
  
      get nom() { return this.updateForm.get('nom'); }
      get prenom() { return this.updateForm.get('prenom'); }
      get telephone() { return this.updateForm.get('telephone'); }
      get email() { return this.updatePasswordForm.get('email'); }
      get mdp() { return this.updatePasswordForm.get('mdp'); }
      get adresse() { return this.updateForm.get('adresse'); }
      get newmdp() { return this.updatePasswordForm.get('newmdp'); }
      get confmdp() { return this.updatePasswordForm.get('confmdp'); }
  
      ngOnInit(): void {
          const storedUserRole = localStorage.getItem('role');
          if (storedUserRole) {
              this.userRole = storedUserRole;
          }
  
          let idEvent = this.router.snapshot.params['id'];
          this.id = idEvent;
          this.service.findLivreurById(idEvent).subscribe((result) => {
              let event = result;
              console.log(event);
              this.updateForm.patchValue({
                  nom: event.nom,
                  prenom: event.prenom,
                  telephone: event.telephone,
                  adresse: event.adresse,
              });
              this.updatePasswordForm.patchValue({
                email: event.email,
            });
        });
    }
  
    cancel() {
      this.route.navigate(['/listproduit']);
    }
  
      updateLivreur() {
          let data = this.updateForm.value;
          let model: Livreur = new Livreur();
          model.id = null;
          model.nom = data.nom;
          model.prenom = data.prenom;
          model.telephone = data.telephone;
          model.adresse = data.adresse;
  
          console.log(model);
          console.log(data);
          this.service.updateLivreur(this.id, model).subscribe(
              res => {
                  console.log(res);
              });
      }
  
  
      updateMdp() {
          let passwordData = this.updatePasswordForm.value;
          let livreur = new Livreur(null, null, null, null, passwordData.email, passwordData.mdp, null);
  
          if (passwordData.email === '' || passwordData.mdp === '' || passwordData.newmdp === '' || passwordData.confmdp === '' || passwordData.mdp === passwordData.newmdp) {
              this.toast.info({
                  detail: 'Veuillez remplir tous les champs.',
                  summary: 'Erreur',
              });
              return;
          }
  
          if (passwordData.newmdp !== passwordData.confmdp) {
              this.toast.info({
                  detail: 'Les nouveaux mots de passe ne correspondent pas.',
                  summary: 'Erreur',
              });
              return;
          }
  
          this.service.checkMdpliv(livreur).subscribe(
              () => {
                  let newMdp = passwordData.newmdp;
                  let model: Livreur = { id: this.id, nom: this.updateForm.value.nom, prenom: this.updateForm.value.prenom, telephone: this.updateForm.value.telephone, email: this.updatePasswordForm.value.email, mdp: this.updatePasswordForm.value.newmdp, adresse: this.updateForm.value.adresse };
  
                  this.service.updatemdpliv(this.id, model).subscribe(
                      res => {
                          console.log(res);
                          this.toast.success({
                              detail: 'Mot de passe mis à jour avec succès.',
                              summary: 'Succès',
                          });
                          // Optionally, you can navigate to a different route or perform any other action upon successful password update
                      },
                      err => {
                          console.error(err);
                          this.toast.error({
                              detail: 'Une erreur s\'est produite lors de la mise à jour du mot de passe.',
                              summary: 'Erreur',
                          });
                      }
                  );
              },
              err => {
                  console.error(err);
                  this.toast.error({
                      detail: 'Mot de passe incorrect.',
                      summary: 'Erreur',
                  });
              }
          );
      }
  }
  
