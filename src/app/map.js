import { Pokemon } from "./pokemon.js";
import { getPFromId, uniforme, poisson, hypergeometrique, densite } from "./aleatoire.js";
import { clear, convertMapToStringArray, updateText, wait, updateTextInstant } from './text.js';
import { getParam } from "./intro.js";
import {battleStart} from "./battle.js";
import hotkeys from "hotkeys-js"

var player = "P";
var pokemon = "░";

class Point {
    constructor(x, y, pokemon) {
        this.x = x;
        this.y = y;
        this.pokemon = pokemon;
    }
}

function pokemonArray (pokemonList) {
    let pokeArr = [];
    for (let i = 0; i <= 95; ++i) {
        for (let j = 0; j <= pokemonList[i].rare; ++j) {
            pokeArr.push(pokemonList[i]);
        }
    }
    return pokeArr;
}

function randomPokemon(pokemonArray) {
    let nb = Math.floor(uniforme() * pokemonArray.length);
    return pokemonArray[nb];
}

function getPokemon(x, y, points) {
    console.log("pl point", x, y);
    for (let point of points) {
        console.log("point point", point.x, point.y, point.pokemon);
        if (point.x == x && point.y == y) {
            return point.pokemon;
        }
    }
}

async function displayMap(map) {
    clear();    
    map = convertMapToStringArray(map)
    await updateTextInstant(map)
}

class Case {
    constructor(content) {
        this.content = content;
    }
}

function apparenceMap(larg, haut) {
    let map = [];

    map[0] = [];
    map[0].push(new Case("╔"));
    for (let i = 0; i <= larg - 2; ++i) {
        map[0].push(new Case("═"));
    }
    map[0].push(new Case("╗"));

    for (let i = 1; i <= haut - 2; ++i) {
        map[i] = [];
        map[i].push(new Case("║"));
        for (let j = 0; j <= larg - 2; ++j) {
        map[i].push(new Case(" "));
        }
        map[i].push(new Case("║"));
    }

    map[haut - 1] = [];
    map[haut - 1].push(new Case("╚"));
    for (let i = 0; i <= larg - 2; ++i) {
        map[haut - 1].push(new Case("═"));
    }
    map[haut - 1].push(new Case("╝"));

    return map;
}

async function genererPoints(map, larg, haut, shape, id, pokemonArray) {
    let points = [];
    let lambda = getPFromId(id)*(haut/3)*(larg/3);
    let nbPoke = poisson(lambda);
    let shapeText = "";
    switch (shape) {
        case ("0"):
            shapeText = "• Ils seront distribués de manière uniforme sur toute la surface de la map.";
            break;
        case ("1"):
            shapeText = "• Ils seront distribués suivant une courbe en forme de cloche de Gauss.";
            break;
        case("2"):    
            shapeText = "• Ils seront distribués suivant une loi triangulaire de support ]0, 1[ et de mode 1.";
            break;
        break;
    }
    let estimationRare = hypergeometrique(286, 62, nbPoke, 1000);
    clear();
    await updateText(["• d'après votre ID et les paramètres que vous avez rentré, \nle nombre de Pokémon qui apparaîtront sur la map\n sera calculé par une loi de Poisson de paramètre\n λ = "+lambda+".", 
                "• "+nbPoke+" Pokémon appraîtront sur la map.", 
                shapeText, 
                "• d'après une estimation réalisée selon une loi hypergéométrique, "+estimationRare+" Pokémon rares devraient apparaître."], 20)
    await wait(14140);
    for (let i = 0; i <= nbPoke-1; ++i) {
        let coordY = Math.floor(densite(0, shape)*(haut-2))+1
        let coordX = Math.floor(densite(0, shape)*(larg-2))+1
        points.push(new Point(coordX, coordY, randomPokemon(pokemonArray)));
        map[coordY][coordX].content = pokemon;
    }
    return points;
}

