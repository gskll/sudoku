import { makepuzzle } from 'sudoku';
import convertSudokuToBoard from './convertSudokuToBoard';

/*
 * Generates a sudoku board with structure:
 * {rows: [{index: 0, cols: [{row: 0, col: 0, value: 1, readonly: true}, ...]}, ...]}
 */

const generateSudoku = () => {
  const rawSudoku = makepuzzle();

  const board = convertSudokuToBoard(rawSudoku);

  return {
    rawSudoku,
    board,
  };
};

export default generateSudoku;
