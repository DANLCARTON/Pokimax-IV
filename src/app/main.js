import { updateText, lireLigne, clear, wait } from "./text.js";
import {intro} from "./intro.js";
import {mapStart} from "./map.js";
import {GAME} from "./game.js";

window.addEventListener("load", async () => {
    const id = await intro();
    await mapStart(id);

    await new Promise((resolve) => {
        const interval = setInterval(async function() {
            if (!GAME.value) {
                console.log("main - GAME", GAME)
                clearInterval(interval);
                clear();
                await updateText(["GAME OVER"], 20);
                await wait(10000000)
                resolve();
            }
        }, 1);
    });
})