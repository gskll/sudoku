import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

import SudokuField from './SudokuField';

const SudokuBoard = ({ sudoku }) => {
  return (
    <>
      <Box>
        {sudoku.rows.map(row => (
          <Box key={row.index}>
            {row.cols.map(field => (
              <SudokuField field={field} key={field.col} />
            ))}
          </Box>
        ))}
      </Box>
      <Button
        leftIcon={<DownloadIcon />}
        colorScheme="blue"
        variant="solid"
        m="3vh auto"
      >
        Show Solution
      </Button>
    </>
  );
};

export default SudokuBoard;
