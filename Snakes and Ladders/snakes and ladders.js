function SnakesLadders() {
  this.position = { 1: 0, 2: 0 };
  this.currPlayer = 1;
  this.gameOver = false;
  this.road = {
    2: 38,
    7: 14,
    8: 31,
    15: 26,
    16: 6,
    21: 42,
    28: 84,
    36: 44,
    46: 25,
    49: 11,
    51: 67,
    62: 19,
    64: 60,
    71: 91,
    74: 53,
    78: 98,
    87: 94,
    89: 68,
    92: 88,
    95: 75,
    99: 80,
  };
}

SnakesLadders.prototype.play = function (die1, die2) {
  if (this.gameOver) return "Game over!";

  let currPlayer = this.currPlayer;
  let opponent = currPlayer == 1 ? 2 : 1;

  this.position[currPlayer] += die1 + die2;

  if (this.position[currPlayer] == 100) {
    this.gameOver = true;
    return `Player ${currPlayer} Wins!`;
  } else if (this.position[currPlayer] > 100) {
    this.position[currPlayer] = 100 - (this.position[currPlayer] - 100);
  }

  // check for snake or ladder
  if (this.road[this.position[currPlayer]]) {
    this.position[currPlayer] = this.road[this.position[currPlayer]];
  }

  let result = `Player ${currPlayer} is on square ${this.position[currPlayer]}`;
  //currPlayer plays again if he rolled doubles
  die1 == die2 ? (this.currPlayer = currPlayer) : (this.currPlayer = opponent);

  return result;
};
