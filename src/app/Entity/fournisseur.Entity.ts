export class Fournisseur {
    constructor (
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public telephone?: string,
        public email?: string,
        public mdp?: string,
        public etat?: boolean,
    ){}
}