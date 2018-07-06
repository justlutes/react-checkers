import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { leaderboardReducer } from './leaderboard';
import { userReducer } from './user';

const rootReducer: Reducer = combineReducers({
  leaderBoard: leaderboardReducer,
  router: routerReducer,
  user: userReducer,
});

export default rootReducer;
