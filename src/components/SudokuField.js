import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import highlightRelevantFields from '../utils/highlightRelevantFields';
import setFieldStyles from '../utils/setFieldStyles';

// TODO: update boardMapping with correct guess
// TODO: update readonly status on solvedBoard and edit render
// TODO: change color of selected bg
// TODO: refactor border/bg styles to one function

const FLASH_TIMER = 800;

const SudokuField = ({
  field,
  updateField,
  selectedField,
  setSelectedField,
  showSolution,
  sudokuMap,
}) => {
  const [displayValue, setDisplayValue] = useState(null);
  const [fieldFlash, setFieldFlash] = useState(null);
  const [fieldEditable, setFieldEditable] = useState(true);

  useEffect(() => {
    setDisplayValue(field.value);
  }, [field.value]);

  useEffect(() => {
    if (field.readonly || !displayValue) {
      return;
    }
    setFieldEditable(false);

    if (field.solution === parseInt(displayValue)) {
      setFieldFlash({ border: 'green.300', bg: 'green.100' });
      updateField(field.index, displayValue);
      setTimeout(() => {
        setFieldFlash(null);
        setFieldEditable(true);
      }, FLASH_TIMER);
    } else {
      setFieldFlash({ border: 'red.300', bg: 'red.100' });
      setTimeout(() => {
        setFieldFlash(null);
        setDisplayValue(null);
        setFieldEditable(true);
      }, FLASH_TIMER);
    }
  }, [displayValue]);

  const updateDisplayValue = event => {
    const value = event.key;
    const validValue = /[1-9]/;

    if (value.match(validValue)) {
      setDisplayValue(value);
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

  let fieldStyles;

  if (!fieldFlash) {
    const styleParams = { field, selected, selectedField };
    fieldStyles = setFieldStyles(styleParams);
  }

  return (
    <Flex
      boxSize="90%"
      justify="center"
      align="center"
      fontWeight="bold"
      background={fieldFlash ? fieldFlash.bg : fieldStyles.bg}
      borderColor={fieldFlash ? fieldFlash.border : fieldStyles.border}
      borderWidth={selected ? '3px' : '2px'}
      borderRadius="0.375em"
      cursor={showSolution ? 'default' : 'pointer'}
      outline="none"
      tabIndex={0}
      onMouseDown={
        showSolution ? undefined : () => handleSetSelectedField(field)
      }
      onKeyDown={
        !field.readonly && fieldEditable && selected
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
