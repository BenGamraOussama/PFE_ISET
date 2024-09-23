import { Client } from "./client.Entity";

export class Commande{
    constructor(
        public id?:number,
        public client?:Client,
        public livred?:number,
    ){}}