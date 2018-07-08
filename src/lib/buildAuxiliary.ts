import { ColorValues } from '../enum';
import { rowsApart } from './rowUtils';

export function buildAuxiliary(
  cellIndex: number,
  ongoing: boolean,
  cells: any[],
  color: ColorValues,
): number[] {
  const blockedRows = [
    cellIndex - 9,
    cellIndex - 18,
    cellIndex - 7,
    cellIndex - 14,
    cellIndex + 7,
    cellIndex + 14,
    cellIndex + 9,
    cellIndex + 18,
  ];

  const auxiliary = blockedRows.map((ele, index) => {
    // turn is over
    if (!ongoing) {
      return -1;
    } else if (
      false ||
      // our rules chart for determining whether a cell is a valid destination
      // or not
      ele < 0 ||
      ele > 63 || // space needs to be on the board
      cells[ele] !== -1 || // space needs to be empty
      (index % 2 !== 0 &&
        (cells[blockedRows[index - 1]] === -1 || // outer cells need a piece to jump over
          cells[blockedRows[index - 1]].color === color)) || // and we can't eat friendlies
      (index % 2 === 1 && rowsApart(cellIndex, ele) !== 2) || // must maintain diagonal move structure
      (index % 2 === 0 && rowsApart(cellIndex, ele) !== 1) ||
      (color === ColorValues.red && ele > cellIndex && !cells[cellIndex].king) || // non-kings cannot move backwards
      (color === ColorValues.black && ele < cellIndex && !cells[cellIndex].king)
    ) {
      return -1;
    }
    return ele; // default
  });

  return auxiliary;
}
