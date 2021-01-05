const convertSudokuToBoard = rawSudoku => {
  const board = { rows: [] };

  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };

    for (let j = 0; j < 9; j++) {
      const value = rawSudoku[i * 9 + j];

      const col = {
        row: i,
        col: j,
        value: value,
        readonly: value !== null,
      };

      row.cols.push(col);
    }

    board.rows.push(row);
  }

  return board;
};

export default convertSudokuToBoard;
