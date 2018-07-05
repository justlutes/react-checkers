import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

const rootReducer: Reducer = combineReducers({
  router: routerReducer,
});

export default rootReducer;
