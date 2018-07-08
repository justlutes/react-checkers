import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../data/reducers';

export default function init(history: History) {
  const initialState = {};
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
