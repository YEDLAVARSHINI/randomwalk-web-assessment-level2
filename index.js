/// script.js
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0 };

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

// Initialize Game
function initializeGame() {
    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.classList.remove('taken');
        cell.addEventListener('click', () => handleCellClick(index), { once: true });
    });
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = Player ${currentPlayer}'s Turn; // Fixed template literal
}

// Handle Cell Click
function handleCellClick(index) {
    if (gameState[index] !== '') return;

    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add('taken');

    if (checkWinner(currentPlayer)) {
        statusText.textContent = Player ${currentPlayer} Wins!; // Fixed template literal
        scores[currentPlayer]++;
        updateScores();
        disableCells();
    } else if (gameState.every(cell => cell !== '')) {
        statusText.textContent = "It's a Draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = Player ${currentPlayer}'s Turn; // Fixed template literal
    }
}

// Check for Winner
function checkWinner(player) {
    return winningPatterns.some(pattern => 
        pattern.every(index => gameState[index] === player)
    );
}

// Update Scores
function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

// Disable Cells After Game Ends
function disableCells() {
    cells.forEach(cell => cell.classList.add('taken'));
}

// Restart Game
restartBtn.addEventListener('click', () => {
    currentPlayer = 'X';
    initializeGame();
});

// Initialize First Game
initializeGame();