
//grid[row][column][layer]
grid = [];
lastMove = [];
const gridSize = 3;

for (let i = 0; i < gridSize; i ++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j ++) {
        grid[i][j] = [];
    }
}


function move(player, tile) {
    // Check if the tile was occupied by the other player last
    if (tile[0] == lastMove[0] && tile[1] == lastMove[1]) {
        return -1;
    }

    if (grid[tile[0]][tile[1]].length == 2) {
        return -1;
    }
    if (grid[tile[0]][tile[1]].length > 0) {
        grid[tile[0]][tile[1]][1] = player;
    } else {
        grid[tile[0]][tile[1]][0] = player;
    }
    lastMove = tile;
    return grid[tile[0]][tile[1]];
}

function checkWinner(player) {
    // Check Verticals
    let streak = 0;
    for (let r = 0; r < gridSize; r ++) {
        for (let c = 0; c < gridSize; c ++) {
            if (grid[r][c][0] == player || grid[r][c][1] == player) {
                streak ++;
            }
        }
        if (streak == gridSize) {
            return player;
        }
        streak = 0;
    }

    // Check Horizontals
    for (let c = 0; c < gridSize; c ++) {
        for (let r = 0; r < gridSize; r ++) {
            if (grid[r][c][0] == player || grid[r][c][1] == player) {
                streak ++;
            }
        }
        if (streak == gridSize) {
            return player;
        }
        streak = 0;
    }

    // Check Diagonals
    for (let d = 0; d < gridSize; d ++) {
        if (grid[d][d][0] == player || grid[d][d][1] == player) {
            streak ++;
        }
    }

    if (streak == gridSize) {
        return player;
    }

    streak = 0;

    for (let d = 0; d < gridSize; d ++) {
        if (grid[d][gridSize-1-d][0] == player || grid[d][gridSize-1-d][1] == player) {
            streak ++;
        }
    }

    if (streak == gridSize) {
        return player;
    }

    return -1;
}