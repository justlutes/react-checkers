import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import init from './store';

const history = createHistory();
const store = init(history);

const ConnectedSwitch = connect((state: any) => ({
  location: state.location,
}))(Switch);

const AppContainer = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={() => <h1>Home</h1>} />
    <Route path="/about" component={() => <h1>About</h1>} />
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
