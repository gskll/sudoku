import { useEffect } from 'react';

const useSolveBoard = (
  showSolution,
  sudoku,
  sudokuMap,
  setSudokuMap,
  setSudoku,
  setSelectedField
) => {
  useEffect(() => {
    if (showSolution) {
      const tempBoardMap = sudokuMap;

      // Map over current board
      // Update board mapping
      const solvedBoard = sudoku.map(field => {
        if (field.readonly) {
          return field;
        }

        // Update board mappings for same digit highlighting
        const mapKey = parseInt(field.solution);
        tempBoardMap[mapKey].push(field.index);

        return { ...field, value: field.solution, readonly: true };
      });

      setSudokuMap(tempBoardMap);
      setSudoku(solvedBoard);
      setSelectedField({});
    }
  }, [showSolution]);
};

export default useSolveBoard;
