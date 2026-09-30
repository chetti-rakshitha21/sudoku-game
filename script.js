class SudokuGame {
    constructor() {
        this.board = [];
        this.originalBoard = [];
        this.selectedCell = null;
        this.timer = 0;
        this.timerInterval = null;
        this.difficulty = 'medium';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.newGame();
    }

    setupEventListeners() {
        document.getElementById('newGameBtn').addEventListener('click', () => this.newGame());
        document.getElementById('solveBtn').addEventListener('click', () => this.solve());
        document.getElementById('clearBtn').addEventListener('click', () => this.clear());
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            this.newGame();
        });
    }

    newGame() {
        this.board = this.generateBoard();
        this.originalBoard = this.board.map(row => [...row]);
        this.board = this.removeNumbers(this.board, this.difficulty);
        this.selectedCell = null;
        this.timer = 0;
        this.clearTimer();
        this.startTimer();
        this.render();
        document.getElementById('status').textContent = '';
        document.getElementById('status').classList.remove('success', 'error');
    }

    generateBoard() {
        const board = Array(9).fill(null).map(() => Array(9).fill(0));

        const fillBoard = (board) => {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0) {
                        const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                        for (let num of numbers) {
                            if (this.isValid(board, row, col, num)) {
                                board[row][col] = num;
                                if (fillBoard(board)) {
                                    return true;
                                }
                                board[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        };

        fillBoard(board);
        return board;
    }

    removeNumbers(board, difficulty) {
        const newBoard = board.map(row => [...row]);
        const cellsToRemove = {
            easy: 30,
            medium: 40,
            hard: 50
        };

        let removed = 0;
        while (removed < cellsToRemove[difficulty]) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (newBoard[row][col] !== 0) {
                newBoard[row][col] = 0;
                removed++;
            }
        }

        return newBoard;
    }

    isValid(board, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) return false;
        }

        // Check column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) return false;
        }

        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) return false;
            }
        }

        return true;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    render() {
        const boardEl = document.getElementById('board');
        boardEl.innerHTML = '';

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'sudoku-cell';
                cell.textContent = this.board[row][col] || '';
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (this.originalBoard[row][col] !== 0) {
                    cell.classList.add('fixed');
                }

                if (this.selectedCell && this.selectedCell.row === row && this.selectedCell.col === col) {
                    cell.classList.add('selected');
                }

                if (this.selectedCell) {
                    if (this.selectedCell.row === row || this.selectedCell.col === col) {
                        if (!(this.selectedCell.row === row && this.selectedCell.col === col)) {
                            cell.classList.add('related');
                        }
                    }

                    const sRow = Math.floor(this.selectedCell.row / 3) * 3;
                    const sCol = Math.floor(this.selectedCell.col / 3) * 3;
                    const cRow = Math.floor(row / 3) * 3;
                    const cCol = Math.floor(col / 3) * 3;
                    if (sRow === cRow && sCol === cCol) {
                        if (!(this.selectedCell.row === row && this.selectedCell.col === col)) {
                            cell.classList.add('related');
                        }
                    }
                }

                cell.addEventListener('click', (e) => {
                    this.selectCell(row, col);
                });

                boardEl.appendChild(cell);
            }
        }

        document.removeEventListener('keydown', this.keydownHandler);
        this.keydownHandler = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.keydownHandler);
    }

    selectCell(row, col) {
        if (this.originalBoard[row][col] === 0) {
            this.selectedCell = { row, col };
            this.render();
        }
    }

    handleKeyDown(e) {
        if (!this.selectedCell) return;

        const num = parseInt(e.key);
        if (num >= 1 && num <= 9) {
            this.setCellValue(this.selectedCell.row, this.selectedCell.col, num);
        } else if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') {
            this.setCellValue(this.selectedCell.row, this.selectedCell.col, 0);
        } else if (e.key === 'Escape') {
            this.selectedCell = null;
            this.render();
        }
    }

    setCellValue(row, col, value) {
        if (this.originalBoard[row][col] === 0) {
            this.board[row][col] = value;
            this.render();
            this.checkWin();
        }
    }

    checkWin() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col] === 0) return false;
            }
        }

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const num = this.board[row][col];
                const temp = this.board[row][col];
                this.board[row][col] = 0;
                if (!this.isValid(this.board, row, col, num)) {
                    this.board[row][col] = temp;
                    return false;
                }
                this.board[row][col] = temp;
            }
        }

        this.clearTimer();
        const status = document.getElementById('status');
        status.textContent = `🎉 Congratulations! You solved it in ${this.formatTime(this.timer)}!`;
        status.classList.add('success');
        return true;
    }

    solve() {
        const solveSudoku = (board) => {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0) {
                        for (let num = 1; num <= 9; num++) {
                            if (this.isValid(board, row, col, num)) {
                                board[row][col] = num;
                                if (solveSudoku(board)) {
                                    return true;
                                }
                                board[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        };

        this.board = this.board.map(row => [...row]);
        solveSudoku(this.board);
        this.clearTimer();
        const status = document.getElementById('status');
        status.textContent = '✓ Puzzle solved!';
        status.classList.add('success');
        this.render();
    }

    clear() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.originalBoard[row][col] === 0) {
                    this.board[row][col] = 0;
                }
            }
        }
        this.selectedCell = null;
        const status = document.getElementById('status');
        status.textContent = '';
        status.classList.remove('success', 'error');
        this.render();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            document.getElementById('timer').textContent = `Time: ${this.formatTime(this.timer)}`;
        }, 1000);
    }

    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});
