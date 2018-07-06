import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../data/reducers';
import rootSaga from '../data/sagas';

export default function init(history: History) {
  const initialState = {};
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunkMiddleware, sagaMiddleware, routerMiddleware(history)];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
