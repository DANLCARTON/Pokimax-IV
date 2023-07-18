import { updateTextInstant, clear, updateText, wait } from "./text.js";
import {bernoulli} from "./aleatoire.js";
import hotkeys from "hotkeys-js";
import { getParam } from "./intro.js";

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

async function battleAttaque(pokemon, foe) {
    if (attaqueTouche(pokemon)) {
        let sensi = calculSensibilité(pokemon, foe);
        let degats = Math.floor(((27*Pokemon.atk)/foe.def)*sensi);

        let efficacite = "";
        if (sensi == 2) efficacite = "C'est super efficace !!"
        else if (sensi == 0.5) efficacite = "Ce n'est pas très efficace...";

        await updateText([pokemon.nom+"attaque !", 
                          efficacite, 
                          foe.nom+" perd "+degats+" PV !!"], 20);
        await wait(4360);
        foe.pvNow -= degats;
    } else {
        updateText([foe.nom+" a esquivé l'attaque !!"], 20)
        await wait(2660);
    }
    return foe.pvNow;
}

async function alertTeamText(pokemonTeam) {
    let no = 0;
    let text = ""
    for (pokemon of pokemonTeam) {
        text += no+" • "+pokemon.nom+"   ";
        ++no;
    }
    return text
}

function battleChangePokemon(pokemonTeam) {

}

function battleCaptureChangePokemon(pokemonTeam, foe) {

}



async function battleKOChangePokemon(pokemonTeam) {
    let choix = getParam(alertTeamText(pokemonTeam));
    let CHOIXOK = false;
    if (choix > 5) {
        CHOIXOK = false;
    } else if (choix <= 5 && choix != 0 && pokemonTeam[choix].nom != "VIDE" && pokemonTeam[choix].pvNow > 0) {
        let res = pokemonTeam[0];
        pokemonTeam[0] = pokemonTeam[choix];
        pokemonTeam[choix] = res;
        CHOIXOK = true;
    } else if (choix == 0 || pokemonTeam[choix].pvNow <= 0) {
        await updateText([pokemonTeam[choix].nom+" ne peut plus se battre !"], 20)
        await wait(2980);
        CHOIXOK = false;
    }
    if (!CHOIXOK) await battleKOChangePokemon(pokemonTeam);
}

function battleCapture(pokemonTeam, foe, id) {

}

async function alertRare(foe) {
    if (foe.rare == 1) {
        await updateText(["Vous allez rencontrer un Pokémon très rare !!"], 20);
        await wait(2840);
    } else if (foe.rare == 2) {
        await updateText(["Vous allez rencontrer un Pokémon rare !"], 20);
        await wait(2840);
    }
}   

async function battleStart(pokemonTeam, foe, id) {
    clear();
    await alertRare(foe);
    await displayBattle(pokemonTeam[0], foe);

    let ACTION = true;
    let CAPTURE = false;
    let NOKO = true; 

    hotkeys("r", async function(event, handler) {
        foe.pvNow = await battleAttaque(pokemonTeam[0], foe);
        if (foe.pvNow <= 0) {
            clear();
            await updateText([foe.nom+" est KO !"], 20)
            ACTION = false;
        }
        if (ACTION) {
            pokemonTeam[0].pvNow = await battleAttaque(foe, pokemonTeam[0]);
            if (pokemonTeam[0].pvNow <= 0) {
                for(pokemon of pokemonTeam) {
                    if (pokemon.pvNow > 0) {
                        NOKO = true;
                        break;
                    } else if (pokemon.pvNow <= 0) {
                        NOKO = true;
                    }
                }
                if (NOKO) {
                    clear();
                    await updateText([pokemonTeam[0].nom+" est KO, quel Pokémon doit le remplacer ?"], 20)
                    await wait(3220);
                    await battleKOChangePokemon(pokemonTeam);
                } else {
                    ACTION = false;
                }
            }
        } else return;
    })
}

export {battleStart}