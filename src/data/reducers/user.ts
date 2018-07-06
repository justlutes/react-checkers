import { StoreState } from '../../@types';
import { LOGIN_USER } from '../constants';

const initialState = {
  leaderBoard: [],
  user: null,
};

export function userReducer(state = initialState, action: any): StoreState {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
