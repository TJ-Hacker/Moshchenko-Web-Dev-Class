
// grid[row][column][layer]
grid = [];
lastMove = [];
const gridSize = 3;
curPlayer = "X";
winner = -1;

alert("Welcome to 2 Layered Tic Tac Toe! Click on the slot you want to place your piece, and drag the bottom of the screen to rotate the board. Refresh to restart");


function advance() {
    if (checkWinner("O") != -1 || checkWinner("X") != -1) {
        if (checkWinner("O") != -1) {
            winner = "O";
        } else {
            winner = "X";
        }
    }

    if (winner != -1) {
        cont = false;
        winAnimation();
    }

    // curPlayer = (curPlayer === "X") ? "O" : "O";

    // cpuMove();
    if (curPlayer === "X") {
        curPlayer = "O";
    } else {
        curPlayer = "X";
    }
}

function cpuMove(piece) {
    let randMove = [Math.floor(Math.random(gridSize)), Math.floor(Math.random(gridSize))];
    while (move(piece, randMove) === -1) {
        randMove = [Math.floor(Math.random(gridSize)), Math.floor(Math.random(gridSize))];
    }
}

function move(player, tile) {
    let second = false;
    // Check if the tile was occupied by the other player last
    if (tile[0] === lastMove[0] && tile[1] === lastMove[1]) {
        return -1;
    }

    if (grid[tile[0]][tile[1]].length === 2) {
        return -1;
    }
    if (grid[tile[0]][tile[1]].length > 0) {
        grid[tile[0]][tile[1]][1] = player;
        second = true;
    } else {
        grid[tile[0]][tile[1]][0] = player;
    }

    addPiece(player, tile, second);
    lastMove = tile;
    // cpuMove();
    advance();
    return grid[tile[0]][tile[1]];
}

function checkWinner(player) {
    // Check Verticals
    let streak = 0;
    for (let r = 0; r < gridSize; r ++) {
        for (let c = 0; c < gridSize; c ++) {
            if ((grid[r][c][0] === player && grid[r][c][1] === undefined) || grid[r][c][1] === player) {
                streak ++;
            }
        }
        if (streak === gridSize) {
            return player;
        }
        streak = 0;
    }

    // Check Horizontals
    for (let c = 0; c < gridSize; c ++) {
        for (let r = 0; r < gridSize; r ++) {
            if ((grid[r][c][0] === player && grid[r][c][1] === undefined) || grid[r][c][1] === player) {
                streak ++;
            }
        }
        if (streak === gridSize) {
            return player;
        }
        streak = 0;
    }

    // Check Diagonals
    for (let d = 0; d < gridSize; d ++) {
        if ((grid[d][d][0] === player && grid[d][d][1] === undefined) || grid[d][d][1] === player) {
            streak ++;
        }
    }

    if (streak === gridSize) {
        return player;
    }

    streak = 0;

    for (let d = 0; d < gridSize; d ++) {
        if ((grid[d][gridSize-1-d][0] === player && grid[d][gridSize-1-d][1] === undefined) || grid[d][gridSize-1-d][1] === player) {
            streak ++;
        }
    }

    if (streak === gridSize) {
        return player;
    }

    return -1;
}