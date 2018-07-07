import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../data/actions';
import { EnterGame, Login } from './components';
import Container from '../../components/Container';
import styled from '../../theme';
import { HomeStoreState } from '../../@types';

const BoardContainer = styled.div`
  margin-top: 70px
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  min-width: 100%;
  min-height: 500px;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
`;

export function mapStateToProps({ game, user }: HomeStoreState) {
  return {
    game,
    user,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    createRoom: () => dispatch(actions.CreateRoomAction()),
    joinRoom: (roomId: string) => dispatch(actions.JoinRoomAction(roomId)),
    loginUser: (username: string, password: string) =>
      dispatch(actions.LoginUserAction(username, password)),
  };
}

interface IProps extends RouteComponentProps<any, any> {
  createRoom: any;
  game: any;
  joinRoom: any;
  loginUser: any;
  user: any;
}

class Home extends React.Component<IProps, any> {
  public render() {
    return (
      <Container>
        <h1>Checkers</h1>
        {this.props.user.isAuthenticated ? (
          <BoardContainer>
            <EnterGame createRoom={this.props.createRoom} joinRoom={this.props.joinRoom} />
          </BoardContainer>
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
