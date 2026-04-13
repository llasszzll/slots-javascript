// Welcome to the Slot Machine JS

// Start Here. 
// 1. Deposit money
// 2. Determine number of lines to bet
// 3. Collect bet amount
// 4. Spin Slot Machine
// 5. Check if user has won
// 6. Give user the earnings if won
// 7. Restart / Play Again


const prompt = require("prompt-sync")();

// Global Variables
const ROWS = 3;
const COLS = 3;

// Symbols (OBJECT)
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

// 1
const deposit = () => {
    while (true) {
        // ask user to enter the amount
        const depositAmount = prompt("Enter a deposit amount: ")

        // convert amount to INT
        const numberDepositAmount = parseFloat(depositAmount);

        // check if number is valid
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid Deposit Amount. Try Again");
        } else {
            return numberDepositAmount
        }
    }
}

// 2 
const getNumberOfLines = () => {
    while (true) {
        // ask user to enter number of lines
        const lines = prompt("Enter number of lines to bet on (1-3): ")

        // convert amount to INT
        const numberOfLines = parseFloat(lines);

        // check if number is valid
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid Number of Lines. Try Again");
        } else {
            return numberOfLines
        }
    }
}

// 3
const getBet = (balance, lines) => {
    while (true) {
        // ask user to enter Bet
        const bet = prompt("Enter Total Bet per line: ")

        // convert BET to INT
        const numberBet = parseFloat(bet);

        // check if BET is valid
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid Bet. Try Again");
        } else {
            return numberBet;
        }
    }
}

// 4
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol)
        }
    }
    // array inside of an array
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([])
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            // remove symbol to not be selected again
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

// 5
// Check if the ROWS are a winning combination
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

// Print the rows
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";

        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            // Check if symbol is last index. If true, add |
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

// 6
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];

        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
}

// 7
const game = () => {
    let balance = deposit();

    while (true) {
        console.log("Your balance is R" + balance)
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You Won, R" + winnings.toString());

        if (balance <= 0) {
            console.log("You have 0 balance. Please add Deposit");
            break;
        }
        const playAgain = prompt("Do you want to play again? ( Y/N )");

        if (playAgain != "y") break;
    }
}

game();




