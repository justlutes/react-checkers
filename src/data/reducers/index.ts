import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { leaderboardReducer } from './leaderboard';

const rootReducer: Reducer = combineReducers({
  leaderBoard: leaderboardReducer,
  router: routerReducer,
});

export default rootReducer;
