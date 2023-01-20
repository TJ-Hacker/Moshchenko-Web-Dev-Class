curPlayer = "X";
humanPlayer = "";

function startGameLoop() {
    let elsToDel = document.querySelectorAll(".toDelete");
    for (let el of elsToDel) {
        el.remove();
    }
    
    document.querySelector("#cssLink").setAttribute("href", "style.css");

    let gameScript = document.createElement("script");
    gameScript.setAttribute("src", "scripts/tictactoe.js");

    let graphicsScript = document.createElement("script");
    graphicsScript.setAttribute("src", "scripts/3D.js");

    document.body.appendChild(gameScript);
    document.body.appendChild(graphicsScript);

    // I'm doing this again because some of the elements still remain after the first time
    elsToDel = document.querySelectorAll(".toDelete");
    for (let el of elsToDel) {
        el.remove();
    }
}

function showRules() {
    document.querySelector("#rulesModal").style.display = "block";
}

function hideRules() {
    document.querySelector("#rulesModal").style.display = "none";
}

hideRules();