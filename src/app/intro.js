import { createPinia } from "pinia";
import { updateText, lireLigne, wait, clear } from "./text.js";

function getParam(question) {
    return new Promise(resolve => {
        const answer = window.prompt(question);
        resolve(answer);
    });
}

function getID(name) {
    let id = 0;
    for (let char of name) {
        id += char.charCodeAt(0);
    }
    return id;
}

async function intro() {
    const speed = -6000;
    await wait(0+speed);
    clear();
    await updateText(["...", "..."], 80);
    await wait(1480+speed);
    clear();
    await updateText(["... *baillement* ..."], 80);
    await wait(2440+speed);
    clear();
    await updateText(["Hein ? Quoi ? Déjà ?", "Noooooon ! J'ai raté l'heure !"], 40);
    await wait(2600+speed);
    clear();
    await updateText(["Désolé de t'avoir fait attendre !"], 40);
    await wait(1120+speed);
    clear();
    await updateText(["Bienvenue dans le monde de Pokémon !"], 40);
    await wait(1440+speed);
    clear();
    await updateText(["Mon nom est Chen."], 40);
    await wait(480+speed);
    clear();
    await updateText(["Mais tout le monde m'appelle", "Le Professeur Pokémon"], 40);
    await wait(1960+speed);
    clear();
    await updateText(["Tu débutes tout juste ton aventure,", "Je me trompe ?"], 40);
    await wait(1960+speed);
    clear();
    await updateText(["Laisse moi tout d'abord t'enseigner", "les bases de ce monde."], 40);
    await wait(2320+speed);
    clear();
    await updateText(["Ce monde est peuplé de créatures", "appelées Pokémon."], 40);
    await wait(1960+speed);
    clear();
    await updateText(["Nous, les humains, vivons avec les", "Pokémon."], 40);
    await wait(1640+speed);
    clear();
    await updateText(["Il nous arrive de jouer", "ou de travailler ensemble."], 40);
    await wait(1960+speed);
    clear();
    await updateText(["Certaines personnes utilisent les", "Pokémon pour combattre et créent", "un lien très fort avec eux."], 40);
    await wait(3680+speed);
    clear();
    await updateText(["Moi ?"], 30);
    await wait(150+speed);
    clear();
    await updateText(["Je me contente de faire des", "recherches pour que nous en", "sachions plus sur les Pokémon."], 40);
    await wait(3400+speed);
    clear();
    await updateText(["Mais avant tout,", "parle-moi un peu de toi."], 40);
    await wait(1680+speed);
    clear();
    await updateText(["Comment t'appelles-tu ?"], 40);
    await wait(920+speed);
    const playerName = await getParam("Votre nom ?");
    await wait(0+speed);
    clear();
    await updateText(["Alors tu t'appelles "+playerName+" ?", "Très bien !"], 40);
    await wait(1960+speed);
    clear();
    await updateText(["Le moment est venu "+playerName+".", "Tout est prêt ?"], 80);
    await wait(4240+speed)
    clear();
    await updateText(["Ah ! J'ai failli oublier !!"], 20);
    await wait(520+speed);
    clear();
    await updateText(["Déplace-toi avec les touches", "Z, Q, S et D. Appuie sur la touche T", "Pour gérer ton équipe.", "Pour les actions en combat, utilise", "les touches R, T, F, G et V"], 40),
    await wait(6120+speed);
    clear();
    await updateText(["..."], 80);
    await wait(240+speed);
    clear();
    await updateText(["Allez ! Plonge dans le monde des Pokémon !!"], 20);
    await wait(860+speed);
    return getID(playerName);
}

export {intro, getParam};