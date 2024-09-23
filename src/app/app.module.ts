import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouterAdminComponent } from './ajouter-admin/ajouter-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ModifierAdminComponent } from './modifier-admin/modifier-admin.component';
import { HomeComponent } from './home/home.component';
import { ListclientComponent } from './listclient/listclient.component';
import { ListcolisComponent } from './listcolis/listcolis.component';
import { ListcontactComponent } from './listcontact/listcontact.component';
import { ListfournisseurComponent } from './listfournisseur/listfournisseur.component';
import { ListlivreurComponent } from './listlivreur/listlivreur.component';
import { ListproduitComponent } from './listproduit/listproduit.component';
import { AjouterlivreurComponent } from './ajouterlivreur/ajouterlivreur.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AffectationCommandeComponent } from './affectation-commande/affectation-commande.component';
import { AjoutercategorieComponent } from './ajoutercategorie/ajoutercategorie.component';
import { ListcategorieComponent } from './listcategorie/listcategorie.component';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetmdpComponent } from './resetmdp/resetmdp.component';

@NgModule({
  declarations: [
    AppComponent,
    AjouterAdminComponent,
    ListAdminComponent,
    LoginComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ModifierAdminComponent,
    HomeComponent,
    ListclientComponent,
    ListcolisComponent,
    ListcontactComponent,
    ListfournisseurComponent,
    ListlivreurComponent,
    ListproduitComponent,
    AjouterlivreurComponent,
    AffectationCommandeComponent,
    AjoutercategorieComponent,
    ListcategorieComponent,
    ListCommandeComponent,
    ProfileComponent,
    ResetmdpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
