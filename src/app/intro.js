import { updateText, lireLigne, wait, clear } from "./text.js";

function getID(name) {

}



async function intro() {
    await wait(2000);
    clear();
    await updateText(["...", "..."], 80);
    await wait(3480)
    clear();
    await updateText(["... *baillement* ..."], 80);
    await wait(4440);
    clear();
    await updateText(["Hein ? Quoi ? Déjà ?", "Noooooon ! J'ai raté l'heure !"], 40);
    await wait(4600);
    clear();
}

export {intro};