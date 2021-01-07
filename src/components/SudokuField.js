import React from 'react';
import { Flex } from '@chakra-ui/react';

import highlightRelevantFields from '../utils/highlightRelevantFields';
import setFieldBackgroundColor from '../utils/setFieldBackgroundColor';
import setFieldBorderColor from '../utils/setFieldBorderColor';

import ReadOnlyField from './ReadOnlyField';

// TODO: move field value state to SudokuField to flash incorrect, validate
// then clear or not. Once validated, pass up to Board
// TODO: flash green / red border on correct / incorrect guess

const SudokuField = ({
  field,
  updateField,
  selectedField,
  setSelectedField,
  showSolution,
}) => {
  const updateFieldValue = event => {
    const value = event.key;
    const digitRegex = /[1-9]/;

    if (value.match(digitRegex) && field.solution === parseInt(value)) {
      updateField(field.index, value);
    }
  };

  const handleSetSelectedField = ({ index, row, col }) => {
    const indicesToHighlight = highlightRelevantFields(index, row, col);

    setSelectedField({ field, indicesToHighlight });
  };

  if (selectedField.field) {
    var selected = selectedField.field.index === field.index;
  }

  const fieldBackgroundColor = setFieldBackgroundColor(field, selectedField);

  const fieldBorderColor = setFieldBorderColor(field, selected, showSolution);

  return field.readonly ? (
    <ReadOnlyField
      value={field.value}
      setSelectedField={setSelectedField}
      background={fieldBackgroundColor}
    />
  ) : (
    <Flex
      boxSize="90%"
      justify="center"
      align="center"
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
