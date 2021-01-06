import React from 'react';
import { Flex } from '@chakra-ui/react';

import highlightRelevantFields from '../utils/highlightRelevantFields';
import setFieldBackgroundColor from '../utils/setFieldBackgroundColor';
import setFieldBorderColor from '../utils/setFieldBorderColor';

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

    if (value.match(digitRegex)) {
      updateField(field.index, value);
    }
  };

  const handleSetSelectedField = field => {
    const indicesToHighlight = highlightRelevantFields(
      field.index,
      field.row,
      field.col
    );

    setSelectedField({ field, indicesToHighlight });
  };

  if (selectedField.field) {
    var selected = selectedField.field.index === field.index;
  }
  const fieldBackgroundColor = setFieldBackgroundColor(field, selectedField);

  const fieldBorderColor = setFieldBorderColor(field, selected, showSolution);

  if (field.readonly) {
    return (
      <Flex
        boxSize="90%"
        align="center"
        justify="center"
        bg={fieldBackgroundColor}
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
        bg={fieldBackgroundColor}
        borderColor={fieldBorderColor}
        borderWidth={selected ? '3px' : '2px'}
        fontWeight={selected ? 'bold' : 'normal'}
        borderRadius="0.375em"
        cursor={showSolution ? 'default' : 'pointer'}
        onMouseDown={
          showSolution ? undefined : () => handleSetSelectedField(field)
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
