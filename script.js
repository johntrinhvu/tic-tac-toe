// John Vu
// 17 April 2023
// JS File of Tic-Tac-Toe

// Testing commit
/* Constants Variables */
const CHOICES = {
    "0": "",
    "1": "X",
    "-1": "O"

}

const COLORS = {
    "0": "", // base color
    "1": "#0096FF", // light blue (X)'s
    "-1": "#ff6961", // light red (O)'s
    "draw": "#5C4033" // color when there is Draw

}
/* State Variables */
let board;
let turn;
let winner;

/* Cached Elements */
const messageEl = document.querySelector("h1");
const resetBoardBtn = document.querySelector("button");
const cells = document.querySelectorAll(".cell");

/* Event Listeners */
// the empty 0's on the board
cells.forEach(function(cell) {
    cell.addEventListener('click', handleDrop)
    
});

resetBoardBtn.addEventListener("click", init);

/* Functions */

// calling init
init();

function init() {
    board = [
        [0, 0, 0],  // col0
        [0, 0, 0],  // col1
        [0, 0, 0]   // col2
    ]
    
    turn = 1;
    winner = null;
    render();

}

/* REST OF FUNCTIONS */
function handleDrop(evt) {
    const clickedCell = evt.target.id;
    
    const colIdx = parseInt(clickedCell[1]);
    const rowIdx = parseInt(clickedCell[3]);
    // Guards
    if (board[colIdx][rowIdx] || winner) {
        return;

    }

    // Update state of board
    board[colIdx][rowIdx] = turn;

    turn *= -1
    
    // set a winner
    winner = getWinner(colIdx, rowIdx);
    render();

}

// Check for winner in board state and return null if no winner/ 1-1 if player win/ "T" tie
function getWinner(colIdx, rowIdx) {
    // declare empty squares
    let emptySquares = 0;

    // iterate and make nested for loop for col, arr
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            // if the board at that col and arr is = 0, then add to the emptSquare count
            if (board[i][j] === 0) {
                emptySquares++;

            }
        }
    }

    if (emptySquares === 0) {
        return "T";

    }
    return checkVerticalWin(colIdx, rowIdx) || 
      checkHorizontalWin(colIdx, rowIdx) || 
      checkDiagonalWinNESW(colIdx, rowIdx) || 
      checkDiagonalWinNWSE(colIdx, rowIdx);
    
}

function checkVerticalWin(colIdx, rowIdx) {
    const adjCountTop = countAdjacent(colIdx, rowIdx, 0, -1);
    const adjCountBottom = countAdjacent(colIdx, rowIdx, 0, 1);
    return (adjCountTop + adjCountBottom) === 2 ? board[colIdx][rowIdx] : null;
}
    
  
function checkHorizontalWin(colIdx, rowIdx) {
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
    return (adjCountLeft + adjCountRight) === 2 ? board[colIdx][rowIdx] : null;
    
}
  
function checkDiagonalWinNESW(colIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1);
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1);
    return (adjCountNE + adjCountSW) === 2 ? board[colIdx][rowIdx] : null;
    
}
  
function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1);
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1);
    return (adjCountNW + adjCountSE) === 2 ? board[colIdx][rowIdx] : null;
    
}
  
function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    // Shortcut Variable to the player value
    const player = board[colIdx][rowIdx];

    // track count of adjacent cells with the same player value
    let count = 0;
    // Initialize new coordinates
    colIdx += colOffset;
    rowIdx += rowOffset;
    
    while (
      // Ensure colIdx is within bounds of the board array
      board[colIdx] !== undefined && 
      board[colIdx][rowIdx] !== undefined &&
      board[colIdx][rowIdx] === player
    ) {
      count++;
      colIdx += colOffset;
      rowIdx += rowOffset;
      
    }
    return count;
    
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();

}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.innerHTML = `<span style="color: ${COLORS[cellVal]}">${CHOICES[cellVal]}</span>`

        });
    });
}

function renderMessage() {
    // if tie
    if (winner === "T") {
        messageEl.innerHTML = `<span style="color: ${COLORS.draw};font-size:4vmin">DRAW</span>`
        

    } else if (winner) {
        // we have winner
        messageEl.innerHTML = `<span style="color: ${COLORS[winner]};font-size:4vmin">${CHOICES[winner]}</span> WINS!`
        
    } else {
        // Game is still in play
        messageEl.innerHTML = `<span style="color: ${COLORS[turn]};font-size:4vmin">${CHOICES[turn]}</span>'s TURN`
    }
}

function renderControls() {
    resetBoardBtn.style.visibility = winner ? "visible": "hidden";

}
