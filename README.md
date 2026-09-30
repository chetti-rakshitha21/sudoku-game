# Sudoku Game

An interactive Sudoku game built with vanilla HTML, CSS, and JavaScript!

## Features

✨ **Game Modes**
- **Easy**: 30 cells removed
- **Medium**: 40 cells removed (default)
- **Hard**: 50 cells removed

🎮 **Gameplay**
- Click on any empty cell to select it
- Use number keys (1-9) to fill cells
- Press 0, Backspace, or Delete to clear a cell
- Press Escape to deselect

🎯 **Controls**
- **New Game**: Start a fresh puzzle with the selected difficulty
- **Solve**: Automatically solve the puzzle
- **Clear**: Clear all your entries (keeps original numbers)
- **Difficulty Selector**: Switch between Easy, Medium, and Hard

⏱️ **Timer**
- Automatic timer starts when you begin a game
- Displays your completion time when you win

✓ **Win Detection**
- Automatically detects when you've solved the puzzle correctly
- Shows congratulations message with your time

## How to Play

1. Select a difficulty level from the dropdown
2. Click "New Game" to generate a puzzle
3. Click on empty cells and type numbers 1-9 to fill them
4. Complete the puzzle following standard Sudoku rules:
   - Each row must contain digits 1-9
   - Each column must contain digits 1-9
   - Each 3×3 box must contain digits 1-9
5. The game will notify you when you've solved it!

## Local Setup

Simply open `index.html` in your web browser to play!

```bash
git clone https://github.com/chetti-rakshitha21/sudoku-game.git
cd sudoku-game
open index.html  # or double-click index.html
```

## How It Works

- **Board Generation**: Uses backtracking algorithm to generate valid Sudoku puzzles
- **Validation**: Checks moves against Sudoku rules in real-time
- **Solver**: Implements backtracking algorithm to solve puzzles
- **UI Feedback**: Highlights selected cells and related rows/columns/boxes

## Technologies

- **HTML5** - Structure
- **CSS3** - Styling with gradients and flexbox
- **JavaScript (ES6+)** - Game logic and interactivity

## License

MIT License - Feel free to fork and modify!

## Contributing

Pull requests are welcome! Feel free to submit issues and enhancement requests.
