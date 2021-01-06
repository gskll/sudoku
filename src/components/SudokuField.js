import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

// TODO: add guessCertainty parameter
//  - display uncertain toop left
//  - display certain normal
//  -  change input to div
//  - option to take notes and display in small
//  - on select a square: highlight all would be matches

const SudokuField = ({
  field,
  updateField,
  selectedField,
  setSelectedField,
}) => {
  const selected = selectedField === field.index;

  const updateFieldValue = event => {
    const value = event.key;
    const digitRegex = /[1-9]/;

    if (value.match(digitRegex)) {
      updateField(field.index, value);
    }
  };

  if (field.readonly) {
    return (
      <Flex
        boxSize="90%"
        align="center"
        justify="center"
        bg="gray.100"
        fontWeight="bold"
        borderColor="gray.300"
        borderRadius="0.375em"
      >
        {field.value}
      </Flex>
    );
  } else {
    return (
      <Flex
        boxSize="90%"
        align="center"
        justify="center"
        borderColor={selected ? 'blue.500' : 'gray.300'}
        borderWidth={selected ? '3px' : '1px'}
        fontWeight={selected ? 'bold' : 'normal'}
        borderRadius="0.375em"
        cursor="pointer"
        onMouseDown={() => setSelectedField(field.index)}
        onKeyDown={selected ? updateFieldValue : undefined}
        outline="none"
        tabIndex="0"
      >
        {field.value ? field.value : ''}
      </Flex>
    );
  }
};

export default SudokuField;
