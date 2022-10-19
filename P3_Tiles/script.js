var gridSize = 4;
var numTiles = gridSize * gridSize - 1;

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
    if ( checkAdj(tile) > -1 ) {
        emptyClone = document.getElementById("empty").cloneNode(true);
        tileClone = document.getElementById(tile).cloneNode(true);
        tileIndex = getIndex(tile);
        emptyIndex = getIndex("empty");

        if (emptyIndex == 0 && tileIndex == 0) {
            console.log("1");
            grid.removeChild(document.getElementById("empty"));

            console.log(tiles);
            tiles[emptyIndex].after(emptyClone);
        } else if (tileIndex == numTiles && emptyIndex == numTiles - 1) {
            console.log("2");
            grid.removeChild(document.getElementById("empty"));
            document.getElementById(tile).after(emptyClone);

        } else if (emptyIndex != numTiles) {
            console.log("3")
            grid.removeChild(document.getElementById(tile));
            tiles[emptyIndex].before(tileClone);
            grid.removeChild(document.getElementById("empty"));
            tiles[tileIndex].before(emptyClone);
        // }
        // else if (tileIndex < numTiles) {
        //     grid.replaceChild(document.getElementById("empty"), document.getElementById(tile));
        //     tiles[emptyIndex-1].after(tileClone);

        } else {
            console.log("4");
            grid.removeChild(document.getElementById("empty"));
            document.getElementById(tile).before(emptyClone);
            grid.removeChild(document.getElementById(tile));
            grid.append(tileClone);
        }
    }
}

function checkAdj(tile) {
    grid = document.getElementById("tiles");
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

    if (index <= numTiles - gridSize && tiles[index + 4].id == "empty") {
        return index+4;
    }

    return -1;
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