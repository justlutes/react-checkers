import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../data/actions';
import { EnterGame, Login, RoomList } from './components';
import Container from '../../components/Container';
import styled from '../../theme';
import { HomeStoreState } from '../../@types';
import { roomsRef } from '../../lib/firebase';
import Button from '../../components/Button';

const BoardContainer = styled.div`
  flex: 6;
  padding-bottom: 0;
`;

const Column = styled.div`
  max-width: 745px;
  background: #fff;
  border-radius: 4px;
  margin: 0;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1), 0 15px 35px rgba(50, 50, 93, 0.15),
    0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-top: 100px;
  margin-bottom: 50px;
  color: #fff;
  font-size: 35px;
`;

const SignOutContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
`;

export function mapStateToProps({ lobby, user }: HomeStoreState) {
  return {
    lobby,
    user,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    checkPersistedUser: () => dispatch(actions.PersistedUserAction()),
    createRoom: () => dispatch(actions.CreateRoomAction()),
    createUser: (email: string, password: string, username: string) =>
      dispatch(actions.CreateUserAction(email, password, username)),
    fetchRooms: () => dispatch(actions.FetchRoomAction()),
    joinRoom: (roomId: string) => dispatch(actions.JoinRoomAction(roomId)),
    loginUser: (email: string, password: string) =>
      dispatch(actions.LoginUserAction(email, password)),
    signOut: () => dispatch(actions.SignOutUserAction()),
  };
}

interface IProps extends RouteComponentProps<any, any> {
  checkPersistedUser: () => void;
  createRoom: () => void;
  createUser: (e: string, p: string, u: string) => void;
  fetchRooms: () => void;
  game: any;
  joinRoom: (i: string) => void;
  lobby: any;
  loginUser: (e: string, p: string) => void;
  signOut: () => void;
  user: any;
}

class Home extends React.Component<IProps, any> {
  public componentDidMount() {
    this.props.checkPersistedUser();
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
  public onCreateUser = async (email: string, password: string, username: string) => {
    try {
      await this.props.createUser(email, password, username);
      this.props.fetchRooms();
    } catch (error) {
      console.error(error);
    }
  };
  public render() {
    return (
      <Container>
        <Title>Checkers</Title>
        {this.props.user.isAuthenticated ? (
          <React.Fragment>
            <SignOutContainer>
              <Button text="Sign Out" onClick={this.props.signOut} />
            </SignOutContainer>
            <BoardContainer>
              <Column>
                <RoomList rooms={this.props.lobby.rooms} handleClick={this.props.joinRoom} />
                <EnterGame createRoom={this.props.createRoom} joinRoom={this.props.joinRoom} />
              </Column>
            </BoardContainer>
          </React.Fragment>
        ) : (
          <BoardContainer>
            <Column>
              <Login loginUser={this.onLogin} createUser={this.onCreateUser} />
            </Column>
          </BoardContainer>
        )}
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
