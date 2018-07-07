import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../data/actions';
import Container from '../../components/Container';
import { GameStoreState } from '../../@types';
import { GameBoard } from './components';

export function mapStateToProps({ game, lobby }: GameStoreState) {
  return {
    game,
    lobby,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    updateLeader: () => dispatch(actions.UpdateLeadersAction),
  };
}

interface IProps extends RouteComponentProps<any, any> {
  game: any;
  lobby: any;
  updateLeader: any;
}

function Board({ game, lobby, updateLeader }: IProps) {
  return (
    <Container>
      <GameBoard initialState={lobby.state} role={lobby.role} />
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
