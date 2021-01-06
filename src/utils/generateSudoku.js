import { makepuzzle, solvepuzzle } from 'sudoku';

/*
 * Generates a sudoku board with structure:
 *  [
 *    {
 *      index: int:[0-80],
 *      row: int:[0-8],
 *      col: int:[0-8],
 *      value: int:[1-9],
 *      readonly: bool,
 *      solution: int:[1-9]
 *    },
 *    ...
 *  ]
 */

const generateSudoku = () => {
  const raw = makepuzzle();
  const solved = solvepuzzle(raw);

  const board = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      const value = raw[index] ? raw[index] + 1 : null;
      const solution = solved[index] ? solved[index] + 1 : null;

      const field = {
        index,
        row: i,
        col: j,
        value,
        solution,
        readonly: value !== null,
      };

      board.push(field);
    }
  }

  return board;
};

export default generateSudoku;
