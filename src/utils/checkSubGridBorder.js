/*
 * Used for rendering the board
 * Check if field is on a subgrid border
 * Return an object with Chakra-UI border styles
 */

const checkSubGridBorder = ({ row, col }) => {
  const border = { border: null };

  if (col === 2 || col === 5) {
    border.borderRightColor = 'gray.300';
    border.borderRightStyle = 'solid';
    border.borderRightWidth = '.5vh';
  }

  if (row === 2 || row === 5) {
    border.borderBottomColor = 'gray.300';
    border.borderBottomStyle = 'solid';
    border.borderBottomWidth = '.5vh';
  }

  return border;
};

export default checkSubGridBorder;
