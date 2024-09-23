import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject, map } from 'rxjs';
import { Client } from '../entity/client.Entity';
import { Fournisseur } from '../entity/fournisseur.Entity';
import { Contacts } from '../entity/contacts.Entity';
import { Saveproduit } from '../entity/saveProduit.Entity';
import { Route, Router } from '@angular/router';
import { Categorie } from '../entity/categorie.Entity';
import { Produit } from '../entity/produit.Entity';
import { Cartprodui } from '../entity/cartproduit.Entity';
import { Livreur } from '../entity/livreur.Entity';
import {jwtDecode} from 'jwt-decode';
import { Panier } from '../entity/panier.Entity';

export enum OperationPanier { PLUS,MOIN}

const httpOptions={
  headers:new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  facture:any;
  listALivrer:any=[]
  private _reflechPanier=new Subject<void>();
  private cartUrl ='http://localhost:8081/api/panier';
  message=""
  totalprix: Number = 0;
  totalpr: number = 0;
  public monPanier: any;
  produit:Produit[]
  get reflechPanier()
  {
    return this._reflechPanier;
  }


  apiUrl="http://localhost:8081/api"
  loginUserUrl="http://localhost:8081/api/client/login"
  loginUserUrll="http://localhost:8081/api/livreur/login"
  loginUserUrl1="http://localhost:8081/api/fournisseur/login"
  loginUserUrl2="http://localhost:8081/api/fournisseur/checkmdp"
  loginUserUrl3="http://localhost:8081/api/client/checkmdp"
  loginUserUrl4="http://localhost:8081/api/livreur/checkmdp"

  resetMdpClt="http://localhost:8081/api/client/forgotmdp"
  resetMdpFrs="http://localhost:8081/api/fournisseur/forgotmdp"

  isConnected=false;

  helper=new JwtHelperService()
  constructor(private http:HttpClient, private router:Router) { 
    this.getAllPanierWithUserId();
    this.monPanier=[] 
  }
  //crud livreur

  updateLivreur(id: number, livreur: Livreur) {
    const url = `http://localhost:8081/api/livreur/updateDetails/${id}`;
    return this.http.put<any>(url, livreur);
  }


  updatemdpliv(id:number,livreur: Livreur) {
    const url =` ${this.apiUrl+"/livreur/updateMdp"}/${id}`
    return this.http.put<any>(url, livreur);
  }
  
  checkMdpliv(livreur:Livreur){
  return this.http.post<any>(this.loginUserUrl4, livreur);
  }


  findLivreurById(id : number): Observable<Livreur> {
    const url =`${this.apiUrl + "/livreur"}/${id};`
    return this.http.get<Livreur>(url)
  }




loginLivreur(livreur:Livreur){
  return this.http.post<any>(this.loginUserUrll, livreur);
  }


  getAllMyListALivrer()
  {
    this.getAllMyListALivrerFromApi().subscribe((data)=>{
       
      this.listALivrer=data
    })
  }
  getUserInfoliv()
   {
     var token = localStorage.getItem("myToken");
     const helper = new JwtHelperService();
 
     const decodedToken = helper.decodeToken(token);
      
     // Other functions
     const expirationDate = helper.getTokenExpirationDate(token);
     const isExpired = helper.isTokenExpired(token);
     //var decoded:any = jwtDecode(token);
     var decoded:any
     return decodedToken?.data
   }
  getAllMyListALivrerFromApi()
  {
    let token = this.getUserInfoliv()
    return this.http.get<any>(this.apiUrl+"/livreur/mon-list-a-livrer/"+token.id);
  } 
//end crud livreur

//crud facture

getCommandeByIdFromApi(id:any)
  {
    return this.http.get<any>(this.apiUrl+"/get-commande-id/"+id)
  }

  getFactureByIdCommande(id:any)
  {
    this.getFactureByIdFromApi(id).subscribe((data)=>{
      console.log(data)
      this.facture=data
    })
  }
  getFactureByIdFromApi(id:number)
  {
    let rq:any={}
    rq.id=id
    return this.http.post<any>(this.apiUrl+"/facture/facture",rq);
  }
  confirmFactureByIdFromApi(id:number)
  { 
    return this.http.patch<any>(this.apiUrl+"/facture/confirme/"+id,id);
  }

//end crud facture

// crud client
addClient(client:Client)
{
return this.http.post<any>(this.apiUrl+"/client",client);
}

update1Client(id:number,client: Client) {
const url =` ${this.apiUrl+"/client"}/${id}`
return this.http.put<any>(url, client);
}

onDeleteClient(id : number){
const url =`${this.apiUrl+"/client"}/${id}` 
return this.http.delete(url)
}

getClient(): Observable<Client[]>{
return this.http.get<Client[]>(this.apiUrl + "/client");
}


loginClient(client:Client){
return this.http.post<any>(this.loginUserUrl, client);
}

resetMdpClient(client:Client){
  return this.http.post<any>(this.resetMdpClt, client);
  }

findClientById(id : number): Observable<Client> {
  const url =`${this.apiUrl + "/client"}/${id};`
  return this.http.get<Client>(url)
}

//pour recuperer le nom utilisateur
userDetails(){
  let token:any=localStorage.getItem('myToken');
  let decodeToken= this.helper.decodeToken(token);
   return decodeToken.data;
 }




  //update client
  updateClient(id: number, client: Client) {
    const url = `http://localhost:8081/api/client/updateDetails/${id}`;
    return this.http.put<any>(url, client);
  }


  updatemdpclt(id:number,client: Client) {
    const url =` ${this.apiUrl+"/client/updateMdp"}/${id}`
    return this.http.put<any>(url, client);
  }
  
  checkMdpclt(client:Client){
  return this.http.post<any>(this.loginUserUrl3, client);
  }

//end crud client


//crud cat
getCategorie(): Observable<Categorie[]>{
  return this.http.get<Categorie[]>(this.apiUrl +"/categorie");
  }

// crud fournisseur
addFournisseur(fournisseur:Fournisseur)
{
return this.http.post<any>(this.apiUrl+"/fournisseur",fournisseur);
}

updateFournisseur(id:number,fournisseur: Fournisseur) {
const url =` ${this.apiUrl+"/fournisseur/updateDetails"}/${id}`
return this.http.put<any>(url, fournisseur);
}

updatemdpfrs(id:number,fournisseur: Fournisseur) {
  const url =` ${this.apiUrl+"/fournisseur/updateMdp"}/${id}`
  return this.http.put<any>(url, fournisseur);
}

checkMdp(fournisseur:Fournisseur){
return this.http.post<any>(this.loginUserUrl2, fournisseur);
}

onDeleteFournisseur(id : number){
const url =`${this.apiUrl+"/fournisseur"}/${id}` 
return this.http.delete(url)
}

getFournisseur(): Observable<Fournisseur[]>{
return this.http.get<Fournisseur[]>(this.apiUrl + "/fournisseur");
}

loginfournisseurfromapi(fournisseur:Fournisseur){
  return this.http.post<any>(this.loginUserUrl1, fournisseur);
}
loginfournisseur(fournisseur:Fournisseur){
  this.loginfournisseurfromapi(fournisseur).subscribe((data)=>{
    console.log(data)
    var decoded:any=jwtDecode(data.token);
    console.log(decoded);
    this.loginfor(decoded.data)
  })
}
loginfor(data:any){
  localStorage.setItem("idf",data.id)
  this.isConnected=true
  this.router.navigate(['/'])
}


resetMdpFournisseur(fournisseur:Fournisseur){
  return this.http.post<any>(this.resetMdpFrs, fournisseur);
  }

  findFournisseurByEmail(email : string): Observable<Fournisseur> {
    const url =`${this.apiUrl + "/fournisseur"}/${email};`
    return this.http.get<Fournisseur>(url)
  }

  updatePasswordfrs(id: number, oldPassword: string, fournisseur: Fournisseur) {
    const url = `${this.apiUrl + "/fournisseur"}/${id}`;
    return this.http.put<any>(url, { oldPassword, fournisseur });
  }

findFournisseurById(id : number): Observable<Fournisseur> {
  const url =`${this.apiUrl + "/fournisseur"}/${id};`
  return this.http.get<Fournisseur>(url)
}
//end crud frs

  // crud contacts
addContacts(contacts:Contacts)
{
return this.http.post<any>(this.apiUrl+"/contact",contacts);
}

updateContacts(id:number,contacts: Contacts) {
const url =` ${this.apiUrl+"/contacts"}/${id}`
return this.http.put<any>(url, contacts);
}

onDeleteContacts(id : number){
const url =`${this.apiUrl+"/contacts"}/${id}` 
return this.http.delete(url)
}

getContacts(): Observable<Contacts[]>{
return this.http.get<Contacts[]>(this.apiUrl + "/contacts");
}

findContactsById(id : number): Observable<Contacts> {
  const url =`${this.apiUrl + "/contacts"}/${id};`
  return this.http.get<Contacts>(url)
}
//end crud contacts

//crud produit
addproduit(saveproduit:Saveproduit ){
  return this.http.post<any>(this.apiUrl+"/produit",saveproduit,httpOptions);
}

updateproduit(id:number,saveproduit: Saveproduit) {
  const url =` ${this.apiUrl+"/produit"}/${id}`
  return this.http.put<any>(url, saveproduit);
}

getProduit(): Observable<Produit[]>{
  return this.http.get<Produit[]>(this.apiUrl + "/produit");
  }
  findProduitById(id : number): Observable<Produit> {
    const url =`${this.apiUrl + "/produit"}/${id};`
    return this.http.get<Produit>(url)
  }
  
DeleteProduit(id : number){
  const url =`${this.apiUrl+"/produit"}/${id}` 
  return this.http.delete(url)
  }
  
//end crud produit

isLoggedIn(){
  
  let token = localStorage.getItem("myToken");

  if (token) {
      return true ;
  } else {
      return false;
  }
}    

//crud panier 

addCartProduit(produit: Cartprodui){
    let data =this.getUserInfo();
  
   let rq:any={}
   rq.idProduit=produit.id;
   console.log(produit.id);
   rq.idClient=data?.id 
   console.log(rq);
 
     return this.http.post<any>('http://localhost:8081/api/panier/add', rq)
     .pipe(
       map((data:any)=>{
          
         this._reflechPanier.next()
       })
     );
     
   }
/*bech twali ta5o id client eli connectez */

   getUserInfo()
   {
     var token = localStorage.getItem("myToken");
     const helper = new JwtHelperService();
 
     const decodedToken = helper.decodeToken(token);
      
     // Other functions
     const expirationDate = helper.getTokenExpirationDate(token);
     const isExpired = helper.isTokenExpired(token);
     //var decoded:any = jwtDecode(token);
     var decoded:any
     return decodedToken?.data
   }

   /*affichage dans panier */


   getallPanierWithUserIdFromApi(userId:number) {
    return this.http.get<any>(this.cartUrl+"/get-all-by-id-client/"+userId);
  }

  getAllPanierWithUserId()
  {

    let data =this.getUserInfo();
    this.getallPanierWithUserIdFromApi(data?.id).subscribe((data:any)=>{
       
      this.monPanier=data
      this.calculatetotal()
    },(err:any)=>{console.log(err)}) ;

  }
  
  calculatetotal() {
      
    let totalElemrentsizeproduit: number = 0;
    let totalpriceproduit: number | any = 0;
    if(this.monPanier!=undefined)
    {
      
      totalElemrentsizeproduit=this.monPanier.length
      for (let produit of this.monPanier) {
        
        totalpriceproduit += produit?.quantite * produit?.produitId?.prix ;
      }
    }
    
    
    this.totalpr = totalElemrentsizeproduit;
    this.totalprix = totalpriceproduit;
     
  }


  
 
   ajouterCommande()
   {
     this.ajouterCommandeFromApi().subscribe((data:any)=>{
       this.message='<div class="alert alert-success" role="alert">Commande créé avec succès </div>'
      
     },(err:any)=>{
       this.message='<div class="alert alert-danger" role="alert">Erreur de création commande</div>'
 
     })
     setTimeout(() => {
       this.message=""
     }, 3000);
   }
   ajouterCommandeFromApi()
   {
    let rq:any={}
    rq.idClient=this.getUserInfo()?.id
     console.log(rq);
     return this.http.post<any>(this.apiUrl+'/commande/ajouter-commande',rq ).pipe(
       map((data:any)=>{
        
         this._reflechPanier.next()
         this.router.navigate(['/payer']);
       })
     );
   } 
   deletePanierFromApi(id:Number) {
     return this.http.delete<any>(this.cartUrl+'/'+id ).pipe(
       map((data:any)=>{
        
         this._reflechPanier.next()
         window.location.reload()
       })
     );
   }
   deletePanier(id:Number)
   {
     this.deletePanierFromApi(id).subscribe(()=>{
     })
   }
   patchQttProduit(item:any,operation:OperationPanier)
   {
     this.patchQttProduitFromApi(item,operation).subscribe((data:any)=>{
       
     })
   }
   patchQttProduitFromApi(item:any,operation:OperationPanier)
   {
     
     let rq:any={}
     rq.idPanier=item?.id
     rq.operation=operation
      
     return this.http.patch<any>(this.cartUrl+'/update-qtt',rq )
    
     .pipe(
       map((data:any)=>{
        
         this._reflechPanier.next()
         window.location.reload()
       })
     );
   }

   reserverFromApi(rq:any){
    return this.http.post<any>( "http://localhost:8081/api/commande" ,rq);
  }

// end crud panier

}
