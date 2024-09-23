import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Entity/admin.Entity';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Fournisseur } from '../Entity/fournisseur.Entity';
import { Contact } from '../Entity/contact.Entity';
import { Livreur } from '../Entity/livreur.Entity';
import { Categorie } from '../Entity/categorie.Entity';
import { Client } from '../Entity/client.Entity';
import { CommandeProduit } from '../Entity/commadeProduitEntity';
import { Produit } from '../Entity/produit.Entity';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  apiUrl="http://localhost:8081/api"
  loginUserUrl="http://localhost:8081/api/admin/login"
  resetMdp="http://localhost:8081/api/admin/forgotmdp"
  helper=new JwtHelperService()
  listALivrer: any;
  constructor(private http:HttpClient) { }

  // crud admin

  updateAdminR(id: number, admin: Admin) {
    const url = ` ${this.apiUrl+"/admin/updateRole"}/${id}`;
    return this.http.put<any>(url, admin);
  }

  updateAdmin(id: number, admin: Admin) {
    const url = ` ${this.apiUrl+"/admin/updateDetails"}/${id}`;
    return this.http.put<any>(url, admin);
  }


  updatemdpad(id:number,admin: Admin) {
    const url =` ${this.apiUrl+"/admin/updateMdp"}/${id}`
    return this.http.put<any>(url, admin);
  }
  
  checkMdpad(admin:Admin){
    const url =` ${this.apiUrl+"/admin/checkmdp"}`
    return this.http.post<any>(url, admin);
  }


  findAdminById(id : number): Observable<Admin> {
    const url =`${this.apiUrl + "/admin"}/${id};`
    return this.http.get<Admin>(url)
  }

  addAdmin(admin:Admin)
   {
    return this.http.post<any>(this.apiUrl+"/admin",admin);
   }

   onDeleteAdmin(id : number){
    const url =`${this.apiUrl+"/admin"}/${id}` 
    return this.http.delete(url)
  }

  getAdmin(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.apiUrl + "/admin");
  }

  loginAdmin(admin:Admin){
    return this.http.post<any>(this.loginUserUrl, admin);
  }
  resetMdpAdmin(admin:Admin){
    return this.http.post<any>(this.resetMdp, admin);
    }
  //crud livreur
  addLivreur(livreur:Livreur)
  {
   return this.http.post<any>(this.apiUrl+"/livreur",livreur);
  }

  onDeleteLivreur(id : number){
    const url =`${this.apiUrl+"/livreur"}/${id}` 
    return this.http.delete(url)
  }

  getLivreur(): Observable<Livreur[]>{
    return this.http.get<Livreur[]>(this.apiUrl + "/livreur");
  }


  //crud client
  addClient(client:Client)
  {
   return this.http.post<any>(this.apiUrl+"/client",client);
  }

  onDeleteClient(id : number){
    const url =`${this.apiUrl+"/client"}/${id}` 
    return this.http.delete(url)
  }

  getClient(): Observable<Client[]>{
    return this.http.get<Client[]>(this.apiUrl + "/client");
  }


  //crud fournisseur
  addFournisseur(fournisseur:Fournisseur)
  {
  return this.http.post<any>(this.apiUrl+"/fournisseur",fournisseur);
  }

  updateFournisseur(id:number,fournisseur: Fournisseur) {
    const url =` ${this.apiUrl+"/fournisseur"}/${id}`
    return this.http.put<any>(url, fournisseur);
  }
  
  onDeleteFournisseur(id : number){
    const url =`${this.apiUrl+"/fournisseur"}/${id}` 
    return this.http.delete(url)
  }
  
  getFournisseur(): Observable<Fournisseur[]>{
    return this.http.get<Fournisseur[]>(this.apiUrl + "/fournisseur");
  }

  //crud Produit
  onDeleteProduit(id : number){
    const url =`${this.apiUrl+"/produit"}/${id}` 
    return this.http.delete(url)
  }

  getProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>(this.apiUrl + "/produit");
  }
   //crud Contact
   
   onDeleteContact(id : number){
     const url =`${this.apiUrl+"/contact"}/${id}` 
     return this.http.delete(url)
   }
   
   getContact(): Observable<Contact[]>{
     return this.http.get<Contact[]>(this.apiUrl + "/contact");
   }

   // crud categorie
  addCategorie(categorie:Categorie)
  {
   return this.http.post<any>(this.apiUrl+"/categorie",categorie);
  }

  updateCategorie(id:number,categorie: Categorie) {
   const url =` ${this.apiUrl+"/categorie"}/${id}`
   return this.http.put<any>(url, categorie);
 }
  onDeleteCategorie(id : number){
   const url =`${this.apiUrl+"/categorie"}/${id}` 
   return this.http.delete(url)
 }
 getCategorie(): Observable<Categorie[]>{
   return this.http.get<Categorie[]>(this.apiUrl + "/categorie");
 }
//crud commande
getCommande() {
  return this.http.get<any>(this.apiUrl + "/commande/not-livred")
}
addAffect(rq:any) : Observable<any[]> {
  return this.http.post<any[]>(this.apiUrl + "/affectation/add" ,rq)
}
    //afficherCommandeProduit
    
    getCommandeProduit():Observable<CommandeProduit[]>{
      return this.http.get<CommandeProduit[]>(this.apiUrl+"/cmdmat")
    }
    
//end crud commande
  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }

  userDetails(){
    let token:any=localStorage.getItem('myToken');
    let decodeToken= this.helper.decodeToken(token);
     return decodeToken.data;
   }
}
