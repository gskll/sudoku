/*
 * Set board field background and border styles
 *
 * Result passed to Chakra component for conditional styling
 *
 * INPUTS:
 * - field: object
 * - selected: boolean
 * - selectedField: object
 *
 * OUTPUT:
 *   {
 *     'border': ...,
 *     'bg': ...
 *   }
 */

const setFieldStyles = ({
  selected,
  field: { given, index },
  selectedField: { sameDigitIndicesToHighlight, gridIndicesToHighlight },
}) => {
  if (selected) {
    return { border: 'blue.700', bg: 'orange.300' };
  } else if (
    sameDigitIndicesToHighlight &&
    sameDigitIndicesToHighlight.includes(index)
  ) {
    return { border: 'orange.300', bg: 'orange.300' };
  } else if (gridIndicesToHighlight && gridIndicesToHighlight.includes(index)) {
    return { border: 'gray.300', bg: 'orange.100' };
  } else if (given) {
    return { border: 'gray.300', bg: 'gray.100' };
  } else {
    return { border: 'gray.300', bg: null };
  }
};

export default setFieldStyles;
