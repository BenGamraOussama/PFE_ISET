import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { ProduitsComponent } from './produits/produits.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { LoginfournisseurComponent } from './loginfournisseur/loginfournisseur.component';
import { RegisterclientComponent } from './registerclient/registerclient.component';
import { RegisterfournisseurComponent } from './registerfournisseur/registerfournisseur.component';
import { ResetmdpcltComponent } from './resetmdpclt/resetmdpclt.component';
import { ResetmdpfrsComponent } from './resetmdpfrs/resetmdpfrs.component';
import { ListproduitComponent } from './listproduit/listproduit.component';
import { AjouterproduitComponent } from './ajouterproduit/ajouterproduit.component';
import { EspfrsComponent } from './espfrs/espfrs.component';
import { PanierComponent } from './panier/panier.component';
import { PanierlComponent } from './panierl/panierl.component';
import { PaniercComponent } from './panierc/panierc.component';
import { ModcltComponent } from './modclt/modclt.component';
import { ModfrsComponent } from './modfrs/modfrs.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { PaiementComponent } from './paiement/paiement.component';
import { LoginLivreurComponent } from './login-livreur/login-livreur.component';
import { CommandeLivreurComponent } from './commande-livreur/commande-livreur.component';
import { EsplivComponent } from './espliv/espliv.component';
import { FactureComponent } from './facture/facture.component';
import { ModlivComponent } from './modliv/modliv.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { EspclComponent } from './espcl/espcl.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'contacts', component:ContactsComponent},
  {path:'about', component:AboutComponent},
  {path:'produit', component:ProduitsComponent},
  {path:'loginclient', component:LoginclientComponent},
  {path:'registerclient', component:RegisterclientComponent},
  {path:'loginfournisseur', component:LoginfournisseurComponent},
  {path:'registerfournisseur', component:RegisterfournisseurComponent},
  {path:'loginlivreur', component:LoginLivreurComponent},
  {path:'resetmdpclt', component:ResetmdpcltComponent},
  {path:'resetmdpfrs', component:ResetmdpfrsComponent},
  {path:'ajouterproduit', component:AjouterproduitComponent},
  {path:'listproduit', component:ListproduitComponent},
  {path:'espacefrs', component:EspfrsComponent},
  {path:'espaceliv', component:EsplivComponent},
  {path:'espacecl', component:EspclComponent},

  {path:'panier', component:PanierComponent},
  {path:'panierl', component:PanierlComponent},
  {path:'panierc', component:PaniercComponent},
  {path:'commandeliv', component:CommandeLivreurComponent},
  {path:'facture/:id', component:FactureComponent},

  {path:'dashboard', component:DashboardComponent},
  {path:'paiement', component:PaiementComponent},

  {path:'modclt/:id', component:ModcltComponent},
  {path:'modfrs/:id', component:ModfrsComponent},
  {path:'modliv/:id', component:ModlivComponent},
  {path:'modifierproduit/:id', component:ModifierProduitComponent},
  {path:'qv/:id', component:QuickViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
