import { updateText, lireLigne, clear } from "./text.js";
import {intro} from "./intro.js";
import {mapStart} from "./map.js";

window.addEventListener("load", async () => {
    const id = await intro();
    await mapStart(id);
})