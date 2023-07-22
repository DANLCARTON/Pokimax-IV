import { updateTextInstant, clear, updateText, wait } from "./text.js";
import {bernoulli, binomiale, essaisGeometrique, uniforme} from "./aleatoire.js";
import hotkeys from "hotkeys-js";
import { getParam } from "./intro.js";

let isEventRegistered_R = false;

function removeHotkeys(handler) {
    for (const key in hotkeys._downKeys) {
        const handlers = hotkeys._downKeys[key];
        const index = handlers.indexOf(handler);
        if (index !== -1) {
            handlers.splice(index, 1);
        }
    }
}

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
        let degats = Math.floor(((27*pokemon.atk)/foe.def)*sensi);

        let efficacite = "";
        if (sensi == 2) efficacite = "C'est super efficace !!"
        else if (sensi == 0.5) efficacite = "Ce n'est pas très efficace...";

        await updateText(["",
                          pokemon.nom+" attaque !", 
                          efficacite, 
                          foe.nom+" perd "+degats+" PV !!"], 20);
        await wait(3860);
        foe.pvNow -= degats;
    } else {
        updateText(["",
                    pokemon.nom+" attaque !",
                    foe.nom+" a esquivé l'attaque !!"], 20)
        await wait(2660);
    }
    return foe.pvNow;
}

function alertTeamText(pokemonTeam) {
    let no = 0;
    let text = ""
    for (let pokemon of pokemonTeam) {
        text += no+" • "+pokemon.nom+"   ";
        ++no;
    }
    console.log(text);
    return text
}

async function battleChangePokemon(pokemonTeam) {
    let alertText = alertTeamText(pokemonTeam);
    let choix = await getParam(alertText);
    choix = parseInt(choix);
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
    if (!CHOIXOK) battleChangePokemon(pokemonTeam);
}

async function battleCaptureChangePokemon(pokemonTeam, foe) {
    let alertText = alertTeamText(pokemonTeam);
    alertText += "   6 • "+foe.nom;
    console.log(alertText);
    let choix = await getParam(alertText);
    choix = parseInt(choix);
    let CHOIXOK = false;
    console.log("battle Capture Change Pokémon - pokemonTeam : ", pokemonTeam)
    console.log("battle Capture Change Pokemon - choix : ", choix);
    if (choix > 6) {
        CHOIXOK = false;
    } else if (choix <= 5) {
        pokemonTeam[choix] = foe
        CHOIXOK = true;
    } else if (choix == 6) {
        CHOIXOK = true;
    }
    if (!CHOIXOK) await battleCaptureChangePokemon(pokemonTeam, foe);
}

