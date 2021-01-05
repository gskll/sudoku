import { Input } from '@chakra-ui/react';
import React from 'react';

const SudokuField = ({ field }) => (
  <Input
    isReadOnly={field.readonly}
    focusBorderColor={field.readonly ? 'crimson.400' : 'teal.400'}
    value={field.value}
    boxSize="50px"
    m="5px"
  />
);

export default SudokuField;
