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

const setFieldBorderColor = (field, selected, showSolution) => {
  if (showSolution) {
    if (field.lastGuess === field.solution) {
      return 'green.300';
    } else {
      return 'red.300';
    }
  } else if (selected) {
    return 'blue.500';
  } else {
    return 'gray.300';
  }
};

export default setFieldBorderColor;
