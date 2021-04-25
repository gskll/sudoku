import { makepuzzle, solvepuzzle } from 'sudoku';

/*
 * Generates a sudoku board with structure:
 *  {
 *    board: [
 *        {
 *          index: int:[0-80],
 *          row: int:[0-8],
 *          col: int:[0-8],
 *          value: int:[1-9],
 *          readonly: bool,
 *          solution: int:[1-9]
 *        },
 *        ...
 *   ],
 *   boardMapping: {
 *     1 : [indices],
 *     2 : [indices],
 *     ...
 *   }
 *  }
 */

const generateSudoku = () => {
  const raw = makepuzzle();
  const solved = solvepuzzle(raw);

  const board = [];
  const boardMapping = {1:[], 2: [], 3: [], 4: [], 5: [], 6:[], 7:[], 8:[], 9:[]};

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      const value = raw[index] !== null ? raw[index] + 1 : null;
      const solution = solved[index] !== null ? solved[index] + 1 : null;

      if (value) {
        // if (boardMapping[value]) {
          boardMapping[value].push(index);
        // } else {
        //   boardMapping[value] = [index];
        // }
      }

      const field = {
        index,
        row: i,
        col: j,
        value,
        solution,
        readonly: value !== null,
        given: value !== null,
      };

      board.push(field);
    }
  }

  return { board, boardMapping };
};

export default generateSudoku;
