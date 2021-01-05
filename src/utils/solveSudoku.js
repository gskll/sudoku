import { solvepuzzle } from 'sudoku';
import convertSudokuToBoard from './convertSudokuToBoard';

const solveSudoku = rawSudoku => {
  const solvedRawSudoku = solvepuzzle(rawSudoku);

  const solvedBoard = convertSudokuToBoard(solvedRawSudoku);

  return {
    solvedRawSudoku,
    solvedBoard,
  };
};

export default solveSudoku;
