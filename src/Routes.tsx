import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import LeaderBoard from './pages/LeaderBoard/LeaderBoard';
import init from './store';

const history = createHistory();
const store = init(history);

const ConnectedSwitch = connect((state: any) => ({
  location: state.router.location,
}))(Switch);

interface IPrivateProps {
  component: any;
  isAuthenticated: boolean;
  location: any;
  path: string;
}

class PrivateRouteContainer extends React.Component<IPrivateProps, {}> {
  public render() {
    const { component: Component, isAuthenticated, ...restOfProps } = this.props;
    return (
      <Route
        {...restOfProps}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}
const PrivateRoute = connect((state: any) => ({
  isAuthenticated: state.user.isAuthenticated,
  location: state.router.location,
}))(PrivateRouteContainer);

const AppContainer = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={Home} />
    <Route path="/leaderboard" component={LeaderBoard} />
    <PrivateRoute path="/board/:id" component={Board} />
  </ConnectedSwitch>
);

const App = connect((state: any) => ({
  location: state.router.location,
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
