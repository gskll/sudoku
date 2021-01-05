import React, { useState, useEffect } from 'react';
import { ChakraProvider, Flex, Heading } from '@chakra-ui/react';

import generateSudoku from '../utils/generateSudoku';

import SudokuBoard from './SudokuBoard';

const App = () => {
  const [sudoku, setSudoku] = useState({ rows: [] });

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
      >
        <Heading as="h1" m="3vh auto">
          Sweet Sudoku
        </Heading>
        <SudokuBoard sudoku={sudoku} />
      </Flex>
    </ChakraProvider>
  );
};

export default App;
