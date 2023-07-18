import { Pokemon } from "./pokemon.js";
import { getPFromId, uniforme, poisson, hypergeometrique, densite } from "./aleatoire.js";
import { clear, convertMapToStringArray, updateText, wait, updateTextInstant } from './text.js';
import { getParam } from "./intro.js";
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
    let nb = uniforme() * pokemonArray.length;
    return pokemonArray[nb];
}

function getPokemon(x, y, points) {
    for (let point of points) {
        if (point.x == x && point.y == y) {
            return point.pokemon;
        }
    }
}

async function displayMap(map) {
    clear();
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
    let Relicanth = new Pokemon("RELICANTH", "Eau", 100, 100, 90, 100, 10, 55, 3);
    let Lovdisc = new Pokemon("LOVDISC", "Eau", 43, 43, 30, 55, 88, 97, 3);
    let Pachirisu = new Pokemon("PACHIRISU", "Electrik", 60, 60, 90, 70, 80, 95, 2);
    let Pijako = new Pokemon("PIJAKO", "Normal", 76, 76, 45, 70, 75, 91, 2);
    let Spiritomb = new Pokemon("SPIRITOMB", "Roche", 50, 50, 92, 108, 39, 35, 3);
    let Vortente = new Pokemon("VORTENTE", "Plante", 74, 74, 100, 72, 78, 46, 2);
    let Motisma = new Pokemon("MOTISMA", "Normal", 50, 50, 65, 107, 15, 91, 3);
    let Nanmeouie = new Pokemon("NANMEOUIE", "Normal", 103, 103, 60, 86, 100, 50, 2);
    let Judokrak = new Pokemon("JUDOKRAK", "Roche", 120, 120, 100, 85, 18, 45, 2);
    let Karaclee = new Pokemon("KARACLEE", "Roche", 75, 75, 125, 75, 18, 85, 3);
    let Bargantua = new Pokemon("BARGANTUA", "Eau", 70, 70, 95, 65, 25, 98, 3);
    let Maracachi = new Pokemon("MARACACHI", "Plante", 75, 75, 60, 86, 67, 80, 3);
    let Cryptero = new Pokemon("CRYPTERO", "Feu", 72, 72, 58, 80, 18, 97, 4);
    let Emolga = new Pokemon("EMOLGA", "Electrik", 55, 55, 75, 60, 80, 103, 3);
    let Mamanbo = new Pokemon("MAMANBO", "Eau", 165, 165, 75, 80, 30, 65, 1);
    let Hexagel = new Pokemon("HEXAGEL", "Eau", 80, 80, 50, 30, 10, 105, 5);
    let Limonde = new Pokemon("LIMONDE", "Roche", 109, 109, 66, 84, 30, 32, 3);
    let Drakkarmin = new Pokemon("DRAKKARMIN", "Roche", 77, 77, 120, 90, 18, 48, 3);
    let Frison = new Pokemon("FRISON", "Normal", 95, 95, 110, 95, 18, 55, 3);
    let Aflamanoir = new Pokemon("AFLAMANOIR", "Feu", 85, 85, 97, 66, 35, 65, 3);
    let Fermite = new Pokemon("FERMITE", "Plante", 58, 58, 109, 112, 35, 109, 2);
    let Couafarel = new Pokemon("COUAFAREL", "Normal", 75, 75, 80, 60, 47, 102, 3);
    let Brutalibre = new Pokemon("BRUTALIBRE", "Normal", 78, 78, 92, 75, 39, 115, 3);
    let Dedenne = new Pokemon("DEDENNE", "Electrik", 67, 67, 60, 60, 75, 101, 3);
    let Strassie = new Pokemon("STRASSIE", "Roche", 50, 50, 50, 150, 15, 50, 4);
    let Trousselin = new Pokemon("TROUSSELIN", "Feu", 57, 57, 80, 91, 29, 75, 4);
    let Brocelome = new Pokemon("BROCELOME", "Plante", 43, 43, 70, 48, 50, 38, 6);
    let Plumeline = new Pokemon("PLUMELINE", "Feu", 75, 75, 70, 70, 20, 93, 4);
    let Froussardine = new Pokemon("FROUSSARDINE", "Eau", 45, 45, 20, 20, 60, 40, 7);
    let Guerilande = new Pokemon("GUERILANDE", "Plante", 51, 51, 52, 90, 24, 100, 4);
    let Gouroutan = new Pokemon("GOUROUTAN", "Plante", 90, 90, 60, 80, 18, 60, 4);
    let Quartermac = new Pokemon("QUARTERMAC", "Plante", 100, 100, 120, 90, 18, 80, 2);
    let Concombaffe = new Pokemon("CONCOMBAFFE", "Eau", 55, 55, 60, 130, 60, 5, 4);
    let Meteno = new Pokemon("METENO", "Roche", 60, 60, 100, 60, 80, 120, 2);
    let Dodoala = new Pokemon("DODOALA", "Normal", 65, 65, 115, 65, 45, 65, 3);
    let Boumata = new Pokemon("BOUMATA", "Feu", 60, 60, 78, 135, 30, 36, 4);
    let Togedemaru = new Pokemon("TOGEDEMARU", "Electrik", 65, 65, 98, 43, 70, 96, 4);
    let Mimiqui = new Pokemon("MIMIQUI", "Electrik", 55, 55, 90, 80, 17, 96, 4);
    let Denticrisse = new Pokemon("DENTICRISSE", "Eau", 68, 68, 105, 70, 30, 92, 3);
    let Draieul = new Pokemon("DRAIEUL", "Normal", 78, 78, 60, 85, 30, 36, 4);
    let Sinistrail = new Pokemon("SINISTRAIL", "Plante", 70, 70, 131, 100, 10, 40, 3);
    let Katagami = new Pokemon("KATAGAMI", "Plante", 59, 59, 181, 131, 3, 109, 1);
    let Nigosier = new Pokemon("NIGOSIER", "Eau", 70, 70, 85, 55, 18, 85, 4);
    let Hexadron = new Pokemon("HEXADRON", "Roche", 65, 65, 100, 100, 18, 75, 3);
    let Wimessir = new Pokemon("WIMESSIR", "Normal", 65, 65, 60, 60, 12, 90, 5);
    let Duralugon = new Pokemon("DURALUGON", "Roche", 70, 70, 95, 115, 18, 85, 3);
    let Wattapik = new Pokemon("WATTAPIK", "Electrik", 48, 48, 100, 95, 75, 15, 4);
    let Dolman = new Pokemon("DOLMAN", "Roche", 100, 100, 20, 20, 25, 70, 5);
    let Bekaglacon = new Pokemon("BEKAGLACON", "Eau", 75, 75, 80, 110, 60, 130, 2);
    let Morpeko = new Pokemon("MORPEKO", "Electrik", 58, 58, 90, 60, 70, 97, 3);
    let Tapatoes = new Pokemon("TAPATOES", "Normal", 82, 82, 96, 51, 74, 92, 3);
    let Craparoi = new Pokemon("CRAPAROI", "Roche", 90, 90, 100, 115, 47, 75, 3);
    let Lestombaile = new Pokemon("LESTOMBAILE", "Normal", 70, 70, 103, 85, 10, 82, 3);
    let Ferdeter = new Pokemon("FERDETER", "Roche", 70, 70, 85, 145, 10, 65, 3);
    let Flamenroule = new Pokemon("FLAMENROULE", "Feu", 82, 82, 115, 74, 39, 70, 3);
    let Delestin = new Pokemon("DELESTIN", "Eau", 90, 90, 102, 73, 39, 70, 3);
    let Oyacata = new Pokemon("OYACATA", "Eau", 150, 150, 100, 115, 10, 35, 1);
    let Nigirigon = new Pokemon("NIGIRIGON", "Eau", 68, 68, 50, 60, 39, 82, 4);
    let Motorizard = new Pokemon("MOTORIZARD", "Normal", 70, 70, 95, 65, 74, 121, 2);
    let Chongjian = new Pokemon("CHONGJIAN", "Plante", 85, 85, 85, 100, 2, 70, 3);
    let Baojian = new Pokemon("BAOJIAN", "Eau", 80, 80, 120, 80, 2, 135, 2);
    let Dinglu = new Pokemon("DINGLU", "Roche", 155, 155, 110, 125, 2, 42, 1);
    let Yuyu = new Pokemon("YUYU", "Feu", 55, 55, 80, 80, 2, 100, 4);
    let RugitLune = new Pokemon("RUGIT-LUNE", "Roche", 105, 105, 139, 71, 6, 119, 1);
    let GardeDeFer = new Pokemon("GARDE-DE-FER", "Roche", 74, 74, 130, 90, 6, 116, 2);

    let pokemonList = [Pikachu, Canarticho, Kangourex, Scarabrute, Tauros, Lokhlass, Insolourdo, Qwilfish, Caratroc, Scarinho, Corayon, Cadoizo, Airmure, Queulorior, Ecremeuh, Tenefix, Mysdibule, Posipi, Negapi, Muciole, Lumivole, Chartor, Spinda, Mangriff, Seviper, Seleroc, Solaroc, Morpheo, Kecleon, Tropius, Absol, Relicanth, Lovdisc, Pachirisu, Pijako, Spiritomb, Vortente, Motisma, Nanmeouie, Judokrak, Karaclee, Bargantua, Maracachi, Cryptero, Emolga, Mamanbo, Hexagel, Limonde, Drakkarmin, Frison, Aflamanoir, Fermite, Couafarel, Brutalibre, Dedenne, Strassie, Trousselin, Brocelome, Plumeline, Froussardine, Guerilande, Gouroutan, Quartermac, Concombaffe, Meteno, Dodoala, Boumata, Togedemaru, Mimiqui, Denticrisse, Draieul, Sinistrail, Katagami, Nigosier, Hexadron, Wimessir, Duralugon, Wattapik, Dolman, Bekaglacon, Morpeko, Tapatoes, Craparoi, Lestombaile, Ferdeter, Flamenroule, Delestin, Oyacata, Nigirigon, Motorizard, Chongjian, Baojian, Dinglu, Yuyu, RugitLune, GardeDeFer];

    const haut = await getParam("Hauteur de la map ? (conseillée : 25)");
    const larg = await getParam("Largeur de la map ? (conseillée : 50)");
    const shape = await getParam("Distribution des Pokémon sur la map ? (0 = uniforme, 1 = Gauss, 2 = Triangulaire)");

    var map = apparenceMap(larg, haut);

    let pokeArray = pokemonArray(pokemonList);

    let playerTeam = [Pikachu];

    let points = await genererPoints(map, larg, haut, shape, id, pokeArray);

    let coordX = 1;
    let coordY = 1;

    map[coordY][coordX].content = player;

    await displayMap(convertMapToStringArray(map));

    console.log("le while juste après")

    hotkeys("z", (event, handler) => {
        if (coordY > 1) {
            map[coordY][coordX].content = " ";
            coordY--;
            if (map[coordY][coordX].content == pokemon) {
                let wildPokemon = getPokemon(coordX, coordY, points);
                battleStart(playerTeam, wildPokemon, id);
            }
        }
    })
}   

export {mapStart}