import { IGameState } from '../@types';
import { ColorValues } from '../enum';

export default function generateBoard(): IGameState {
  const cells = Array(64).fill(-1);
  const bl = [8, 1, 17, 10, 3, 19, 12, 5, 21, 14, 7, 23];
  const r = [40, 56, 49, 42, 58, 51, 44, 60, 53, 46, 62, 55];

  for (let i = 0; i < cells.length; i++) {
    if (bl.indexOf(i) !== -1) {
      cells[i] = {
        color: 'black',
        king: false,
      };
    } else if (r.indexOf(i) !== -1) {
      cells[i] = {
        color: 'red',
        king: false,
      };
    }
  }

  return {
    active: null,
    auxiliary: [],
    cells,
    dead: [],
    gameOver: false,
    history: [],
    ongoing: true,
    selected: null,
    turn: ColorValues.red,
  };
}
