import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import highlightRelevantFields from '../utils/highlightRelevantFields';
import setFieldBackgroundColor from '../utils/setFieldBackgroundColor';
import setFieldBorderColor from '../utils/setFieldBorderColor';

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

  useEffect(() => {
    setDisplayValue(field.value);
  }, [field.value]);

  const updateDisplayValue = event => {
    const value = event.key;
    const validValue = /[1-9]/;

    if (value.match(validValue)) {
      setDisplayValue(value);

      if (field.solution === parseInt(value)) {
        setFieldFlash({ border: 'green.300', bg: 'green.100' });
        updateField(field.index, value);
        setTimeout(() => setFieldFlash(null), FLASH_TIMER);
      } else {
        setFieldFlash({ border: 'red.300', bg: 'red.100' });
        setTimeout(() => {
          setFieldFlash(null);
          setDisplayValue(null);
        }, FLASH_TIMER);
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

  let fieldBackgroundColor;
  let fieldBorderColor;

  if (selected && fieldFlash) {
    fieldBackgroundColor = fieldFlash.bg;
    fieldBorderColor = fieldFlash.border;
  } else {
    fieldBackgroundColor = setFieldBackgroundColor(field, selectedField);

    fieldBorderColor = setFieldBorderColor(
      field,
      selected,
      showSolution,
      selectedField
    );
  }

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
