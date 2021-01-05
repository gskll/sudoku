import React, { useState, useEffect } from 'react';
import { ChakraProvider, Flex, Heading } from '@chakra-ui/react';

import generateSudoku from '../utils/generateSudoku';
import solveSudoku from '../utils/solveSudoku';

import SudokuBoard from './SudokuBoard';

const App = () => {
  const [sudoku, setSudoku] = useState({ rows: [] });
  const [solvedSudoku, setSolvedSudoku] = useState({ rows: [] });

  useEffect(() => {
    const { rawSudoku, board } = generateSudoku();
    setSudoku(board);
    const { solvedBoard } = solveSudoku(rawSudoku);
    setSolvedSudoku(solvedBoard);
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
