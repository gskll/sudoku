/*
 * Set board field border color
 *
 * Result passed to Chakra component for conditional styling
 *
 * INPUTS:
 * - field: object
 * - selected: boolean
 * - showSolution: boolean
 *
 * OUTPUT:
 * - borderColor: string
 */

const setFieldBorderColor = (field, selected, showSolution, selectedField) => {
  if (showSolution) {
    if (field.lastGuess === field.solution) {
      return 'green.300';
    } else {
      return 'red.300';
    }
  } else if (selected) {
    return 'blue.500';
  } else if (
    selectedField.sameDigitIndicesToHighlight &&
    selectedField.sameDigitIndicesToHighlight.includes(field.index)
  ) {
    return 'orange.300';
  } else {
    return 'gray.300';
  }
};

export default setFieldBorderColor;
