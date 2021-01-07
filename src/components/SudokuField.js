import React from 'react';
import { Flex } from '@chakra-ui/react';

import highlightRelevantFields from '../utils/highlightRelevantFields';
import setFieldBackgroundColor from '../utils/setFieldBackgroundColor';
import setFieldBorderColor from '../utils/setFieldBorderColor';

import ReadOnlyField from './ReadOnlyField';

// TODO: move field value state to SudokuField to flash incorrect, validate
// then clear or not. Once validated, pass up to Board
// TODO: flash green / red border on correct / incorrect guess
// TODO: once correct guess, set to readonly / unchangeable
// TODO: allow selection highlighting of readonly
// TODO: update boardMapping with correct guess
// TODO: update sameDigit highlighting on correct guess
// TODO: remove readonly / editable field distinction

const SudokuField = ({
  field,
  updateField,
  selectedField,
  setSelectedField,
  showSolution,
  sudokuMap,
}) => {
  const updateFieldValue = event => {
    const value = event.key;
    const digitRegex = /[1-9]/;

    if (value.match(digitRegex) && field.solution === parseInt(value)) {
      updateField(field.index, value);
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

  return field.readonly ? (
    <ReadOnlyField
      field={field}
      showSolution={showSolution}
      handleSetSelectedField={handleSetSelectedField}
      background={fieldBackgroundColor}
      borderColor={fieldBorderColor}
      selected={selected}
    />
  ) : (
    <Flex
      boxSize="90%"
      justify="center"
      align="center"
      color="blue.900"
      fontWeight={selected ? 'bold' : 'normal'}
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
      onKeyDown={selected ? updateFieldValue : undefined}
    >
      {field.value ? field.value : ''}
    </Flex>
  );
};

export default SudokuField;
