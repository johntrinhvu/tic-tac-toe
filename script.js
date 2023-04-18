// John Vu
// 17 April 2023
// JS File of Tic-Tac-Toe

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

// the empty 0's on the board
const boardEls = [...document.querySelectorAll("#board")];


/* Event Listeners */

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
            // cellEl.innerHTML = `<span style="color: ${COLORS[turn]}">${CHOICES[turn]}</span>`; = CHOICES[cellVal]
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

// const cellOne = document.getElementById('c0r2');

// cellOne.addEventListener('click', function() {
//   cellOne.innerHTML = `<span style="color: ${COLORS[turn]}">${CHOICES[turn]}</span>`;
// });
