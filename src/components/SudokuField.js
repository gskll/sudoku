import React, { useEffect, useState } from 'react';
import { Flex, useToast } from '@chakra-ui/react';

import setFieldStyles from '../utils/setFieldStyles';

const FLASH_TIMER = 800;

const SudokuField = ({
  field,
  updateField,
  selectedField,
  handleSetSelectedField,
  notEditableErrorShown,
  setNotEditableErrorShown,
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
  }, [displayValue, updateField, field]);

  const updateDisplayValue = event => {
    const value = event.key;
    const validValue = /[1-9]/;

    if (value.match(validValue)) {
      setDisplayValue(value);
    }
  };

  if (selectedField.field) {
    var selected = selectedField.field.index === field.index;
  }

  const toast = useToast();
  const handleNotEditable = () => {
    if (notEditableErrorShown) {
      return;
    }

    setNotEditableErrorShown(true);

    return toast({
      title: 'Field completed',
      description: "You can't edit a completed field",
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

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
      cursor="pointer"
      outline="none"
      tabIndex={0}
      onMouseDown={() => handleSetSelectedField(field)}
      onKeyDown={
        !field.readonly && fieldEditable && selected
          ? updateDisplayValue
          : handleNotEditable
      }
    >
      {displayValue ? displayValue : ''}
    </Flex>
  );
};

export default SudokuField;
