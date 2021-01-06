import { Flex } from '@chakra-ui/react';
import React from 'react';

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
  showSolution,
}) => {
  const selected = selectedField === field.index;

  const updateFieldValue = event => {
    const value = event.key;
    const digitRegex = /[1-9]/;

    if (value.match(digitRegex)) {
      updateField(field.index, value);
    }
  };

  const setFieldBorderColor = () => {
    if (showSolution) {
      if (field.lastGuess === field.solution) {
        return 'green.300';
      } else {
        return 'red.300';
      }
    } else if (selected) {
      return 'blue.500';
    } else {
      return 'gray.300';
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
        borderColor={setFieldBorderColor}
        borderWidth={selected ? '3px' : '2px'}
        fontWeight={selected ? 'bold' : 'normal'}
        borderRadius="0.375em"
        cursor={showSolution ? 'default' : 'pointer'}
        onMouseDown={
          showSolution ? undefined : () => setSelectedField(field.index)
        }
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
