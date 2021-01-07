import React, { useState, useEffect } from 'react';

import {
  Button,
  ButtonGroup,
  ChakraProvider,
  Flex,
  Heading,
} from '@chakra-ui/react';

import generateSudoku from '../utils/generateSudoku';

import SudokuBoard from './SudokuBoard';
import { DownloadIcon, RepeatIcon } from '@chakra-ui/icons';

// TODO: refactor to use useEffect where appropriate
// TODO: refactor app buttons

const App = () => {
  const [sudokuBoard, setSudokuBoard] = useState({});
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setSudokuBoard(generateSudoku());
  }, []);

  const resetNewBoard = () => {
    setSudokuBoard(generateSudoku());
    setShowSolution(false);
  };

  return (
    <ChakraProvider>
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: '1200px' }}
        m="0 auto"
        h="100vh"
      >
        <Heading as="h1" m="3vh auto">
          Sweeeeeet Sudoku
        </Heading>
        <SudokuBoard sudokuBoard={sudokuBoard} showSolution={showSolution} />
        <ButtonGroup spacing="6" m="3vh auto">
          <Button
            onClick={() => setShowSolution(true)}
            disabled={showSolution}
            leftIcon={<DownloadIcon />}
            colorScheme="blue"
          >
            Show Solution
          </Button>
          <Button
            onClick={resetNewBoard}
            leftIcon={<RepeatIcon />}
            colorScheme="blue"
            variant="outline"
          >
            Play Again
          </Button>
        </ButtonGroup>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
