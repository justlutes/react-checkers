import { JOIN_LOBBY, CREATE_LOBBY } from '../constants';

const initialState = {
  full: false,
  roomId: null,
};

export function gameReducer(state = initialState, action: any): any {
  switch (action.type) {
    case CREATE_LOBBY:
      return { ...state, ...action };
    case JOIN_LOBBY:
      return { ...state, ...action };
    default:
      return state;
  }
}
