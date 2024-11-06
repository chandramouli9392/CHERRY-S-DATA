const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = [...cells].indexOf(cell);

    if (boardState[cellIndex] !== "" || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === "" || boardState[b] === "" || boardState[c] === "") {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusText.textContent = `It's a Tie!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Current Player: ${currentPlayer}`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Current Player: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
