function whoIsWinner(piecesPositionList) {
  let A = ["", "", "", "", "", ""];
  let B = ["", "", "", "", "", ""];
  let C = ["", "", "", "", "", ""];
  let D = ["", "", "", "", "", ""];
  let E = ["", "", "", "", "", ""];
  let F = ["", "", "", "", "", ""];
  let G = ["", "", "", "", "", ""];

  let columns = [A, B, C, D, E, F, G];
  let stringColumns = ["A", "B", "C", "D", "E", "F", "G"];

  let winner = "";

  function checkColumn(column, color, index) {
    if (index <= 2) return false;
    if (
      color === column[index - 3] &&
      color === column[index - 2] &&
      color === column[index - 1]
    ) {
      return true;
    } else return false;
  }

  function checkRowAndDiagonal(column, color, index) {
    let columnIndex = columns.indexOf(column);

    let move = column[index];

    let prevInline = columnIndex >= 1 ? columns[columnIndex - 1][index] : null;
    let prevAbove =
      columnIndex === 0
        ? null
        : index <= 4
        ? columns[columnIndex - 1][index + 1]
        : null;
    let prevBelow =
      columnIndex === 0
        ? null
        : index === 0
        ? null
        : columns[columnIndex - 1][index - 1];

    let scndPrevInline =
      columnIndex >= 2 ? columns[columnIndex - 2][index] : null;
    let scndPrevAbove =
      columnIndex < 2
        ? null
        : index <= 3
        ? columns[columnIndex - 2][index + 2]
        : null;
    let scndPrevBelow =
      columnIndex < 2
        ? null
        : index <= 1
        ? null
        : columns[columnIndex - 2][index - 2];

    let thirdPrevInline =
      columnIndex >= 3 ? columns[columnIndex - 3][index] : null;
    let thirdPrevAbove =
      columnIndex < 3
        ? null
        : index <= 2
        ? columns[columnIndex - 3][index + 3]
        : null;
    let thirdPrevBelow =
      columnIndex < 3
        ? null
        : index <= 2
        ? null
        : columns[columnIndex - 3][index - 3];

    let nextInline = columnIndex <= 5 ? columns[columnIndex + 1][index] : null;
    let nextAbove =
      columnIndex === 6
        ? null
        : index <= 4
        ? columns[columnIndex + 1][index + 1]
        : null;
    let nextBelow =
      columnIndex === 6
        ? null
        : index === 0
        ? null
        : columns[columnIndex + 1][index - 1];

    let scndNextInline =
      columnIndex <= 4 ? columns[columnIndex + 2][index] : null;
    let scndNextAbove =
      columnIndex >= 5
        ? null
        : index <= 3
        ? columns[columnIndex + 2][index + 2]
        : null;
    let scndNextBelow =
      columnIndex >= 5
        ? null
        : index <= 1
        ? null
        : columns[columnIndex + 2][index - 2];

    let thirdNextInline =
      columnIndex <= 3 ? columns[columnIndex + 3][index] : null;
    let thirdNextAbove =
      columnIndex > 3
        ? null
        : index <= 2
        ? columns[columnIndex + 3][index + 3]
        : null;
    let thirdNextBelow =
      columnIndex > 3
        ? null
        : index <= 2
        ? null
        : columns[columnIndex + 3][index - 3];

    //check for inline win
    if (
      move === nextInline &&
      move === scndNextInline &&
      move === thirdNextInline
    )
      return true;
    if (move === prevInline && move === nextInline && move === scndNextInline)
      return true;
    if (move === scndPrevInline && move === prevInline && move === nextInline)
      return true;
    if (
      move === thirdPrevInline &&
      move === scndPrevInline &&
      move === prevInline
    )
      return true;

    //check for diagonal win
    if (move === nextAbove && move === scndNextAbove && move === thirdNextAbove)
      return true;
    if (move === nextBelow && move === scndNextBelow && move === thirdNextBelow)
      return true;
    if (move === prevAbove && move === nextBelow && move === scndNextBelow)
      return true;
    if (move === prevBelow && move === nextAbove && move === scndNextAbove)
      return true;
    if (move === scndPrevAbove && move === prevAbove && move === nextBelow)
      return true;
    if (move === scndPrevBelow && move === prevBelow && move === nextAbove)
      return true;
    if (move === thirdPrevAbove && move === scndPrevAbove && move === prevAbove)
      return true;
    if (move === thirdPrevBelow && move === scndPrevBelow && move === prevBelow)
      return true;

    return false;
  }

  for (let i = 0; i < piecesPositionList.length; i++) {
    if (winner !== "") return;

    let move = piecesPositionList[i];
    let playedColumn = columns[stringColumns.indexOf(move.substring(0, 1))];
    let playedColor = move.substring(2);
    let index = playedColumn.indexOf("");

    playedColumn[index] = playedColor;

    if (checkRowAndDiagonal(playedColumn, playedColor, index)) {
      return (winner = playedColor);
    }
    if (checkColumn(playedColumn, playedColor, index)) {
      return (winner = playedColor);
    }
    if (i === piecesPositionList.length - 1) {
      return (winner = "Draw");
    }
  }
}
