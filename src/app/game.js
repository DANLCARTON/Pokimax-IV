let GAME = {value: true};

function verifVictoire(map, haut, larg) {
    let success = true;
    for (let i = 0; i <= haut-1; ++i) {
        for (let j = 0; j <= larg; ++j) {
            if (map[i][j].content == "░") {
                success = false;
            }
        }
    }
    return success
}

function verifDefaite(pokemonTeam) {
    let KO = true;
    for (const pokemon of pokemonTeam) {
        if (pokemon.pvNow > 0) KO = false;
    }
    return KO;
}

export {GAME, verifVictoire, verifDefaite};