import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Saveproduit } from '../entity/saveProduit.Entity';
import { Categorie } from '../entity/categorie.Entity';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent implements OnInit {
  id: number;
  updateForm: FormGroup;
  messageCommande = "";
  message=""
  imagePath:any
  userFile: any;
  imgURL: any;
  listcategorie: Categorie[];

  constructor(
    private services: CrudService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      quantite: ['', Validators.required],
      image: ['', Validators.required],
      categorie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.services.findProduitById(this.id).subscribe((result) => {
      let event = result;
      this.updateForm.patchValue({
        nom: event.nom,
        description: event.description,
        prix: event.prix,
        quantite: event.quantite,
        image: event.image,
        categorie: event.categorie.id
      });
    });
    this.services.getCategorie().subscribe(categories => {
      this.listcategorie = categories;
    });

    
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  cancel() {
    this.route.navigate(['/listproduit']);
  }

  updateProduit() {
    let data = this.updateForm.value;
    let datas = this.services.userDetails();
    let model: Saveproduit = {
      id: this.id,
      nom: data.nom,
      description: data.description,
      prix: data.prix,
      quantite: data.quantite,
      image: this.imgURL, 
      idCategorie: data.categorie,
      idFournisseur: datas?.id
    };
  
    if (!this.id) {
      this.services.addproduit(model).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
            Produit ajouté avec succès.
          </div>`;
          this.route.navigate(['/listproduit']);
        },
        err => {
          this.messageCommande = `<div class="alert alert-warning" role="alert">
            Erreur lors de l'ajout du produit.
          </div>`;
        }
      );
    } else {
      // If ID is present, it's an edit operation
      this.services.updateproduit(this.id, model).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
            Produit mis à jour avec succès.
          </div>`;
          this.route.navigate(['/listproduit']);
        },
        err => {
          this.messageCommande = `<div class="alert alert-warning" role="alert">
            Erreur lors de la mise à jour du produit.
          </div>`;
        }
      );
    }
  }
  
}
