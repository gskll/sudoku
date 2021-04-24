const solveBoard = (board, boardMap) => {
      const solvedBoardMap = boardMap;

      // Map over current board
      // Update board mapping
      console.log(board)
      console.log(solvedBoardMap)
      const solvedBoard = board.map(field => {
        if (field.readonly) {
          return field;
        }

        // Update board mappings for same digit highlighting
        const mapKey = parseInt(field.solution);
        solvedBoardMap[mapKey].push(field.index);

        return { ...field, value: field.solution, readonly: true };
      });

      return {solvedBoardMap, solvedBoard}
};

export default solveBoard;
