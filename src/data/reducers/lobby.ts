import { JOIN_LOBBY, CREATE_LOBBY } from '../constants';
import { LobbyAction } from '../actions';

const initialState = {
  active: null,
  dead: [],
  full: false,
  history: [],
  roomId: null,
};

export function lobbyReducer(state = initialState, action: LobbyAction): any {
  switch (action.type) {
    case CREATE_LOBBY:
      return {
        ...state,
        full: action.full,
        role: 'red',
        roomId: action.roomId,
        state: action.state,
      };
    case JOIN_LOBBY:
      return {
        ...state,
        full: action.full,
        role: action.role,
        roomId: action.roomId,
        state: action.state,
      };
    default:
      return state;
  }
}
