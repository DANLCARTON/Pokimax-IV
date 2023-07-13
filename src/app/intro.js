import { updateText, lireLigne, wait, clear } from "./text.js";

function getID(name) {

}



async function intro() {
    const delay = 2500
    await wait(delay);
    clear();
    await updateText(["...", "..."], 80);
    await wait(delay)
    clear();
    await updateText(["... *baillement* ..."], 80);
    await wait(delay);
    clear();
    await updateText(["Hein ? Quoi ? Déjà ?", "Noooooon ! J'ai raté l'heure !"], 40);
    await wait(delay);
    clear();

}

export {intro};