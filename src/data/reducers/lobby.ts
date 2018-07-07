import { JOIN_LOBBY, CREATE_LOBBY } from '../constants';

const initialState = {
  full: false,
  roomId: null,
};

export function lobbyReducer(state = initialState, action: any): any {
  switch (action.type) {
    case CREATE_LOBBY:
      return { ...state, roomId: action.roomId, full: false, role: 'red', state: action.state };
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
