import { FETCH_LEADERS, UPDATE_LEADERS } from '../constants';

const initialState = {
  leaderBoard: [],
};

export function leaderboardReducer(state = initialState, action: any): any {
  switch (action.type) {
    case FETCH_LEADERS:
      return { ...state, leaderBoard: action.payload };
    case UPDATE_LEADERS:
      return state;
    default:
      return state;
  }
}
