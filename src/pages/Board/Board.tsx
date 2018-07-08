import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../data/actions';
import Button from '../../components/Button';
import { GameStoreState, IGameState, ICheckerValue } from '../../@types';
import { GameBoard } from './components';
import styled, { theme } from '../../theme';
import { roomsRef } from '../../lib/firebase';
import { EndScreen } from './components/EndScreen';

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
    undoTurn: (state: IGameState) => dispatch(actions.TurnUndoAction(state)),
    updateGame: (state: IGameState) => dispatch(actions.GameUpdateAction(state)),
    updateLeader: (name: string) => dispatch(actions.UpdateLeadersAction(name)),
  };
}

interface IProps extends RouteComponentProps<any, any> {
  game: IGameState;
  lobby: any;
  endTurn: (i: string, s: IGameState) => void;
  handleMove: (f: string, t: string, s: IGameState) => void;
  startMove: (d: string, s: IGameState) => void;
  undoTurn: (s: IGameState) => void;
  updateGame: (s: IGameState) => void;
  updateLeader: (n: string) => void;
}

class Board extends React.Component<IProps, {}> {
  public componentDidMount() {
    roomsRef
      .child(this.props.lobby.roomId)
      .on('child_changed', (snapshot: firebase.database.DataSnapshot) => {
        const newState = snapshot && snapshot.val();
        this.props.updateGame(newState);
      });
  }

  public onStartMove = (data: string) => {
    const { game, lobby } = this.props;
    if (lobby.role === game.turn) {
      const { value }: ICheckerValue = JSON.parse(data);
      if (lobby.role === value && game.turn === value) {
        this.props.startMove(data, game);
      }
    }
  };
  public onHandleMove = (fromData: string, toData: string) => {
    const { game, lobby } = this.props;
    if (lobby.role === game.turn) {
      const { value }: ICheckerValue = JSON.parse(fromData);
      const { cellIndex } = JSON.parse(toData);
      if (lobby.role === value && game.turn === value) {
        if (game.auxiliary.indexOf(cellIndex) !== -1) {
          this.props.handleMove(fromData, toData, game);
        }
      }
    }
  };
  public onEndTurn = () => {
    const { game, lobby } = this.props;
    if (lobby.role === game.turn) {
      this.props.endTurn(lobby.roomId, game);
    }
  };

  public onUndo = () => this.props.undoTurn(this.props.game);

  public render() {
    if (this.props.game.winner && this.props.game.winner !== null) {
      return (
        <Container>
          <EndScreen winner={this.props.game.winner === this.props.lobby.role} />
        </Container>
      );
    }
    return (
      <Container>
        <ButtonContainer>
          {/* {this.props.game.history.length ? <Button text="Undo" onClick={this.onUndo} /> : null} */}
          <Button text="End turn" onClick={this.onEndTurn} />
        </ButtonContainer>
        <GameBoard
          gameState={this.props.game}
          handleMove={this.onHandleMove}
          onStartMove={this.onStartMove}
          role={this.props.lobby.role}
        />
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
