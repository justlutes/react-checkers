import { StoreState } from '../../@types';
// import { FetchLeadersAction } from '../actions';
import { FETCH_LEADERS } from '../constants';

const initialState = {
  leaderBoard: [],
};

export function leaderboardReducer(state = initialState, action: any): StoreState {
  switch (action.type) {
    case FETCH_LEADERS:
      return action.payload;
    default:
      return state;
  }
}
