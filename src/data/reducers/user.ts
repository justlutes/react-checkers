import { LOGIN_USER } from '../constants';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export function userReducer(state = initialState, action: any): any {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.email,
      };
    default:
      return state;
  }
}
