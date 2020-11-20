class TicTacToe {
  constructor() {
    this.positions = {
      1: [0, 0],
      2: [0, 1],
      3: [0, 2],
      4: [1, 0],
      5: [1, 1],
      6: [1, 2],
      7: [2, 0],
      8: [2, 1],
      9: [2, 2],
    };

    this.computerStrat = [5, 1, 3, 7, 9, 2, 4, 6, 8];

    this.grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.currPlayer = "X";
    this.player = "human";
    this.gameOver = false;
  }

  move(field) {
    // Check if the game ended before the move
    if (this.gameOver) return [0, "Game ended"];

    // Check if the human player is taking a turn
    field ? (this.player = "human") : (this.player = "computer");

    // Player takes a turn
    if (this.player === "human") {
      if (this.getPosition(field) === 0) {
        this.setPosition(field);
        this.switchSides();
      } else return [0, "Illegal move"];
    }

    // Check if player won or ended the game:
    if (this.checkWin()) {
      this.gameOver = true;
      return [0, "You win!"];
    }
    if (this.checkDraw()) {
      this.gameOver = true;
      return [0, "Draw!"];
    }

    // Computer takes turn
    let computerMove = this.getComputerMove();
    this.setPosition(computerMove);

    //check if the computer won or ended the game
    if (this.checkWin()) {
      this.gameOver = true;
      return [computerMove, "I win!"];
    }
    if (this.checkDraw()) {
      this.gameOver = true;
      return [computerMove, "Draw!"];
    }

    //switch sides
    this.switchSides();

    // return the past computer move if the game is still going
    return [computerMove, "Your move?"];
  }

  checkWin() {
    return (
      this.checkFor3(this.getRow(1)) ||
      this.checkFor3(this.getRow(2)) ||
      this.checkFor3(this.getRow(3)) ||
      this.checkFor3(this.getCol(1)) ||
      this.checkFor3(this.getCol(2)) ||
      this.checkFor3(this.getCol(3)) ||
      this.checkFor3(this.getDiagonale(1)) ||
      this.checkFor3(this.getDiagonale(2))
    );
  }

  checkDraw() {
    return (
      this.grid.reduce((a, b) => a.concat(b), []).filter((el) => el !== 0)
        .length === 9 && !this.checkWin()
    );
  }

  switchSides() {
    this.currPlayer === "X" ? (this.currPlayer = "O") : (this.currPlayer = "X");
  }

  getComputerMove() {
    for (let i = 0; i <= 8; i++) {
      let computerMove = this.computerStrat[i];
      if (this.getPosition(computerMove) === 0) return computerMove;
    }
  }

  getPosition(num) {
    let position = this.positions[num];
    return this.grid[position[0]][position[1]];
  }

  setPosition(num) {
    let position = this.positions[num];
    this.grid[position[0]][position[1]] = this.currPlayer;
  }

  getRow(rowNum) {
    return this.grid[rowNum - 1];
  }

  getCol(colNum) {
    return this.grid.map((row) => row[colNum - 1]);
  }

  getDiagonale(num) {
    let i = num === 1 ? 0 : 2;
    let diag = [];

    if (num === 1) {
      this.grid.forEach((row) => {
        diag.push(row[i]);
        i++;
      });
    }

    if (num === 2) {
      this.grid.forEach((row) => {
        diag.push(row[i]);
        i--;
      });
    }

    return diag;
  }

  checkFor3(arr) {
    if (arr.filter((el, idx) => el === 0).length >= 1) return false;
    let symbol = arr[0];
    return arr.filter((el) => el === symbol).length === 3;
  }
}
