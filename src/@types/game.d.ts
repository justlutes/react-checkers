import { ColorValues } from '../enum';

export interface IGameState {
  active: number | null;
  auxiliary: any[];
  cells: any[];
  dead: any[];
  gameOver: boolean;
  history: IGameState[];
  ongoing: boolean;
  selected: number | null;
  turn: ColorValues;
}

export interface ICheckerValue {
  cellIndex: number;
  value: ColorValues;
}
