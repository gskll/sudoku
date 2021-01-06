/*
 * Highlight the relevant fields for a given selected field
 * The relevant fields are that fields:
 *    - row
 *    - column
 *    - 3x3 grid
 *
 * INPUT: index, row, col --> all integers
 *
 * OUTPUT: array of indices to highlight
 */

// https://math.stackexchange.com/questions/2051899/finding-the-location-of-the-subgrid
const checkSubGrid = index => {
  return Math.floor(Math.floor(index % 9) / 3 + 3 * Math.floor(index / 27));
};

const highlightRelevantFields = (index, row, col) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let relevantIndices = [];

  // Add row indices
  const noCol = digits.filter(i => i !== col);
  const rowIndices = noCol.map(c => row * 9 + c);
  relevantIndices = relevantIndices.concat(rowIndices);

  // Add col indices
  const noRow = digits.filter(i => i !== row);
  const colIndices = noRow.map(r => r * 9 + col);
  relevantIndices = relevantIndices.concat(colIndices);

  // Add grid indices
  const subgrid = checkSubGrid(index);

  // Map each subgrid number 0-9 to the center index
  //  in that 3x3 subgrid
  const mapSubgridCenterIndexToSubgrid = {
    0: 10,
    1: 13,
    2: 16,
    3: 37,
    4: 40,
    5: 43,
    6: 64,
    7: 67,
    8: 70,
  };
  const subgridCenter = mapSubgridCenterIndexToSubgrid[subgrid];

  const subgridIndices = [
    subgridCenter - 10,
    subgridCenter - 9,
    subgridCenter - 8,
    subgridCenter - 1,
    subgridCenter,
    subgridCenter + 1,
    subgridCenter + 8,
    subgridCenter + 9,
    subgridCenter + 10,
  ];

  relevantIndices = relevantIndices.concat(subgridIndices);
  return relevantIndices;
};

export default highlightRelevantFields;
