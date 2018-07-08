import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../data/actions';
import { EnterGame, Login, RoomList } from './components';
import Container from '../../components/Container';
import styled from '../../theme';
import { HomeStoreState } from '../../@types';
import { roomsRef } from '../../lib/firebase';

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

export function mapStateToProps({ lobby, user }: HomeStoreState) {
  return {
    lobby,
    user,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    createRoom: () => dispatch(actions.CreateRoomAction()),
    fetchRooms: () => dispatch(actions.FetchRoomAction()),
    joinRoom: (roomId: string) => dispatch(actions.JoinRoomAction(roomId)),
    loginUser: (email: string, password: string) =>
      dispatch(actions.LoginUserAction(email, password)),
  };
}

interface IProps extends RouteComponentProps<any, any> {
  createRoom: () => void;
  fetchRooms: () => void;
  game: any;
  joinRoom: (i: string) => void;
  lobby: any;
  loginUser: (e: string, p: string) => void;
  user: any;
}

class Home extends React.Component<IProps, any> {
  public componentDidMount() {
    roomsRef.on('child_added', () => this.props.fetchRooms());
  }
  public onLogin = async (email: string, password: string) => {
    try {
      await this.props.loginUser(email, password);
      this.props.fetchRooms();
    } catch (error) {
      console.error(error);
    }
  };
  public render() {
    return (
      <Container>
        <h1>Checkers</h1>
        {this.props.user.isAuthenticated ? (
          <BoardContainer>
            <RoomList rooms={this.props.lobby.rooms} handleClick={this.props.joinRoom} />
            <EnterGame createRoom={this.props.createRoom} joinRoom={this.props.joinRoom} />
          </BoardContainer>
        ) : (
          <Login loginUser={this.onLogin} />
        )}
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
