import { Input } from '@chakra-ui/react';
import React from 'react';

const SudokuField = ({ field }) => {
  const inputProps = {
    boxSize: '50px',
    margin: '5px',
    textAlign: 'center',
    size: 'lg',
  };

  if (field.readonly) {
    inputProps.isReadOnly = true;
    inputProps.isDisabled = true;
    inputProps.opacity = '100% !important';
    inputProps.cursor = 'default !important';
    inputProps.variant = 'filled';
    inputProps.value = field.value + 1;
    inputProps.fontWeight = 'bold';
  }

  if (field.row === 2 || field.row === 5) {
    inputProps.borderBottomColor = 'gray.600';
    inputProps.borderBottomWidth = '5px';
  }

  if (field.col === 2 || field.col === 5) {
    inputProps.borderRightColor = 'gray.600';
    inputProps.borderRightWidth = '5px';
  }

  return <Input {...inputProps} />;
};

export default SudokuField;
