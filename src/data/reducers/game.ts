import { START_MOVE, GAME_INITIALIZED, MOVE_CHECKER, TURN_OVER } from '../constants';
import { GameAction } from '../actions';
import { ColorValues } from '../../enum';
// import { GameStoreState } from '../../@types';

const initialState = {
  active: null,
  auxiliary: [],
  cells: [],
  dead: [],
  gameOver: false,
  history: [],
  ongoing: false,
  selected: null,
  turn: ColorValues.red,
};

export function gameReducer(state = initialState, action: GameAction): any {
  switch (action.type) {
    case START_MOVE:
      return { ...state, ...action.state };
    case GAME_INITIALIZED:
      return {
        ...state,
        ...action.state,
      };
    case MOVE_CHECKER:
      return { ...state, ...action.state };
    case TURN_OVER:
      return { ...state, ...action.state };
    default:
      return state;
  }
}
