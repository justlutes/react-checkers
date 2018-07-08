import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../data/actions';
import Container from '../../components/Container';
import { GameStoreState, IGameState, ICheckerValue } from '../../@types';
import { GameBoard } from './components';

export function mapStateToProps({ game, lobby }: GameStoreState) {
  return {
    game,
    lobby,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    handleMove: (from: string, to: string, state: IGameState) =>
      dispatch(actions.MoveAction(from, to, state)),
    startMove: (data: string, state: IGameState) => dispatch(actions.StartMoveAction(data, state)),
    updateLeader: () => dispatch(actions.UpdateLeadersAction),
  };
}

interface IProps extends RouteComponentProps<any, any> {
  game: any;
  lobby: any;
  handleMove: (f: string, t: string, s: IGameState) => void;
  startMove: (d: string, s: IGameState) => void;
  updateLeader: () => void;
}

function Board({ game, handleMove, lobby, startMove, updateLeader }: IProps) {
  const onStartMove = (data: string) => {
    const { value }: ICheckerValue = JSON.parse(data);
    if (lobby.role === value) {
      startMove(data, game);
    }
  };
  const onHandleMove = (fromData: string, toData: string) => {
    const { value }: ICheckerValue = JSON.parse(fromData);
    const { cellIndex } = JSON.parse(toData);
    if (lobby.role === value) {
      if (game.auxiliary.includes(cellIndex)) {
        handleMove(fromData, toData, game);
      }
    }
  };
  return (
    <Container>
      <GameBoard
        initialState={game}
        handleMove={onHandleMove}
        onStartMove={onStartMove}
        role={lobby.role}
      />
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
