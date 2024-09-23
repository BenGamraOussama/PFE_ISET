import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { LoginComponent } from './login/login.component';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { AuthGuard } from './service/auth.service';
import { HomeComponent } from './home/home.component';
import { ListfournisseurComponent } from './listfournisseur/listfournisseur.component';
import { ListlivreurComponent } from './listlivreur/listlivreur.component';
import { ListclientComponent } from './listclient/listclient.component';
import { ListcontactComponent } from './listcontact/listcontact.component';
import { ListproduitComponent } from './listproduit/listproduit.component';
import { ListcolisComponent } from './listcolis/listcolis.component';
import { AjouterlivreurComponent } from './ajouterlivreur/ajouterlivreur.component';
import { ListcategorieComponent } from './listcategorie/listcategorie.component';
import { AjoutercategorieComponent } from './ajoutercategorie/ajoutercategorie.component';
import { ResetmdpComponent } from './resetmdp/resetmdp.component';
import { ProfileComponent } from './profile/profile.component';
import { AffectationCommandeComponent } from './affectation-commande/affectation-commande.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuard]},
  { path:'ajouterAdmin',component:AjouterAdminComponent,canActivate:[AuthGuard]},
  {path:'listAdmin',component:ListAdminComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'modifierAdmin/:id',component:ModifierAdminComponent,canActivate:[AuthGuard]},
  {path:'listfournisseur',component:ListfournisseurComponent,canActivate:[AuthGuard]},
  {path:'listlivreur',component:ListlivreurComponent,canActivate:[AuthGuard]},
  {path:'listclient',component:ListclientComponent,canActivate:[AuthGuard]},
  {path:'listcontact',component:ListcontactComponent,canActivate:[AuthGuard]},
  {path:'listproduit',component:ListproduitComponent,canActivate:[AuthGuard]},
  {path:'listcolis',component:ListcolisComponent,canActivate:[AuthGuard]},
  {path:'ajouterlivreur',component:AjouterlivreurComponent,canActivate:[AuthGuard]},
  {path:'listcategorie', component:ListcategorieComponent,canActivate:[AuthGuard]},
  {path:'ajoutercategorie', component:AjoutercategorieComponent,canActivate:[AuthGuard]},
  {path:'resetmdp', component:ResetmdpComponent},
  {path:'profile/:id', component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'affcom', component:AffectationCommandeComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
