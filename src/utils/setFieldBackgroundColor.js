/*
 * Set board field background color
 *
 * Based on whether that field is in the relevant range
 *   (row, col, subgrid) of the selected field
 * Based on whether the field is readonly
 *
 * Result passed to Chakra component for conditional styling
 *
 * INPUTS:
 * - field: object
 * - selectedField: object
 *
 * OUTPUT:
 * - backgroundColor: string
 */

const setFieldBackgroundColor = (field, selectedField) => {
  if (!selectedField) {
    return;
  } else if (
    selectedField.field &&
    selectedField.gridIndicesToHighlight.includes(field.index)
  ) {
    return 'orange.100';
  } else if (
    selectedField.sameDigitIndicesToHighlight &&
    selectedField.sameDigitIndicesToHighlight.includes(field.index)
  ) {
    return 'orange.300';
  } else if (field.readonly) {
    return 'gray.100';
  }
};

export default setFieldBackgroundColor;
