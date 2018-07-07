import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { leaderboardReducer } from './leaderboard';
import { lobbyReducer } from './lobby';
import { userReducer } from './user';

const rootReducer: Reducer = combineReducers({
  leaderBoard: leaderboardReducer,
  lobby: lobbyReducer,
  router: routerReducer,
  user: userReducer,
});

export default rootReducer;
