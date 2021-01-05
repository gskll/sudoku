import { makepuzzle } from 'sudoku';

/*
 * Generates a sudoku board with structure:
 * {rows: [{index: 0, cols: [{row: 0, col: 0, value: 1, readonly: true}, ...]}, ...]}
 */

const generateSudoku = () => {
  const raw = makepuzzle();
  const result = { rows: [] };

  for (let i = 0; i < 9; i++) {
    const row = { index: i, cols: [] };

    for (let j = 0; j < 9; j++) {
      const value = raw[i * 9 + j];

      const col = {
        row: i,
        col: j,
        value: value,
        readonly: value !== null,
      };

      row.cols.push(col);
    }

    result.rows.push(row);
  }

  return result;
};

export default generateSudoku;
