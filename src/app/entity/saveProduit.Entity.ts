

export class Saveproduit {
    constructor (
        public id?: number,
        public nom?: string,
        public description?: string,
        public prix?: string,
        public quantite?: number,
        public image?: string,
        public idCategorie?: number,
        public idFournisseur?: number,
    ){}
}