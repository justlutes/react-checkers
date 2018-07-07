import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { gameReducer } from './game';
import { leaderboardReducer } from './leaderboard';
import { userReducer } from './user';

const rootReducer: Reducer = combineReducers({
  game: gameReducer,
  leaderBoard: leaderboardReducer,
  router: routerReducer,
  user: userReducer,
});

export default rootReducer;
