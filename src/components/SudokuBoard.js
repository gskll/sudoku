import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Flex, Grid, Spinner } from '@chakra-ui/react';

import checkSubGridBorder from '../utils/checkSubGridBorder';
import checkSolvedBoard from '../utils/checkSolvedBoard';
import highlightRelevantFields from '../utils/highlightRelevantFields';
import solveBoard from '../utils/solveBoard';

import SudokuField from './SudokuField';

import useBoardRef from '../hooks/useBoardRef';

const SudokuBoard = ({ sudokuBoard, showSolution }) => {
  const boardRef = useRef();

  const [sudoku, setSudoku] = useState([]);
  const [sudokuMap, setSudokuMap] = useState({});
  const [boardSolved, setBoardSolved] = useState(false);

  const [selectedField, setSelectedField] = useState({});

  const [notEditableErrorShown, setNotEditableErrorShown] = useState(false);

  // Add event handler to deselect board fields on body click
  useBoardRef(boardRef, setSelectedField);

  // Set initial state when new sudokuBoard comes in
  useEffect(() => {
    setSudoku(sudokuBoard.board);
    setSudokuMap(sudokuBoard.boardMapping);
    setBoardSolved(false);
  }, [sudokuBoard]);

  // Update board and board map with correct solutions
  const handleSolvedBoard = useCallback(() => {
    const solvedBoard = solveBoard(sudoku, sudokuMap);
    setSudoku(solvedBoard.solvedBoard);
    setSudokuMap(solvedBoard.solvedBoardMap);
  }, [sudoku, sudokuMap]);

  // Solve board when showSolution changes
  useEffect(() => {
    if (showSolution && !boardSolved) {
      handleSolvedBoard();
      setBoardSolved(true);
    }
  }, [showSolution, handleSolvedBoard, boardSolved]);

  const handleSetSelectedField = field => {
    const { index, row, col, value } = field;

    // Get indices of selected field's row, column, sub-grid
    const gridIndicesToHighlight = highlightRelevantFields(index, row, col);

    // Get indices of the other fields with the same value as the selected field
    const sameDigitIndicesToHighlight = sudokuMap[parseInt(value)];

    setSelectedField({
      field,
      gridIndicesToHighlight,
      sameDigitIndicesToHighlight,
    });
  };

  // Add new correct value to board map of indices
  const handleMapUpdate = useCallback(
    (index, value) => {
      value = parseInt(value);

      const map = {
        ...sudokuMap,
        [value]: [...sudokuMap[value], index],
      };

      setSudokuMap(map);
    },
    [sudokuMap]
  );

  // Update board and map with new correct value
  const updateField = useCallback(
    (index, updatedValue) => {
      updatedValue = parseInt(updatedValue);
      const board = sudoku.map(field =>
        field.index === index
          ? { ...field, value: updatedValue, readonly: true }
          : field
      );

      handleMapUpdate(index, updatedValue);
      // handleSetSelectedField(board[index]);
      const solved = checkSolvedBoard(board);

      solved ? handleSolvedBoard() : setSudoku(board);
    },
    [sudoku, handleMapUpdate, handleSolvedBoard]
  );

  const renderBoardField = field => {
    const border = checkSubGridBorder(field);

    return (
      <Flex key={field.index} align="center" justify="center" {...border}>
        <SudokuField
          field={field}
          updateField={updateField}
          key={field.index * 20}
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
