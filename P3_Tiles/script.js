var gridSize = 4;
var numTiles = grid * grid - 1;

var grid = document.getElementById("tiles");
var tiles = grid.children;

function initialize() {

    for (let i = 1; i <= numTiles; i ++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.innerHTML = i.toString();
        tile.setAttribute("onclick", "move('" + i.toString() + "');")
        tile.setAttribute("id", i.toString());

        grid.appendChild(tile);
    }

    let empty = document.createElement("div");
    empty.setAttribute("id", "empty");

    grid.appendChild(empty);
}

function move(tile) {
    tiles = grid.children;
    console.log(tile.toString());
}

function checkAdj(tile) {
    tiles = grid.children;
    let index = getIndex(tile);
    
    if (index >= gridSize && tiles[index - gridSize].id == "empty") {
        return index-gridSize;
    }

    if ((index + 1) % gridSize != 0 && tiles[index + 1].id == "empty") {
        return index+1;
    }

    if (index % gridSize != 0 && tiles[index - 1].id == "empty") {
        return index-1;
    }

    // if (
}

function getIndex(tile) {
    tiles = grid.children;
    for (let i = 0; i < grid.children.length; i ++) {
        if (tiles[i].id == tile) {
            return i;
        }
    }
    return -1;
}