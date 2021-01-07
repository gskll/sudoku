import React from 'react';
import { Flex } from '@chakra-ui/react';

const ReadOnlyField = ({
  field,
  selected,
  background,
  borderColor,
  showSolution,
  handleSetSelectedField,
}) => (
  <Flex
    boxSize="90%"
    align="center"
    justify="center"
    background={background}
    fontWeight="bold"
    borderColor={borderColor}
    borderWidth={selected ? '3px' : '2px'}
    borderRadius="0.375em"
    onMouseDown={showSolution ? undefined : () => handleSetSelectedField(field)}
  >
    {field.value}
  </Flex>
);

export default ReadOnlyField;
