import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../@types';
import * as actions from '../../data/actions';
import { Login } from './components';

export function mapStateToProps({ leaderBoard }: StoreState) {
  return {
    leaderBoard,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    fetchLeaderBoard: () => dispatch(actions.FetchLeadersAction()),
    loginUser: (username: string, password: string) =>
      dispatch(actions.LoginUserAction(username, password)),
  };
}

interface IProps {
  fetchLeaderBoard: any;
  loginUser: any;
}

function Home({ fetchLeaderBoard, loginUser }: IProps) {
  return (
    <main onClick={fetchLeaderBoard}>
      <h1>
        Home <i className="material-icons">face</i>
        <Login loginUser={loginUser} />
      </h1>
    </main>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
