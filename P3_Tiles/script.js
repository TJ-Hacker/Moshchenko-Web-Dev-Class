var gridSize = 4;
var numTiles = gridSize * gridSize - 1;

var grid = document.getElementById("tiles");
var tiles = grid.children;
var getIndex = (tile) => Array.from(tiles).indexOf(document.getElementById(tile));

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

// function move(tile) {
//     if ( checkAdj(tile) > -1 ) {
//         emptyClone = document.getElementById("empty").cloneNode(true);
//         tileClone = document.getElementById(tile).cloneNode(true);
//         tileIndex = getIndex(tile);
//         emptyIndex = getIndex("empty");

//         if (emptyIndex == 0 && tileIndex == 0) {
//             grid.removeChild(document.getElementById("empty"));

//             console.log(tiles);
//             tiles[emptyIndex].after(emptyClone);
//         } else if (tileIndex == numTiles && emptyIndex == numTiles - 1) {
//             grid.removeChild(document.getElementById("empty"));
//             document.getElementById(tile).after(emptyClone);

//         } else if (emptyIndex != numTiles) {
//             grid.removeChild(document.getElementById(tile));
//             tiles[emptyIndex].before(tileClone);
//             grid.removeChild(document.getElementById("empty"));
//             tiles[tileIndex].before(emptyClone);
//         } else {
//             grid.removeChild(document.getElementById("empty"));
//             document.getElementById(tile).before(emptyClone);
//             grid.removeChild(document.getElementById(tile));
//             grid.append(tileClone);
//         }
//     }
// }

function move(tile) {
    if (checkAdj(tile) > -1) {
        let emptyClone = document.getElementById("empty").cloneNode();
        let tileClone = document.getElementById(tile).cloneNode(true);
        let emptyIndex = getIndex("empty");
        let tileIndex = getIndex(tile);
        let tileDiff = emptyIndex - tileIndex;

        if (tileDiff == 1) {
            // Tile to the left
            document.getElementById(tile).remove();
            document.getElementById("empty").after(tileClone);
        } else if (tileDiff == -1) {
            // Tile to the right
            document.getElementById("empty").remove();
            document.getElementById(tile).after(emptyClone);
        } else if (tileDiff == gridSize) {
            // Tile on top
            document.getElementById("empty").remove();
            document.getElementById(tile).before(emptyClone);
            document.getElementById(tile).remove();
            tiles[emptyIndex-1].after(tileClone);
        } else if (tileDiff == -gridSize) {
            // Tile on bottom
            document.getElementById("empty").remove();
            document.getElementById(tile).before(emptyClone);
            document.getElementById(tile).remove();
            tiles[emptyIndex].before(tileClone);
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

function inOrder() {
    let last = parseInt(tiles[0].id);
    for (let tile in Array.from(tiles)) {
        // console.log(tiles[tile].id);
        // console.log((parseInt(tiles[tile].id) >= last) || (tiles[tile].id == "empty" && last == numTiles));
        console.log(tile + ", " + parseInt(tiles[tile].id));

        // -------------BROKEN----------------
        last = ((parseInt(tiles[tile].id) >= last)  || (tiles[tile].id == "empty" && last == numTiles) ? parseInt(tiles[tile].id) : numTiles+1);
    }
    console.log(last);
    return (last == numTiles);
}

// function getIndex(tile) {
//     tiles = grid.children;
//     for (let i = 0; i < grid.children.length; i ++) {
//         if (tiles[i].id == tile) {
//             return i;
//         }
//     }
//     return -1;
// }