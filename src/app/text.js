function formatText(text) {
    return text.join("\n");
}

async function lireLigne(text, index, delay) {
    if (index < text.length) {
        document.getElementById("game").textContent += text[index];
        await wait(delay);  
        await lireLigne(text, index + 1, delay);
    }
}

function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function clear() {
    document.getElementById("game").textContent = "";
}

async function updateText(text, delay) {
    text = formatText(text);
    lireLigne(text, 0, delay);
}

export {formatText, updateText, lireLigne, wait, clear};