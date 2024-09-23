import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProduitsComponent } from './produits/produits.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { LoginfournisseurComponent } from './loginfournisseur/loginfournisseur.component';
import { RegisterclientComponent } from './registerclient/registerclient.component';
import { RegisterfournisseurComponent } from './registerfournisseur/registerfournisseur.component';
import { ResetmdpcltComponent } from './resetmdpclt/resetmdpclt.component';
import { ResetmdpfrsComponent } from './resetmdpfrs/resetmdpfrs.component';
import { ListproduitComponent } from './listproduit/listproduit.component';
import { AjouterproduitComponent } from './ajouterproduit/ajouterproduit.component';
import { MenufrsComponent } from './menufrs/menufrs.component';
import { EspfrsComponent } from './espfrs/espfrs.component';
import { PanierComponent } from './panier/panier.component';
import { PanierlComponent } from './panierl/panierl.component';
import { PaniercComponent } from './panierc/panierc.component';
import { ModfrsComponent } from './modfrs/modfrs.component';
import { ModcltComponent } from './modclt/modclt.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { PaiementComponent } from './paiement/paiement.component';
import { LoginLivreurComponent } from './login-livreur/login-livreur.component';
import { CommandeLivreurComponent } from './commande-livreur/commande-livreur.component';
import { EsplivComponent } from './espliv/espliv.component';
import { FactureComponent } from './facture/facture.component';
import { MenucltComponent } from './menuclt/menuclt.component';
import { MenulivComponent } from './menuliv/menuliv.component';
import { ModlivComponent } from './modliv/modliv.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashcltComponent } from './dashclt/dashclt.component';
import { DashlivComponent } from './dashliv/dashliv.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { QRCodeModule } from 'angular2-qrcode';
import { EspclComponent } from './espcl/espcl.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    ProduitsComponent,
    HeaderComponent,
    FooterComponent,

    LoginclientComponent,
    LoginfournisseurComponent,
    RegisterclientComponent,
    RegisterfournisseurComponent,
    ResetmdpcltComponent,
    ResetmdpfrsComponent,
    ListproduitComponent,
    AjouterproduitComponent,
    MenufrsComponent,
    EspfrsComponent,
    PanierComponent,
    PanierlComponent,
    PaniercComponent,
    ModfrsComponent,
    ModcltComponent,
    ModifierProduitComponent,
    PaiementComponent,
    LoginLivreurComponent,
    CommandeLivreurComponent,
    EsplivComponent,
    FactureComponent,
    MenucltComponent,
    MenulivComponent,
    ModlivComponent,
    DashboardComponent,
    DashcltComponent,
    DashlivComponent,
    QuickViewComponent,
    EspclComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    QRCodeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
