import React, { useEffect, useRef, useState } from 'react';
import { Flex, Grid, Spinner } from '@chakra-ui/react';

import checkSubGridBorder from '../utils/checkSubGridBorder';
import checkSolvedBoard from '../utils/checkSolvedBoard';
import highlightRelevantFields from '../utils/highlightRelevantFields';

import SudokuField from './SudokuField';

import useBoardRef from '../hooks/useBoardRef';
import useSolveBoard from '../hooks/useSolveBoard';

const SudokuBoard = ({ sudokuBoard, showSolution }) => {
  const boardRef = useRef();

  const [sudoku, setSudoku] = useState([]);
  const [sudokuMap, setSudokuMap] = useState({});

  const [selectedField, setSelectedField] = useState({});

  const [notEditableErrorShown, setNotEditableErrorShown] = useState(false);

  // Add event handler to deselect board fields on body click
  useBoardRef(boardRef, setSelectedField);

  // Handle logic when board is solved
  // When showSolution changes
  const solveBoard = useSolveBoard(
    showSolution,
    sudoku,
    sudokuMap,
    setSudokuMap,
    setSudoku,
    setSelectedField
  );

  useEffect(() => {
    setSudoku(sudokuBoard.board);
    setSudokuMap(sudokuBoard.boardMapping);
  }, [sudokuBoard]);

  const handleSetSelectedField = field => {
    const { index, row, col, value } = field;
    const gridIndicesToHighlight = highlightRelevantFields(index, row, col);
    const sameDigitIndicesToHighlight = sudokuMap[parseInt(value)];

    setSelectedField({
      field,
      gridIndicesToHighlight,
      sameDigitIndicesToHighlight,
    });
  };

  const handleMapUpdate = (index, value) => {
    value = parseInt(value);

    const map = {
      ...sudokuMap,
      [value]: [...sudokuMap[value], index],
    };

    setSudokuMap(map);
  };

  const updateField = (index, updatedValue) => {
    updatedValue = parseInt(updatedValue);
    const board = sudoku.map(field =>
      field.index === index
        ? { ...field, value: updatedValue, readonly: true }
        : field
    );

    handleMapUpdate(index, updatedValue);
    handleSetSelectedField(board[index]);
    const solved = checkSolvedBoard(board);

    solved ? solveBoard() : setSudoku(board);
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
          handleSetSelectedField={handleSetSelectedField}
          notEditableErrorShown={notEditableErrorShown}
          setNotEditableErrorShown={setNotEditableErrorShown}
        />
      </Flex>
    );
  };

  if (!sudoku) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <Grid
      ref={boardRef}
      w={['80vw', '70vh']}
      h={['100%', '70vh']}
      maxH={['100vw', '100%']}
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
