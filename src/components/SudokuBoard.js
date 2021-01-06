import React, { useEffect, useState } from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import SudokuField from './SudokuField';

const SudokuBoard = ({ sudokuBoard }) => {
  const [sudoku, setSudoku] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  useEffect(() => setSudoku(sudokuBoard), [sudokuBoard]);

  const updateField = (index, updatedValue) => {
    const board = sudoku.map(field =>
      field.index === index ? { ...field, value: updatedValue } : field
    );
    setSudoku(board);
  };

  return (
    <Grid
      boxSize={{ sm: '80vw', lg: '80vh' }}
      templateColumns="repeat(9, 1fr)"
      templateRows="repeat(9, 1fr)"
      m={15}
    >
      {sudoku.map(field => {
        const border = { border: null };

        if (field.col === 2 || field.col === 5) {
          border.borderRightColor = 'gray.300';
          border.borderRightStyle = 'solid';
          border.borderRightWidth = '.5vh';
        }

        if (field.row === 2 || field.row === 5) {
          border.borderBottomColor = 'gray.300';
          border.borderBottomStyle = 'solid';
          border.borderBottomWidth = '.5vh';
        }

        return (
          <Flex key={field.index} align="center" justify="center" {...border}>
            <SudokuField
              field={field}
              updateField={updateField}
              key={field.index * 2}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
            />
          </Flex>
        );
      })}
    </Grid>
  );
};

export default SudokuBoard;
