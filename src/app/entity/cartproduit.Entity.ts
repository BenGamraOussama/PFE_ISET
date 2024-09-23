import { Categorie } from "./categorie.Entity";
import { Fournisseur } from "./fournisseur.Entity";
import { Produit } from "./produit.Entity";

export class Cartprodui{
    public id?:number
    public nom?:string
    public description?:string
    public prix?:string
    public quantite?:number
    public image?:string
    public categorie?:Categorie
    public fournisseur?:Fournisseur
    
    constructor(produit:Produit){
        this.id=produit.id;
        this.nom=produit.nom;
        this.description=produit.description;
        this.prix=produit.prix;
        this.quantite=produit.quantite;
        this.image=produit.image;
        this.categorie=produit.categorie;
        this.fournisseur=produit.fournisseur;
    }

}