async function battleKOChangePokemon(pokemonTeam) {
    let alertText = alertTeamText(pokemonTeam);
    console.log(alertText);
    let choix = await getParam(alertText);
    choix = parseInt(choix);
    let CHOIXOK = false;
    console.log("battle KO Change Pokémon - pokemonTeam : ", pokemonTeam)
    console.log("battle KO Change Pokemon - choix : ", choix);
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

async function battleCapture(pokemonTeam, foe, id) {
    let pvRatio = (foe.pvNow-1)/foe.pvMax;
    let rate1 = binomiale(id, 1, 4)*(foe.taux/2)*(1-(pvRatio))*100;
    let rate2 = binomiale(id, 2, 4)*(foe.taux/2)*(1-(pvRatio))*100;
    let rate3 = binomiale(id, 3, 4)*(foe.taux/2)*(1-(pvRatio))*100;
    let rate4 = binomiale(id, 4, 4)*(foe.taux/2)*(1-(pvRatio))*10000000000;
    let textToDisplay = ["", "", "", ""];
    let lancer = uniforme()*100;
    let success = false;

    console.log("battle capture - rate1 : ", rate1);
    console.log("battle capture - rate2 : ", rate2);
    console.log("battle capture - rate3 : ", rate3);
    console.log("battle capture - rate4 : ", rate4);
    console.log("battle capture - lancer : ", lancer);

    if (lancer <= rate1) textToDisplay[0] = "......";
    if (lancer <= rate2) textToDisplay[1] = "........."
    if (lancer <= rate3) textToDisplay[2] = "............"
    if (lancer <= rate4) {
        textToDisplay[3] = "Bravo ! "+foe.nom+" à été capturé !";
        success = true;
    } else {
        textToDisplay[3] = "Aaaahh... "+foe.nom+" s'est libéré.";
        success = false;
    }
    clear();
    await updateText(textToDisplay, 40);
    await wait(4600);

    if (success) {
        let teamManaged = false;
        let i = 1;
        while(!teamManaged) {
            if (i > 5) {
                clear();
                await updateText(["Votre équipe ne peux pas contenir plus de 6 Pokémon.", "Quel Pokémon voulez-vous libérer ?"], 40);
                await wait(4600);
                await battleCaptureChangePokemon(pokemonTeam, foe)
                teamManaged = true;
            } else if (pokemonTeam[i].nom == "VIDE") {
                pokemonTeam[i] = foe;
                teamManaged = true;
            }
            ++i;
        }
    }

    return success;
}

async function alertRare(foe) {
    clear();
    if (foe.rare == 1) {
        await updateText(["Vous allez rencontrer un Pokémon très rare !!"], 20);
        await wait(2840);
    } else if (foe.rare == 2) {
        await updateText(["Vous allez rencontrer un Pokémon rare !"], 20);
        await wait(2840);
    }
}   

function verifKO(pokemonTeam) {
    console.log("verif KO - pokemonTeam", pokemonTeam)
    if (pokemonTeam[0].pvNow <= 0) {
        for (const pokemon of pokemonTeam) {
            console.log("verif KO - pokemon of pokemonTeam pvNow", pokemon.pvNow)
            if (pokemon.pvNow > 0) {
                return false;
            }
        }
        return true;
    }
    return false;
}

async function battleStart(pokemonTeam, foe, id) {
    clear();
    await alertRare(foe);
    clear();
    await displayBattle(pokemonTeam[0], foe);

    let ACTION = true;
    let CAPTURE = false;
    let KO = false;

    async function handleEvent(event) {
        console.log("event.key", event.key)
        if (event.key == "r") { // - - - - - - - - - - - - ATTAQUE - - - - - - - - - - - -
            clear();
            foe.pvNow = await battleAttaque(pokemonTeam[0], foe);
            if (foe.pvNow <= 0) {
                clear();
                await updateText([foe.nom + " est KO !"], 20)
                await wait(1420);
                ACTION = false;
            }

            if (ACTION) {
                pokemonTeam[0].pvNow = await battleAttaque(foe, pokemonTeam[0]);
                
                KO = verifKO(pokemonTeam);

                console.log("battle Start → handleEvent - KO", KO)

                if (pokemonTeam[0].pvNow <= 0 && !KO) {
                    clear();
                    await updateText([pokemonTeam[0].nom + " est KO, quel Pokémon doit le remplacer ?"], 20)
                    await wait(3220);
                    await battleKOChangePokemon(pokemonTeam);
                } 
                
                if (KO) {
                    ACTION = false;
                    // ajouter genre on coupe le jeu
                }
            }

            clear();
            await displayBattle(pokemonTeam[0], foe);
        }



        else if (event.key == "f") {// - - - - - - - - - - - - CAPTURE - - - - - - - - - - - -
            CAPTURE = await battleCapture(pokemonTeam, foe, id);
            if (CAPTURE) {
                ACTION = false;
            } else {
                pokemonTeam[0].pvNow = await battleAttaque(foe, pokemonTeam[0]);
                
                KO = verifKO(pokemonTeam);

                console.log("battle Start → handleEvent - KO", KO)

                if (pokemonTeam[0].pvNow <= 0 && !KO) {
                    clear();
                    await updateText([pokemonTeam[0].nom + " est KO, quel Pokémon doit le remplacer ?"], 20)
                    await wait(3220);
                    await battleKOChangePokemon(pokemonTeam);
                } 
                
                if (KO) {
                    ACTION = false;
                    // ajouter genre on coupe le jeu
                }
            }

            clear();
            await displayBattle(pokemonTeam[0], foe);

        }



        else if (event.key == "t") {// - - - - - - - - - - - - ÉQUIPE - - - - - - - - - - - -
            clear();
            await updateText(["Quel Pokémon doit remplacer "+pokemonTeam[0].nom+" ?"], 40)
            await wait(4080);
            await battleChangePokemon(pokemonTeam);

            pokemonTeam[0].pvNow = await battleAttaque(foe, pokemonTeam[0]);
                
            KO = verifKO(pokemonTeam);

            console.log("battle Start → handleEvent - KO", KO)

            if (pokemonTeam[0].pvNow <= 0 && !KO) {
                clear();
                await updateText([pokemonTeam[0].nom + " est KO, quel Pokémon doit le remplacer ?"], 20)
                await wait(3220);
                await battleKOChangePokemon(pokemonTeam);
            } 
            
            if (KO) {
                ACTION = false;
                // ajouter genre on coupe le jeu
            }

            clear();
            await displayBattle(pokemonTeam[0], foe);
        }



        else if (event.key == "g") {// - - - - - - - - - - - - FUITE - - - - - - - - - - - -
            clear();
            await updateText(["Vous prenez la fuite !"], 40);
            await wait(2920);
            ACTION = false;
        }



        else if (event.key == "v") { // - - - - - - - - - - - ESTIMATIONS - - - - - - - - - - - 
            clear();
            let estimations = ["Voici quelques estimations pour le tour à venir."];
            estimations.push("      - - - ATTAQUE - - -");

            let sensiFoe = calculSensibilité(pokemonTeam[0], foe);
            let sensiPokemon = calculSensibilité(foe, pokemonTeam[0]);
            let prcFoe = getPrecision(foe);
            let prcPokemon = getPrecision(pokemonTeam[0]);
            let essaisFoe = essaisGeometrique(prcFoe);
            let essaisPokemon = essaisGeometrique(prcPokemon);
            let pvFoe = Math.floor(((27*pokemonTeam[0].atk)/foe.def)*sensiFoe);
            let pvPokemon = Math.floor(((27*foe.atk)/pokemonTeam[0].def)*sensiPokemon);
            
            let teamText = []
            for (const pokemon of pokemonTeam) {
                if (pokemon.nom != "VIDE") {
                    let sensi = calculSensibilité(foe, pokemon);
                    let pv = Math.floor(((27*foe.atk)/pokemon.def)*sensi);
                    teamText.push("Si vous choisissez "+pokemon.nom+", il perdra "+pv+" PV")
                }
            }

            let pvRatio = (foe.pvNow-1)/foe.pvMax;
            let rate = binomiale(id, 4, 4)*(foe.taux/2)*(1-(pvRatio))*100
            let essaisCapture = essaisGeometrique(rate/100);

            console.log("battle Start → v - prcPokemon", prcPokemon)

            estimations.push(pokemonTeam[0].nom+" est de type "+pokemonTeam[0].getTypeName()+".");
            estimations.push("Le "+foe.nom+" adverse est de type "+foe.getTypeName()+".");
            estimations.push("La puissance de vos attaques sera multipliée par "+sensiFoe+".");
            estimations.push("La puissance des attaques de votre adversaire sera multipliée par "+sensiPokemon+".");
            estimations.push(pokemonTeam[0].nom+" a une précision de "+pokemonTeam[0].prc+".");
            estimations.push("Le "+foe.nom+" adverse a une précision de "+foe.prc+".");
            estimations.push(pokemonTeam[0].nom+" a "+prcPokemon*100+"% de chances de toucher le "+foe.nom+" adverse.")
            estimations.push("Il devrait y arriver à l'essai n°"+essaisPokemon);
            estimations.push("Le "+foe.nom+" adverse perdra "+pvFoe+" PV");
            estimations.push("Le "+foe.nom+" a "+prcFoe*100+"% de chances de toucher "+pokemonTeam[0].nom);
            estimations.push("Il devrait y arriver a l'essai n°"+essaisFoe);
            estimations.push(pokemonTeam[0].nom+" perdra "+pvPokemon+" PV");

            estimations.push("      - - - POKEMON - - -");
            estimations.push("Si vous choisissez d'échanger "+pokemonTeam[0].nom+" pour un autre pokémon de votre équipe,");
            estimations.push("il sera attaqué par le "+foe.nom+" adverse avant le prochain tour.");
            estimations.push(...teamText);

            estimations.push("      - - - CAPTURE - - -");
            estimations.push("Le "+foe.nom+" adverse a un taux de capture de "+foe.taux+".")
            estimations.push("Vous avez "+rate+"% de chances de réussir à le capturer.");
            estimations.push("Vous devriez y arriver a l'essai n°"+essaisCapture);

            await updateText(estimations, 20);
            await wait(40660);

            clear();
            await displayBattle(pokemonTeam[0], foe);
        }



        if (!ACTION) {
            console.log("foe ko");
        }
    }

    window.addEventListener("keypress", handleEvent)

    console.log("ACTION = ", ACTION)

    // Attendre la fin du combat
    await new Promise((resolve) => {
        // Utilisez un intervalle pour vérifier périodiquement si le combat est terminé
        const interval = setInterval(() => {
            if (!ACTION) {
                clearInterval(interval);
                window.removeEventListener("keypress", handleEvent)
                resolve(); // Résoudre la promesse lorsque le Pokémon adverse est KO
            }
        }, 100);
    });
}

export {battleStart, battleChangePokemon}