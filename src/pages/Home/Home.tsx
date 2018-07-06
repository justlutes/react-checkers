import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { push } from 'react-router-redux';
import { StoreState } from '../../@types';
import * as actions from '../../data/actions';
import { Container, EnterGame, LeaderBoard, Login } from './components';

export function mapStateToProps({ leaderBoard, user }: StoreState) {
  return {
    leaderBoard,
    user,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    fetchLeaderBoard: () => dispatch(actions.FetchLeadersAction()),
    loginUser: (username: string, password: string) =>
      dispatch(actions.LoginUserAction(username, password)),
    toBoard: () => dispatch(push('/board/1')),
  };
}

interface IProps extends RouteComponentProps<any, any> {
  fetchLeaderBoard: any;
  leaderBoard: any;
  loginUser: any;
  toBoard: any;
  user: any;
}

class Home extends React.Component<IProps, any> {
  public componentDidMount() {
    this.props.fetchLeaderBoard();
  }
  public render() {
    return (
      <Container>
        <h1>Checkers</h1>
        {this.props.user.isAuthenticated ? (
          <React.Fragment>
            <LeaderBoard leaderBoard={this.props.leaderBoard.leaderBoard} />
            <EnterGame />
          </React.Fragment>
        ) : (
          <Login loginUser={this.props.loginUser} />
        )}
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
