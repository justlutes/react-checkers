import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { gameReducer } from './game';
import { leaderboardReducer } from './leaderboard';
import { lobbyReducer } from './lobby';
import { userReducer } from './user';

const rootReducer: Reducer = combineReducers({
  game: gameReducer,
  leaderBoard: leaderboardReducer,
  lobby: lobbyReducer,
  router: routerReducer,
  user: userReducer,
});

export default rootReducer;
