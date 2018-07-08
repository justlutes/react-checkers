import { ColorValues } from '../enum';

export interface IGameState {
  active: number | null;
  auxiliary: any[];
  cells: any[];
  dead: any[];
  history: IGameState[];
  ongoing: boolean;
  selected: number | null;
  turn: ColorValues;
  winner: ColorValues | null;
}

export interface ICheckerValue {
  cellIndex: number;
  value: ColorValues;
}
