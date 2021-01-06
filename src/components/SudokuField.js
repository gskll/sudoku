import { Flex, Input } from '@chakra-ui/react';
import React from 'react';

const SudokuField = ({ field }) => {
  if (field.readonly) {
    return (
      <Flex
        boxSize="90%"
        align="center"
        justify="center"
        bg="gray.50"
        fontWeight="bold"
        borderColor="gray.300"
        borderRadius="0.375em"
      >
        {' '}
        {field.value + 1}
      </Flex>
    );
  } else {
    return <Input boxSize="90%" textAlign="center" borderColor="gray.300" />;
  }
};
export default SudokuField;
