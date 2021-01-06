/*
 * Util function that takes a board array
 * of field objects and check to see if
 * board is solved
 */

const checkSolvedBoard = board => {
  return board.every(field => field.value === field.solution);
};

export default checkSolvedBoard;
