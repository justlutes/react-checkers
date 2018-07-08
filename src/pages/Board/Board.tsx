import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../data/actions';
import Button from '../../components/Button';
import { GameStoreState, IGameState, ICheckerValue } from '../../@types';
import { GameBoard } from './components';
import styled, { theme } from '../../theme';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 5%;
  top: 10%;
`;

const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${theme.secondaryColor};
  height: 100vh;
  width: 100%;
`;

export function mapStateToProps({ game, lobby }: GameStoreState) {
  return {
    game,
    lobby,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    endTurn: (roomId: string, state: IGameState) => dispatch(actions.TurnOverAction(roomId, state)),
    handleMove: (from: string, to: string, state: IGameState) =>
      dispatch(actions.MoveAction(from, to, state)),
    startMove: (data: string, state: IGameState) => dispatch(actions.StartMoveAction(data, state)),
  };
}

interface IProps extends RouteComponentProps<any, any> {
  game: IGameState;
  lobby: any;
  endTurn: (i: string, s: IGameState) => void;
  handleMove: (f: string, t: string, s: IGameState) => void;
  startMove: (d: string, s: IGameState) => void;
}

function Board({ endTurn, game, handleMove, lobby, startMove }: IProps) {
  const onStartMove = (data: string) => {
    if (lobby.role === game.turn) {
      const { value }: ICheckerValue = JSON.parse(data);
      if (lobby.role === value && game.turn === value) {
        startMove(data, game);
      }
    }
  };
  const onHandleMove = (fromData: string, toData: string) => {
    if (lobby.role === game.turn) {
      const { value }: ICheckerValue = JSON.parse(fromData);
      const { cellIndex } = JSON.parse(toData);
      if (lobby.role === value && game.turn === value) {
        if (game.auxiliary.indexOf(cellIndex) !== -1) {
          handleMove(fromData, toData, game);
        }
      }
    }
  };
  const onEndTurn = () => {
    if (lobby.role === game.turn) {
      endTurn(lobby.roomId, game);
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <Button text="Undo" onClick={console.error} />
        <Button text="End turn" onClick={onEndTurn} />
      </ButtonContainer>
      <GameBoard
        gameState={game}
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
