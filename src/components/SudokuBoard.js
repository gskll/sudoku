import React from 'react';
import { Box } from '@chakra-ui/react';
import SudokuField from './SudokuField';

const SudokuBoard = ({ sudoku }) => {
  return (
    <Box>
      {sudoku.rows.map(row => (
        <Box key={row.index}>
          {row.cols.map(field => (
            <SudokuField field={field} key={field.col} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default SudokuBoard;
