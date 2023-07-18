import { updateTextInstant, clear } from "./text.js";
import {bernoulli} from "./aleatoire.js";

async function displayBattle(pokemon1, pokemon2) {
    await updateTextInstant(["                "+pokemon2.nom, 
                             "                "+pokemon2.pvNow+"/"+pokemon2.pvMax,
                             pokemon1.nom,
                             pokemon1.pvNow+"/"+pokemon1.pvMax,
                             " ",
                             "Un "+pokemon2.nom+" sauvage apparaît !",
                             "Que doit faire "+pokemon1.nom+" ?",
                             " ",
                             "R - Attaque       T - Pokémon",
                             "F - Capture       G - Fuite",
                             "V - Estimations"])
}

function calculSensibilité(attaquant, defenseur) {
    let sensi = 1;
    
    if (attaquant.type == "W") {
        if (defenseur.type == "F" || defenseur.type == "R") {
            sensi = 2;
        } else if (defenseur.type == "G" || defenseur.type == "E") {
            sensi = 0.5;
        }
    } else if (attaquant.type == "F") {
        if (defenseur.type == "G") {
            sensi = 2;
        } else if (defenseur.type == "W" || defenseur.type == "R") {
            sensi = 0.5;
        }
    } else if (attaquant.type == "G") {
        if (defenseur.type == "W" || defenseur.type == "R") {
            sensi = 2;
        } else if (defenseur.type == "F" || defenseur.type == "E") {
            sensi = 0.5;
        }
    } else if (attaquant.type == "E") {
        if (defenseur.type == "W" || defenseur.type == "G") {
            sensi = 2;
        } else if (defenseur.type == "R") {
            sensi = 0.5;
        }
    } else if (attaquant.type == "R") {
        if (defenseur.type == "F" || defenseur.type == "E" || defenseur.type == "W") {
            sensi = 2;
        } else if (defenseur.type == "G") {
            sensi = 0.5;
        }
    }

    return sensi;
}

function getPrecision(pokemon) {
    let prc = pokemon.prc;
    let p = ((prc*90/130)+20)/100;
    return p;
}

function attaqueTouche(pokemon) {
    return bernoulli(getPrecision(pokemon));
}