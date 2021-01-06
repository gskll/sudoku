import React, { useEffect, useRef, useState } from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import SudokuField from './SudokuField';

const SudokuBoard = ({ sudokuBoard, showSolution }) => {
  const [sudoku, setSudoku] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [boardSolved, setBoardSolved] = useState(false);

  ///////////////// HANDLE ALL FIELD DESELECT ON CLICK OUTSIDE BOARD

  // Use a ref to handle UX bug where field stays selected
  // when click outside of the board

  // Attach a ref to the board, with event handlers to setSelectedField to null
  // if the click is outside of the board

  const boardRef = useRef();

  const onBodyClick = event => {
    if (boardRef.current && boardRef.current.contains(event.target)) {
      return;
    }
    setSelectedField(null);
  };

  useEffect(() => {
    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  /////////////// END OF DESELECT ON OUTSIDE BOARD CLICK HANDLING

  useEffect(() => setSudoku(sudokuBoard), [sudokuBoard]);

  const updateField = (index, updatedValue) => {
    const board = sudoku.map(field =>
      field.index === index ? { ...field, value: updatedValue } : field
    );
    setSudoku(board);
  };

  if (showSolution && !boardSolved) {
    const solvedBoard = sudoku.map(field => {
      if (field.readonly) {
        return field;
      }

      return { ...field, lastGuess: field.value, value: field.solution };
    });
    setSudoku(solvedBoard);
    setBoardSolved(true);
  }

  return (
    <Grid
      ref={boardRef}
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
