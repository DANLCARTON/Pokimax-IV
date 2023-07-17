class Pokemon {
    constructor(nom, type, pvMax, pvNow, atk, def, taux, prc, rare) {
        this.nom = nom;
        this.type = type;
        this.pvMax = pvMax;
        this.pvNow = pvNow;
        this.atk = atk;
        this.def = def;
        this.taux = taux;
        this.prc = prc;
        this.rare = rare;
    }

    getTypeName() {
        switch (this.type) {
            case ("E"):
                return "Electrik";
                break;
            case ("N"):
                return "Normal";
                break;
            case ("W"):
                return "Eau";
                break;
            case ("R"):
                return "Roche";
                break;
            case ("F"):
                return "Feu";
                break;
            case ("G"):
                return "Plante";
                break;
        }
    }
}

export {Pokemon};