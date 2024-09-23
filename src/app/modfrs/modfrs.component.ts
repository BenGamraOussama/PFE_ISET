import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Fournisseur } from '../entity/fournisseur.Entity';
import { CrudService } from '../service/crud.service';

@Component({
    selector: 'app-modfrs',
    templateUrl: './modfrs.component.html',
    styleUrls: ['./modfrs.component.css']
})
export class ModfrsComponent implements OnInit {
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
    get newmdp() { return this.updatePasswordForm.get('newmdp'); }
    get confmdp() { return this.updatePasswordForm.get('confmdp'); }

    ngOnInit(): void {
        const storedUserRole = localStorage.getItem('role');
        if (storedUserRole) {
            this.userRole = storedUserRole;
        }

        let idEvent = this.router.snapshot.params['id'];
        this.id = idEvent;
        this.service.findFournisseurById(idEvent).subscribe((result) => {
            let event = result;
            console.log(event);
            this.updateForm.patchValue({
                nom: event.nom,
                prenom: event.prenom,
                telephone: event.telephone,
            });
            this.updatePasswordForm.patchValue({
                email: event.email,
            });
        });
    }

    updateFournisseur() {
        let data = this.updateForm.value;
        let model: Fournisseur = new Fournisseur();
        model.id = null;
        model.nom = data.nom;
        model.prenom = data.prenom;
        model.telephone = data.telephone;

        console.log(model);
        console.log(data);
        this.service.updateFournisseur(this.id, model).subscribe(
            res => {
                console.log(res);
            });
    }


    updateMdp() {
      let passwordData = this.updatePasswordForm.value;
      let fournisseur = new Fournisseur(null, null, null, null, passwordData.email, passwordData.mdp);
  
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
  
      this.service.checkMdp(fournisseur).subscribe(
          () => {
              let newMdp = passwordData.newmdp;
              let model: Fournisseur = { id: this.id, nom: this.updateForm.value.nom, prenom: this.updateForm.value.prenom, telephone: this.updateForm.value.telephone, email: this.updatePasswordForm.value.email, mdp: this.updatePasswordForm.value.newmdp };
  
              this.service.updatemdpfrs(this.id, model).subscribe(
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
  
  cancel() {
    this.route.navigate(['/listproduit']);
  }

}
