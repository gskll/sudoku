import React from 'react';
import { ChakraProvider, Flex, Heading } from '@chakra-ui/react';

class App extends React.Component {
  render() {
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
  }
}

export default App;
