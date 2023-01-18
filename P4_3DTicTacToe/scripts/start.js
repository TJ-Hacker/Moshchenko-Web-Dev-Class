curPlayer = "";

function startGameLoop() {
    let elsToDel = document.getElementsByClassName("toDelete");
    for (let el of elsToDel) {
        el.remove();
    }
    
    document.getElementById("cssLink").setAttribute("href", "style.css");

    let gameScript = document.createElement("script");
    gameScript.setAttribute("src", "scripts/tictactoe.js");

    let graphicsScript = document.createElement("script");
    graphicsScript.setAttribute("src", "scripts/3D.js");

    document.body.appendChild(gameScript);
    document.body.appendChild(graphicsScript);

    // I'm doing this again because some of the elements still remain after the first time
    elsToDel = document.getElementsByClassName("toDelete");
    for (let el of elsToDel) {
        el.remove();
    }
}

function reset() {
    
}