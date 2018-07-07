export interface IGameState {
  active: boolean;
  auxiliary: any[];
  cells: any[];
  dead: any[];
  gameOver: boolean;
  history: any[];
  ongoing: boolean;
  selected: number | null;
  turn: 'black' | 'red';
}
