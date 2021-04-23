import React, { useState, useEffect } from 'react';

import { ChakraProvider, Flex, Heading } from '@chakra-ui/react';

import generateSudoku from '../utils/generateSudoku';

import SudokuBoard from './SudokuBoard';
import BoardButtons from './BoardButtons';


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
        <BoardButtons
          showSolution={showSolution}
          setShowSolution={setShowSolution}
          resetNewBoard={resetNewBoard}
        />
      </Flex>
    </ChakraProvider>
  );
};

export default App;
