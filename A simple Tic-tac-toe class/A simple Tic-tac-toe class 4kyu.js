function TicTacToe() {
  this.positions = {
    1: [0, 1],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
  };
  this.computerMoves = {
    1: [1, 1],
    2: [0, 1],
    3: [0, 2],
    4: [2, 0],
    5: [2, 2],
    6: [0, 1],
    7: [1, 0],
    8: [1, 2],
    9: [2, 1],
  };
  this.grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  this.currPlayer = "X";
  this.player = "human";
  this.firstMove = true;
  this.gameOver = false;
}

TicTacToe.prototype.getPosition = function (num) {
  let position = this.positions[num];
  return this.grid[position[0]][position[1]];
};

TicTacToe.prototype.setPosition = function (num) {
  let position = this.positions[num];
  this.grid[position[0]][position[1]] = this.currPlayer;
};

TicTacToe.prototype.getRow = function (rowNum) {
  return this.grid[rowNum - 1];
};

TicTacToe.prototype.getCol = function (colNum) {
  return this.grid.map((row) => row[colNum - 1]);
};

TicTacToe.prototype.getDiag = function () {
  let i = 0;
  let diag = [];
  this.grid.forEach((row) => {
    diag.push(row[i]);
    i++;
  });
  return diag;
};

TicTacToe.prototype.checkFor3 = function (arr) {
  return arr.every((el, idx, arr) => el === arr[0]);
};

TicTacToe.prototype.checkWin = function () {
  return (
    this.checkFor3(this.getRow(1)) ||
    this.checkFor3(this.getRow(2)) ||
    this.checkFor3(this.getRow(3)) ||
    this.checkFor3(this.getCol(1)) ||
    this.checkFor3(this.getCol(2)) ||
    this.checkFor3(this.getCol(3)) ||
    this.checkFor3(this.getDiag())
  );
};

TicTacToe.prototype.checkDraw = function () {
  return (
    this.grid.reduce((a, b) => a.concat(b), []).filter((el) => el !== null)
      .length === 9 && !this.checkWin()
  );
};

TicTacToe.prototype.move = function (field) {
  field ? (this.player = "human") : (this.player = "computer");

  if (this.gameOver) return [0, "Game ended"];

  if (this.player === "human") {
    if (this.getPosition(field) === null) {
      this.setPosition(field);
      this.currPlayer === "X"
        ? (this.currPlayer = "O")
        : (this.currPlayer = "X");
      this.player = "computer";
    }
  }

  if (this.player === "computer") {
    for (let i = 1; i <= 9; i++) {
      if (this.getPosition(i) === null) {
        return;
      }
    }
  }

  this.currPlayer === "X" ? (this.currPlayer = "O") : (this.currPlayer = "X");
};

let ttt = new TicTacToe();

console.log(ttt);