async function mapStart(id) {
    
    console.log(id);

    let Pikachu = new Pokemon("PIKACHU", "E", 100, 100, 70, 70, 80, 120, 1);
    let Canarticho = new Pokemon("CANARTICHO", "N", 52, 52, 90, 55, 75, 60, 2);
    let Kangourex = new Pokemon("KANGOUREX", "R", 105, 105, 95, 80, 18, 90, 2);
    let Scarabrute = new Pokemon("SCARABRUTE", "G", 95, 95, 125, 100, 18, 85, 2);
    let Tauros = new Pokemon("TAUROS", "N", 75, 75, 100, 95, 18, 110, 2);
    let Lokhlass = new Pokemon ("LOKHLASS", "W", 130, 130, 85, 80, 18, 60, 3);
    let Insolourdo = new Pokemon("INSOLOURDO", "N", 100, 100, 70, 70, 75, 45, 3);
    let Qwilfish = new Pokemon("QWILFISH", "W", 65, 65, 95, 85, 15, 95, 2);
    let Caratroc = new Pokemon("CARATROC", "R", 20, 20, 10, 230, 75, 5, 2);
    let Scarinho = new Pokemon("SCARINHO", "G", 80, 80, 125, 75, 18, 85, 2);
    let Corayon = new Pokemon("CORAYON", "W", 65, 65, 55, 95, 25, 35, 4);
    let Cadoizo = new Pokemon("CADOIZO", "W", 45, 45, 55, 45, 15, 75, 4);
    let Airmure = new Pokemon("AIRMURE", "R", 65, 65, 80, 140, 10, 70, 2);
    let Queulorior = new Pokemon("QUEULORIOR", "N", 55, 55, 20, 35, 18, 75, 5);
    let Ecremeuh = new Pokemon("ECREMEUH", "N", 95, 95, 80, 100, 15, 100);
    let Tenefix = new Pokemon("TENEFIX", "R", 50, 50, 75, 75, 18, 50, 4);
    let Mysdibule = new Pokemon("MYSDIBULE", "R", 50, 50, 85, 85, 18, 50, 3);
    let Posipi = new Pokemon("POSIPI", "E", 60, 60, 50, 40, 80, 95, 3);
    let Negapi = new Pokemon("NEGAPI", "E", 60, 60, 50, 40, 80, 95, 3);
    let Muciole = new Pokemon("MUCIOLE", "G", 65, 65, 75, 75, 60, 85, 2)
    let Lumivole = new Pokemon("LUMIVOLE", "G", 65, 65, 75, 75, 60, 85, 2);
    let Chartor = new Pokemon("CHARTOR", "F", 70, 70, 85, 140, 35, 20, 2);
    let Spinda = new Pokemon("SPINDA", "N", 60, 60, 60, 60, 60, 60, 3);
    let Mangriff = new Pokemon("MANGRIFF", "N", 73, 73, 115, 60, 35, 90, 2);
    let Seviper = new Pokemon("SEVIPER", "N", 73, 73, 115, 60, 35, 65, 3);
    let Seleroc = new Pokemon("SELEROC", "R", 90, 90, 55, 65, 15, 70, 4); 
    let Solaroc = new Pokemon("SOLAROC", "F", 90, 90, 55, 65, 15, 70, 2);
    let Morpheo = new Pokemon("MORPHEO", "N", 70, 70, 70, 70, 70, 70, 2);
    let Kecleon = new Pokemon("KECLEON", "N", 60, 60, 90, 70, 80, 40, 20);
    let Tropius = new Pokemon("TROPIUS", "G", 99, 99, 58, 83, 78, 51, 3);
    let Absol = new Pokemon("ABSOL", 'N', 65, 65, 130, 60, 12, 75, 3);
    let Relicanth = new Pokemon("RELICANTH", "W", 100, 100, 90, 100, 10, 55, 3);
    let Lovdisc = new Pokemon("LOVDISC", "W", 43, 43, 30, 55, 88, 97, 3);
    let Pachirisu = new Pokemon("PACHIRISU", "E", 60, 60, 90, 70, 80, 95, 2);
    let Pijako = new Pokemon("PIJAKO", "N", 76, 76, 45, 70, 75, 91, 2);
    let Spiritomb = new Pokemon("SPIRITOMB", "R", 50, 50, 92, 108, 39, 35, 3);
    let Vortente = new Pokemon("VORTENTE", "G", 74, 74, 100, 72, 78, 46, 2);
    let Motisma = new Pokemon("MOTISMA", "N", 50, 50, 65, 107, 15, 91, 3);
    let Nanmeouie = new Pokemon("NANMEOUIE", "N", 103, 103, 60, 86, 100, 50, 2);
    let Judokrak = new Pokemon("JUDOKRAK", "R", 120, 120, 100, 85, 18, 45, 2);
    let Karaclee = new Pokemon("KARACLEE", "R", 75, 75, 125, 75, 18, 85, 3);
    let Bargantua = new Pokemon("BARGANTUA", "W", 70, 70, 95, 65, 25, 98, 3);
    let Maracachi = new Pokemon("MARACACHI", "G", 75, 75, 60, 86, 67, 80, 3);
    let Cryptero = new Pokemon("CRYPTERO", "F", 72, 72, 58, 80, 18, 97, 4);
    let Emolga = new Pokemon("EMOLGA", "E", 55, 55, 75, 60, 80, 103, 3);
    let Mamanbo = new Pokemon("MAMANBO", "W", 165, 165, 75, 80, 30, 65, 1);
    let Hexagel = new Pokemon("HEXAGEL", "W", 80, 80, 50, 30, 10, 105, 5);
    let Limonde = new Pokemon("LIMONDE", "R", 109, 109, 66, 84, 30, 32, 3);
    let Drakkarmin = new Pokemon("DRAKKARMIN", "R", 77, 77, 120, 90, 18, 48, 3);
    let Frison = new Pokemon("FRISON", "N", 95, 95, 110, 95, 18, 55, 3);
    let Aflamanoir = new Pokemon("AFLAMANOIR", "F", 85, 85, 97, 66, 35, 65, 3);
    let Fermite = new Pokemon("FERMITE", "G", 58, 58, 109, 112, 35, 109, 2);
    let Couafarel = new Pokemon("COUAFAREL", "N", 75, 75, 80, 60, 47, 102, 3);
    let Brutalibre = new Pokemon("BRUTALIBRE", "N", 78, 78, 92, 75, 39, 115, 3);
    let Dedenne = new Pokemon("DEDENNE", "E", 67, 67, 60, 60, 75, 101, 3);
    let Strassie = new Pokemon("STRASSIE", "R", 50, 50, 50, 150, 15, 50, 4);
    let Trousselin = new Pokemon("TROUSSELIN", "F", 57, 57, 80, 91, 29, 75, 4);
    let Brocelome = new Pokemon("BROCELOME", "G", 43, 43, 70, 48, 50, 38, 6);
    let Plumeline = new Pokemon("PLUMELINE", "F", 75, 75, 70, 70, 20, 93, 4);
    let Froussardine = new Pokemon("FROUSSARDINE", "W", 45, 45, 20, 20, 60, 40, 7);
    let Guerilande = new Pokemon("GUERILANDE", "G", 51, 51, 52, 90, 24, 100, 4);
    let Gouroutan = new Pokemon("GOUROUTAN", "G", 90, 90, 60, 80, 18, 60, 4);
    let Quartermac = new Pokemon("QUARTERMAC", "G", 100, 100, 120, 90, 18, 80, 2);
    let Concombaffe = new Pokemon("CONCOMBAFFE", "W", 55, 55, 60, 130, 60, 5, 4);
    let Meteno = new Pokemon("METENO", "R", 60, 60, 100, 60, 80, 120, 2);
    let Dodoala = new Pokemon("DODOALA", "N", 65, 65, 115, 65, 45, 65, 3);
    let Boumata = new Pokemon("BOUMATA", "F", 60, 60, 78, 135, 30, 36, 4);
    let Togedemaru = new Pokemon("TOGEDEMARU", "E", 65, 65, 98, 43, 70, 96, 4);
    let Mimiqui = new Pokemon("MIMIQUI", "E", 55, 55, 90, 80, 17, 96, 4);
    let Denticrisse = new Pokemon("DENTICRISSE", "W", 68, 68, 105, 70, 30, 92, 3);
    let Draieul = new Pokemon("DRAIEUL", "N", 78, 78, 60, 85, 30, 36, 4);
    let Sinistrail = new Pokemon("SINISTRAIL", "G", 70, 70, 131, 100, 10, 40, 3);
    let Katagami = new Pokemon("KATAGAMI", "G", 59, 59, 181, 131, 3, 109, 1);
    let Nigosier = new Pokemon("NIGOSIER", "W", 70, 70, 85, 55, 18, 85, 4);
    let Hexadron = new Pokemon("HEXADRON", "R", 65, 65, 100, 100, 18, 75, 3);
    let Wimessir = new Pokemon("WIMESSIR", "N", 65, 65, 60, 60, 12, 90, 5);
    let Duralugon = new Pokemon("DURALUGON", "R", 70, 70, 95, 115, 18, 85, 3);
    let Wattapik = new Pokemon("WATTAPIK", "E", 48, 48, 100, 95, 75, 15, 4);
    let Dolman = new Pokemon("DOLMAN", "R", 100, 100, 20, 20, 25, 70, 5);
    let Bekaglacon = new Pokemon("BEKAGLACON", "W", 75, 75, 80, 110, 60, 130, 2);
    let Morpeko = new Pokemon("MORPEKO", "E", 58, 58, 90, 60, 70, 97, 3);
    let Tapatoes = new Pokemon("TAPATOES", "N", 82, 82, 96, 51, 74, 92, 3);
    let Craparoi = new Pokemon("CRAPAROI", "R", 90, 90, 100, 115, 47, 75, 3);
    let Lestombaile = new Pokemon("LESTOMBAILE", "N", 70, 70, 103, 85, 10, 82, 3);
    let Ferdeter = new Pokemon("FERDETER", "R", 70, 70, 85, 145, 10, 65, 3);
    let Flamenroule = new Pokemon("FLAMENROULE", "F", 82, 82, 115, 74, 39, 70, 3);
    let Delestin = new Pokemon("DELESTIN", "W", 90, 90, 102, 73, 39, 70, 3);
    let Oyacata = new Pokemon("OYACATA", "W", 150, 150, 100, 115, 10, 35, 1);
    let Nigirigon = new Pokemon("NIGIRIGON", "W", 68, 68, 50, 60, 39, 82, 4);
    let Motorizard = new Pokemon("MOTORIZARD", "N", 70, 70, 95, 65, 74, 121, 2);
    let Chongjian = new Pokemon("CHONGJIAN", "G", 85, 85, 85, 100, 2, 70, 3);
    let Baojian = new Pokemon("BAOJIAN", "W", 80, 80, 120, 80, 2, 135, 2);
    let Dinglu = new Pokemon("DINGLU", "R", 155, 155, 110, 125, 2, 42, 1);
    let Yuyu = new Pokemon("YUYU", "F", 55, 55, 80, 80, 2, 100, 4);
    let RugitLune = new Pokemon("RUGIT-LUNE", "R", 105, 105, 139, 71, 6, 119, 1);
    let GardeDeFer = new Pokemon("GARDE-DE-FER", "R", 74, 74, 130, 90, 6, 116, 2);

    let Vide = new Pokemon("VIDE", "N", 0, 0, 0, 0, 0, 0, 0);

    let pokemonList = [Pikachu, Canarticho, Kangourex, Scarabrute, Tauros, Lokhlass, Insolourdo, Qwilfish, Caratroc, Scarinho, Corayon, Cadoizo, Airmure, Queulorior, Ecremeuh, Tenefix, Mysdibule, Posipi, Negapi, Muciole, Lumivole, Chartor, Spinda, Mangriff, Seviper, Seleroc, Solaroc, Morpheo, Kecleon, Tropius, Absol, Relicanth, Lovdisc, Pachirisu, Pijako, Spiritomb, Vortente, Motisma, Nanmeouie, Judokrak, Karaclee, Bargantua, Maracachi, Cryptero, Emolga, Mamanbo, Hexagel, Limonde, Drakkarmin, Frison, Aflamanoir, Fermite, Couafarel, Brutalibre, Dedenne, Strassie, Trousselin, Brocelome, Plumeline, Froussardine, Guerilande, Gouroutan, Quartermac, Concombaffe, Meteno, Dodoala, Boumata, Togedemaru, Mimiqui, Denticrisse, Draieul, Sinistrail, Katagami, Nigosier, Hexadron, Wimessir, Duralugon, Wattapik, Dolman, Bekaglacon, Morpeko, Tapatoes, Craparoi, Lestombaile, Ferdeter, Flamenroule, Delestin, Oyacata, Nigirigon, Motorizard, Chongjian, Baojian, Dinglu, Yuyu, RugitLune, GardeDeFer];

    const haut = await getParam("Hauteur de la map ? (conseillée : 25)");
    const larg = await getParam("Largeur de la map ? (conseillée : 50)");
    const shape = await getParam("Distribution des Pokémon sur la map ? (0 = uniforme, 1 = Gauss, 2 = Triangulaire)");

    var map = apparenceMap(larg, haut);

    let pokeArray = pokemonArray(pokemonList);

    let playerTeam = [Pikachu, Vide, Vide, Vide, Vide, Vide];

    let points = await genererPoints(map, larg, haut, shape, id, pokeArray);

    let coordX = 1;
    let coordY = 1;

    map[coordY][coordX].content = player;

    await displayMap(map);

    hotkeys("z", async function (event, handler) {
        console.log("z")
        if (coordY > 1) {
            map[coordY][coordX].content = " ";
            coordY--;
            if (map[coordY][coordX].content == pokemon) {
                let wildPokemon = getPokemon(coordX, coordY, points);
                await battleStart(playerTeam, wildPokemon, id); 
            }
            map[coordY][coordX].content = player;
            await displayMap(map)
        }
    })

    hotkeys("s", async function (event, handler) {
        console.log("s")
        if (coordY < haut-2) {
            map[coordY][coordX].content = " ";
            coordY++;
            if (map[coordY][coordX].content == pokemon) {
                let wildPokemon = getPokemon(coordX, coordY, points);
                await battleStart(playerTeam, wildPokemon, id); 
            }
            map[coordY][coordX].content = player;
            await displayMap(map)
        }
    })

    hotkeys("q", async function (event, handler) {
        console.log("qq")
        if (coordX > 1) {
            map[coordY][coordX].content = " ";
            coordX--;
            if (map[coordY][coordX].content == pokemon) {
                let wildPokemon = getPokemon(coordX, coordY, points);
                await battleStart(playerTeam, wildPokemon, id); 
            }
            map[coordY][coordX].content = player;
            await displayMap(map)
        }
    })

    hotkeys("d", async function (event, handler) {
        console.log("d")
        if (coordX < larg-1) {
            map[coordY][coordX].content = " ";
            coordX++;
            if (map[coordY][coordX].content == pokemon) {
                let wildPokemon = getPokemon(coordX, coordY, points);
                await battleStart(playerTeam, wildPokemon, id); 
            }
            map[coordY][coordX].content = player;
            await displayMap(map)
        }
    })
}   

export {mapStart}