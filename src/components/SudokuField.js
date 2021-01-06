import React from 'react';
import { Flex } from '@chakra-ui/react';

import highlightRelevantFields from '../utils/highlightRelevantFields';
import setFieldBackgroundColor from '../utils/setFieldBackgroundColor';
import setFieldBorderColor from '../utils/setFieldBorderColor';
import ReadOnlyField from './ReadOnlyField';

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

  const handleSetSelectedField = ({ index, row, col }) => {
    const indicesToHighlight = highlightRelevantFields(index, row, col);

    setSelectedField({ field, indicesToHighlight });
  };

  if (selectedField.field) {
    var selected = selectedField.field.index === field.index;
  }

  const fieldBackgroundColor = setFieldBackgroundColor(field, selectedField);

  const fieldBorderColor = setFieldBorderColor(field, selected, showSolution);

  if (field.readonly) {
    return (
      <ReadOnlyField value={field.value} background={fieldBackgroundColor} />
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
