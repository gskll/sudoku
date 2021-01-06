import { makepuzzle, solvepuzzle } from 'sudoku';

/*
 * Generates a sudoku board with structure:
 * {rows: [{index: 0, cols: [{row: 0, col: 0, value: 1, readonly: true, solution: 1}, ...]}, ...]}
 */

const generateSudoku = () => {
  const raw = makepuzzle();
  const solved = solvepuzzle(raw);

  const board = { rows: [] };

  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };

    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      const value = raw[index];
      const solution = solved[index];

      const col = {
        row: i,
        col: j,
        value,
        solution,
        readonly: value !== null,
      };

      row.cols.push(col);
    }

    board.rows.push(row);
  }

  return board;
};

export default generateSudoku;
