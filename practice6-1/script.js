const numbersInput = document.getElementById('numbersInput');
const sortResult = document.getElementById('sortResult');

function showSortMessage(text, type) {
    sortResult.textContent = text;
    sortResult.className = 'result ' + type;
}

function readNumbers() {
    const text = numbersInput.value.trim();
    if (text === '') {
        showSortMessage('Please enter some numbers, for example: 8, 3, 12, 1', 'error');
        return null;
    }

    const parts = text.split(',').map((part) => part.trim());
    const numbers = [];

    for (const part of parts) {
        if (part === '') {
            showSortMessage('There is an empty value between commas. Remove the extra comma.', 'error');
            return null;
        }
        const number = Number(part);
        if (isNaN(number)) {
            showSortMessage('"' + part + '" is not a number. Use only numbers separated by commas.', 'error');
            return null;
        }
        numbers.push(number);
    }
    return numbers;
}

function sortNumbers(order) {
    const numbers = readNumbers();
    if (numbers === null) return;

    if (order === 'asc') {
        numbers.sort((a, b) => a - b);
    } else {
        numbers.sort((a, b) => b - a);
    }
    showSortMessage((order === 'asc' ? 'Ascending: ' : 'Descending: ') + numbers.join(', '), 'success');
}

document.getElementById('sortAscBtn').addEventListener('click', () => sortNumbers('asc'));
document.getElementById('sortDescBtn').addEventListener('click', () => sortNumbers('desc'));


function showDateTime() {
    const now = new Date();
    document.getElementById('dateTime').textContent = now.toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

showDateTime();
setInterval(showDateTime, 1000);


const colors = ['white', 'red', 'blue', 'green', 'black', 'yellow'];
let colorIndex = 0;

document.getElementById('bgBtn').addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.background = colors[colorIndex];
    document.getElementById('bgName').textContent = 'Current color: ' + colors[colorIndex];
});


const guessInput = document.getElementById('guessInput');
const guessResult = document.getElementById('guessResult');
const attemptsText = document.getElementById('attempts');
let secretNumber;
let attempts;

function newGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessInput.value = '';
    guessResult.textContent = '';
    attemptsText.textContent = 'Attempts: 0';
}

document.getElementById('guessBtn').addEventListener('click', () => {
    const guess = Number(guessInput.value);

    if (guessInput.value.trim() === '' || !Number.isInteger(guess) || guess < 1 || guess > 100) {
        guessResult.textContent = 'Enter a whole number from 1 to 100.';
        guessResult.className = 'result error';
        return;
    }

    attempts++;
    attemptsText.textContent = 'Attempts: ' + attempts;

    if (guess > secretNumber) {
        guessResult.textContent = guess + ' is too high!';
        guessResult.className = 'result error';
    } else if (guess < secretNumber) {
        guessResult.textContent = guess + ' is too low!';
        guessResult.className = 'result error';
    } else {
        guessResult.textContent = 'Correct! The number was ' + secretNumber + '. You needed ' + attempts + ' attempts.';
        guessResult.className = 'result success';
    }
});

document.getElementById('newGameBtn').addEventListener('click', newGame);

newGame();
