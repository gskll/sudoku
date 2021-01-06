import React from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import SudokuField from './SudokuField';

// TODO: control elements to ensure numbers

const SudokuBoard = ({ sudoku }) => {
  console.log(sudoku);
  return (
    <Grid
      boxSize={{ sm: '80vw', lg: '80vh' }}
      templateColumns="repeat(9, 1fr)"
      templateRows="repeat(9, 1fr)"
      m={15}
    >
      {sudoku.map(el => {
        const border = { border: null };

        if (el.col === 2 || el.col === 5) {
          border.borderRightColor = 'gray.300';
          border.borderRightStyle = 'solid';
          border.borderRightWidth = '.5vh';
        }

        if (el.row === 2 || el.row === 5) {
          border.borderBottomColor = 'gray.300';
          border.borderBottomStyle = 'solid';
          border.borderBottomWidth = '.5vh';
        }

        return (
          <Flex key={el.index} align="center" justify="center" {...border}>
            <SudokuField field={el} key={el.index * 2} />
          </Flex>
        );
      })}
    </Grid>
  );
};

export default SudokuBoard;
