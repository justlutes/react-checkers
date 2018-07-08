import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState, IGameState, ICheckerValue, IFirebaseUser } from '../../@types';
import * as constants from '../constants';
import { ColorValues } from '../../enum';
import { roomsRef, usersRef, auth } from '../../lib/firebase';
import { buildAuxiliary } from '../../lib/buildAuxiliary';

export interface IMoveChecker {
  state: IGameState;
  type: constants.MOVE_CHECKER;
}

export interface IStartMove {
  state: IGameState;
  type: constants.START_MOVE;
}

export interface IGameInitial {
  state: IGameState;
  type: constants.GAME_UPDATE;
}

export interface ITurnOver {
  state: IGameState;
  type: constants.TURN_OVER;
}

export interface ITurnUndo {
  state: IGameState;
  type: constants.UNDO_TURN;
}

export interface IGameOver {
  state: IGameState;
  type: constants.GAME_OVER;
}

export type GameAction =
  | IMoveChecker
  | ITurnOver
  | ITurnUndo
  | IGameOver
  | IGameInitial
  | IStartMove
  | IGameOver;

export function MoveAction(
  fromData: any,
  toData: any,
  currentState: IGameState,
): ThunkAction<Promise<Action>, StoreState, void, IMoveChecker> {
  return async (dispatch: Dispatch<IMoveChecker>): Promise<Action> => {
    const { cellIndex: prevIndex }: ICheckerValue = JSON.parse(fromData);
    const { cellIndex: newIndex } = JSON.parse(toData);

    const { cells, dead = [], history } = currentState;
    // Copy dead state
    const updatedDead = dead.slice();
    // Update history
    const updatedHistory = history.slice();
    updatedHistory.push({ ...currentState });

    const inner = [-9, -7, 7, 9];
    const outer = [-18, -14, 14, 18];

    if (outer.indexOf(newIndex - prevIndex) !== -1) {
      let piece = cells[prevIndex + inner[outer.indexOf(newIndex - prevIndex)]].color;
      piece = piece.concat(
        cells[prevIndex + inner[outer.indexOf(newIndex - prevIndex)]].king ? 'k' : '',
      );
      updatedDead.push(piece);

      cells[prevIndex + inner[outer.indexOf(newIndex - prevIndex)]] = -1;
    }
    const updatedCells = cells.slice();
    const singleMove = inner.indexOf(newIndex - prevIndex) !== -1;
    // check if piece has earned king status
    const promote =
      (updatedCells[prevIndex].color === ColorValues.red && newIndex < 8) ||
      (updatedCells[prevIndex].color === ColorValues.black && newIndex > 55);

    updatedCells[newIndex] = updatedCells[prevIndex]; // move piece
    updatedCells[prevIndex] = -1; // delete piece from old position
    updatedCells[newIndex].king = promote ? true : updatedCells[newIndex].king;

    return dispatch({
      state: {
        ...currentState,
        active: newIndex,
        auxiliary: [],
        cells: updatedCells,
        dead: updatedDead,
        history: updatedHistory,
        ongoing: !singleMove,
      },
      type: constants.MOVE_CHECKER,
    });
  };
}

export function StartMoveAction(
  fromData: any,
  currentState: IGameState,
): ThunkAction<Promise<Action>, StoreState, void, IStartMove> {
  return async (dispatch: Dispatch<IStartMove>): Promise<Action> => {
    const { cellIndex, value }: ICheckerValue = JSON.parse(fromData);
    const { cells, ongoing } = currentState;
    const color: ColorValues = value;
    const auxiliary = buildAuxiliary(cellIndex, ongoing, cells, color);

    return dispatch({
      state: { ...currentState, auxiliary },
      type: constants.START_MOVE,
    });
  };
}

export function TurnOverAction(
  roomId: string,
  currentState: IGameState,
): ThunkAction<Promise<Action>, StoreState, void, ITurnOver> {
  return async (dispatch: Dispatch<ITurnOver>): Promise<Action> => {
    const { cells, turn } = currentState;
    const updatedTurn = turn === ColorValues.red ? ColorValues.black : ColorValues.red;
    let checkWinner = null;

    // Check win state
    const opponents = Array.from({ length: 63 })
      .map((_, i) => {
        if (cells[i] !== -1 && cells[i].color !== turn) {
          return i;
        }
        return;
      })
      .filter(o => o) as number[];

    if (!opponents.length) {
      checkWinner = turn;
    } else if (opponents.length) {
      const haveOptions = opponents.some(o => {
        const testAuxiliary = buildAuxiliary(o, true, cells, updatedTurn);
        return testAuxiliary.some(aux => aux !== -1);
      });

      if (!haveOptions) {
        checkWinner = turn;
      }
    }

    if (checkWinner !== null) {
      if (auth.currentUser && auth.currentUser.uid !== null) {
        try {
          const userRef = usersRef.child(auth.currentUser.uid);
          const snapshot = await userRef.once('value');
          const user: IFirebaseUser = snapshot.val();
          const newWins = user.wins + 1;

          await userRef.child('wins').set(newWins);
        } catch (error) {
          console.error(error);
        }
      }
    }

    const newState = {
      active: null,
      auxiliary: [],
      cells,
      history: [],
      ongoing: true,
      selected: null,
      turn: updatedTurn,
      winner: checkWinner,
    };

    try {
      await roomsRef
        .child(roomId)
        .child('state')
        .set(newState);
    } catch (error) {
      console.error(error);
    }

    return dispatch({
      state: {
        ...currentState,
        turn: updatedTurn,
        winner: checkWinner,
      },
      type: constants.TURN_OVER,
    });
  };
}

export function TurnUndoAction(
  currentState: IGameState,
): ThunkAction<Promise<Action>, StoreState, void, ITurnUndo> {
  return async (dispatch: Dispatch<ITurnUndo>): Promise<Action> => {
    const history = currentState.history.slice();
    const mostRecentMove = history.pop();

    if (mostRecentMove) {
      mostRecentMove.auxiliary = [];
      return dispatch({
        state: { ...currentState, ...mostRecentMove },
        type: constants.UNDO_TURN,
      });
    }
    return dispatch({
      state: currentState,
      type: constants.UNDO_TURN,
    });
  };
}

export function GameUpdateAction(
  updatedState: IGameState,
): ThunkAction<Promise<Action>, StoreState, void, IGameInitial> {
  return async (dispatch: Dispatch<IGameInitial>): Promise<Action> => {
    return dispatch({
      state: updatedState,
      type: constants.GAME_UPDATE,
    });
  };
}
