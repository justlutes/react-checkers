import { START_MOVE, GAME_UPDATE, MOVE_CHECKER, TURN_OVER, UNDO_TURN } from '../constants';
import { GameAction } from '../actions';
import { ColorValues } from '../../enum';

const initialState = {
  active: null,
  auxiliary: [],
  cells: [],
  dead: [],
  history: [],
  ongoing: false,
  selected: null,
  turn: ColorValues.red,
  winner: null,
};

export function gameReducer(state = initialState, action: GameAction): any {
  switch (action.type) {
    case START_MOVE:
      return { ...state, auxiliary: action.state.auxiliary };
    case GAME_UPDATE:
      return {
        ...state,
        ...action.state,
      };
    case MOVE_CHECKER:
      return { ...state, ...action.state };
    case TURN_OVER:
      return { ...state, ...action.state };
    case UNDO_TURN:
      return { ...state, ...action.state };
    default:
      return state;
  }
}
