import React, { useEffect, useRef, useState } from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import SudokuField from './SudokuField';
import checkSubGridBorder from '../utils/checkSubGridBorder';

const SudokuBoard = ({ sudokuBoard, showSolution }) => {
  const [sudoku, setSudoku] = useState([]);
  const [selectedField, setSelectedField] = useState({});

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
    setSelectedField({});
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

  useEffect(() => {
    if (showSolution) {
      const solvedBoard = sudoku.map(field => {
        if (field.readonly) {
          return field;
        }

        return { ...field, lastGuess: field.value, value: field.solution };
      });
      setSudoku(solvedBoard);
      setSelectedField({});
    }
  }, [showSolution]);

  const updateField = (index, updatedValue) => {
    const board = sudoku.map(field =>
      field.index === index
        ? { ...field, value: parseInt(updatedValue) }
        : field
    );
    setSudoku(board);
  };

  const renderBoardField = field => {
    const border = checkSubGridBorder(field);

    return (
      <Flex key={field.index} align="center" justify="center" {...border}>
        <SudokuField
          field={field}
          updateField={updateField}
          key={field.index * 2}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          showSolution={showSolution}
        />
      </Flex>
    );
  };

  return (
    <Grid
      ref={boardRef}
      boxSize={{ sm: '80vw', lg: '80vh' }}
      templateColumns="repeat(9, 1fr)"
      templateRows="repeat(9, 1fr)"
      m={15}
      fontSize="1.5em"
    >
      {sudoku.map(field => renderBoardField(field))}
    </Grid>
  );
};

export default SudokuBoard;
