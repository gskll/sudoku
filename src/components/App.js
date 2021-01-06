import React, { useState, useEffect } from 'react';

import { Button, ChakraProvider, Flex, Heading } from '@chakra-ui/react';

import generateSudoku from '../utils/generateSudoku';

import SudokuBoard from './SudokuBoard';
import { DownloadIcon } from '@chakra-ui/icons';

// TODO: animate solution on button click
//  - add borders on correct/wrong guess
//  - display percentage of correct guesses
// TODO: 3 wrong guesses max option
// TODO: add difficulty parameter

const App = () => {
  const [sudoku, setSudoku] = useState([]);

  useEffect(() => {
    setSudoku(generateSudoku());
  }, []);

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
        <SudokuBoard sudokuBoard={sudoku} />
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme="blue"
          variant="solid"
          m="3vh auto"
        >
          Show Solution
        </Button>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
