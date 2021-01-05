import React, { useState, useEffect } from 'react';
import { ChakraProvider, Flex, Heading } from '@chakra-ui/react';

import generateSudoku from '../utils/generateSudoku';

const App = () => {
  const [sudoku, setSudoku] = useState({});

  useEffect(() => {
    setSudoku(generateSudoku());
  }, []);

  console.log(sudoku);

  return (
    <ChakraProvider>
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: '1200px' }}
        m="0 auto"
      >
        <Heading as="h1">Sweet Sudoku</Heading>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
