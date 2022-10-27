var gridSize = 4;
var numTiles = gridSize * gridSize - 1;

var grid = document.getElementById("tiles");
var tiles = grid.children;
var getIndex = (tile) => Array.from(tiles).indexOf(tile);

var moves = 0;
var playing = false;

function initialize() {
    moves = 0;
    document.getElementById("moves").innerHTML = "clicks: " + moves.toString();
    playing = false;

    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

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
    grid.style.gridTemplateColumns = "repeat(" + gridSize.toString() + ", auto)";

    grid.appendChild(empty);
}

function winColours() {
    let numColours = gridSize * 2 - 1;

    let startingCol = Math.floor(Math.random() * 360);

    tiles[numTiles].classList.add("tile");

    for (let i = 0; i < tiles.length; i ++) {
        // Column Number Expression
        // parseInt(getIndex(tiles[i])) % gridSize

        // Row Number Expression
        // Math.floor(parseInt(getIndex(tiles[i])) / gridSize)


        let colour = (parseInt(getIndex(tiles[i])) % gridSize) + (Math.floor(parseInt(getIndex(tiles[i])) / gridSize)); 
        tiles[i].style.borderColor = "hsl(" + ((startingCol + Math.floor((360 / numColours) * colour)) % 360).toString() + "deg 50% 50%)";
    }
}

function move(tile) {
    if (checkAdj(tile) > -1) {
        let emptyClone = document.getElementById("empty").cloneNode();
        let tileClone = document.getElementById(tile).cloneNode(true);
        let emptyIndex = getIndex(document.getElementById("empty"));
        let tileIndex = getIndex(document.getElementById(tile));
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

        if (playing) {
            update();
        }
        return true;
    }
    return false;
}

function start() {
    playing = true;
}

function update() {
    moves ++;
    document.getElementById("moves").innerHTML = "click: " + moves.toString();
    if (inOrder()) {
        winColours();
        document.getElementById("moves").innerHTML = "you win :)        it took you " + moves.toString() + " clicks";
    }
}

function checkAdj(tile) {
    grid = document.getElementById("tiles");
    tiles = grid.children;
    let index = getIndex(document.getElementById(tile));
    
    if (index >= gridSize && tiles[index - gridSize].id == "empty") {
        return index-gridSize;
    }

    if ((index + 1) % gridSize != 0 && tiles[index + 1].id == "empty") {
        return index+1;
    }

    if (index % gridSize != 0 && tiles[index - 1].id == "empty") {
        return index-1;
    }

    if (index <= numTiles - gridSize && tiles[index + gridSize].id == "empty") {
        return index+gridSize;
    }

    return -1;
}

function shuffle(num) {
    playing = false;
    let shuffles = 0;
    while (shuffles < num) {
        if (move(tiles[Math.floor(Math.random() * (numTiles + 1))].id)) {
            shuffles ++;
        }
    }
    start();
}

function inOrder() {
    let last = parseInt(tiles[0].id);
    for (let tile in Array.from(tiles)) {
        if (tile < numTiles) {
            last = ((parseInt(tiles[tile].id) >= last) ? parseInt(tiles[tile].id) : numTiles+1);
        }
    }
    return (last == numTiles);
}
