import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import init from './store';

const history = createHistory();
const store = init(history);

const ConnectedSwitch = connect((state: any) => ({
  location: state.location,
}))(Switch);

const AppContainer = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={Home} />
    <Route path="/board/:id" component={Board} />
  </ConnectedSwitch>
);

const App = connect((state: any) => ({
  location: state.location,
}))(AppContainer);

function Routes() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
}

export default Routes;
