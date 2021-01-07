import React from 'react';
import { Flex } from '@chakra-ui/react';

const ReadOnlyField = ({
  value,
  setSelectedField,
  background,
  borderColor,
}) => (
  <Flex
    boxSize="90%"
    align="center"
    justify="center"
    background={background}
    fontWeight="bold"
    borderColor={borderColor}
    borderWidth="2px"
    borderRadius="0.375em"
    onClick={() => setSelectedField({})}
  >
    {value}
  </Flex>
);

export default ReadOnlyField;
