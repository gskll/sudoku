import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import highlightRelevantFields from '../utils/highlightRelevantFields';
import setFieldBackgroundColor from '../utils/setFieldBackgroundColor';
import setFieldBorderColor from '../utils/setFieldBorderColor';

// TODO: move field value state to SudokuField to flash incorrect, validate
// then clear or not. Once validated, pass up to Board
// TODO: flash green / red border on correct / incorrect guess
// TODO: once correct guess, set to readonly / unchangeable
// TODO: update boardMapping with correct guess
// TODO: update sameDigit highlighting on correct guess

const SudokuField = ({
  field,
  updateField,
  selectedField,
  setSelectedField,
  showSolution,
  sudokuMap,
}) => {
  const [displayValue, setDisplayValue] = useState(field.value);

  const updateDisplayValue = event => {
    const value = event.key;
    const validValue = /[1-9]/;

    if (value.match(validValue)) {
      setDisplayValue(value);

      if (field.solution === parseInt(value)) {
        updateField(field.index, value);
      }
    }
  };

  const handleSetSelectedField = ({ index, row, col, value }) => {
    const gridIndicesToHighlight = highlightRelevantFields(index, row, col);
    const sameDigitIndicesToHighlight = sudokuMap[parseInt(value)];

    setSelectedField({
      field,
      gridIndicesToHighlight,
      sameDigitIndicesToHighlight,
    });
  };

  if (selectedField.field) {
    var selected = selectedField.field.index === field.index;
  }

  const fieldBackgroundColor = setFieldBackgroundColor(field, selectedField);

  const fieldBorderColor = setFieldBorderColor(
    field,
    selected,
    showSolution,
    selectedField
  );

  return (
    <Flex
      boxSize="90%"
      justify="center"
      align="center"
      color={field.given ? 'black' : 'blue.700'}
      fontWeight="bold"
      background={fieldBackgroundColor}
      borderColor={fieldBorderColor}
      borderWidth={selected ? '3px' : '2px'}
      borderRadius="0.375em"
      cursor={showSolution ? 'default' : 'pointer'}
      outline="none"
      tabIndex={0}
      onMouseDown={
        showSolution ? undefined : () => handleSetSelectedField(field)
      }
      onKeyDown={
        !field.readonly && selected
          ? updateDisplayValue
          : () => {
              console.log("can't edit readonly");
            }
      }
    >
      {displayValue ? displayValue : ''}
    </Flex>
  );
};

export default SudokuField;
