numTiles = 15;

function initialize() {
    let tiles = document.getElementById("tiles");

    for (let i = 0; i <= numTiles; i ++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.innerHTML = i.toString();
        tiles.appendChild(tile);
    }
}