import { CREATE_USER, LOGIN_USER, PERSISTED_USER } from '../constants';
import { UserAction } from '../actions';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export function userReducer(state = initialState, action: UserAction): any {
  switch (action.type) {
    case LOGIN_USER:
    case CREATE_USER:
    case PERSISTED_USER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.username !== '' ? action.payload.username : action.payload.email,
      };
    default:
      return state;
  }
}
