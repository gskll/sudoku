import { Flex } from '@chakra-ui/react';
import React from 'react';

const ReadOnlyField = ({ value, background }) => (
  <Flex
    boxSize="90%"
    align="center"
    justify="center"
    bg={background}
    fontWeight="bold"
    borderColor="gray.300"
    borderRadius="0.375em"
  >
    {value}
  </Flex>
);

export default ReadOnlyField;
