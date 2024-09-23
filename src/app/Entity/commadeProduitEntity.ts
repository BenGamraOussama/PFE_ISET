import { Commande } from "./commandeEntity";
import { Produit } from "./produit.Entity";

export class CommandeProduit{
    constructor(
        public id?:number,
        public nom?:string,
        public produit?:Produit,
        public quantite?:number,
        public commande?:Commande,

    ){}}