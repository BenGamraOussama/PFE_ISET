import { Categorie } from "./categorie.Entity";
import { Fournisseur } from "./fournisseur.Entity";

export class Produit{
    constructor(
        public id?:number,
        public nom?:string,
        public description?:string,
        public prix?:string,
        public quantite?:string,
        public image?:string,
        public categorie?:Categorie,
        public fournisseur?:Fournisseur,

    ){}
}