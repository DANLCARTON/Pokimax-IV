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

async function updateTextInstant(text) {
    document.getElementById("game").textContent += formatText(text);
}

function convertMapToStringArray(map) {
    let stringMap = [];

    for (let i = 0; i < map.length; i++) {
        let row = "";
        for (let j = 0; j < map[i].length; j++) {
        row += map[i][j].content;
        }
        stringMap.push(row);
    }

    return stringMap;
}

export {formatText, updateText, lireLigne, wait, clear, convertMapToStringArray, updateTextInstant};