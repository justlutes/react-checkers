import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState, IGameState, ICheckerValue } from '../../@types';
import * as constants from '../constants';
import { rowsApart } from '../../lib/rowUtils';
import { ColorValues } from '../../enum';
// import { auth, roomsRef } from '../../lib/firebase';
// import { push } from 'react-router-redux';

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
  type: constants.GAME_INITIALIZED;
}

export interface ITurnOver {
  state: IGameState;
  type: constants.TURN_OVER;
}

export interface IGameOver {
  state: IGameState;
  type: constants.GAME_OVER;
}

export type GameAction = IMoveChecker | ITurnOver | IGameOver | IGameInitial | IStartMove;

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
    const blockedRows = [
      cellIndex - 9,
      cellIndex - 18,
      cellIndex - 7,
      cellIndex - 14,
      cellIndex + 7,
      cellIndex + 14,
      cellIndex + 9,
      cellIndex + 18,
    ];

    const newAuxiliary = blockedRows.map((ele, index) => {
      // turn is over
      if (!ongoing) {
        return -1;
      } else if (
        false ||
        // our rules chart for determining whether a cell is a valid destination
        // or not
        ele < 0 ||
        ele > 63 || // space needs to be on the board
        cells[ele] !== -1 || // space needs to be empty
        (index % 2 !== 0 &&
          (cells[blockedRows[index - 1]] === -1 || // outer cells need a piece to jump over
            cells[blockedRows[index - 1]].color === color)) || // and we can't eat friendlies
        (index % 2 === 1 && rowsApart(cellIndex, ele) !== 2) || // must maintain diagonal move structure
        (index % 2 === 0 && rowsApart(cellIndex, ele) !== 1) ||
        (color === ColorValues.red && ele > cellIndex && !cells[cellIndex].king) || // non-kings cannot move backwards
        (color === ColorValues.black && ele < cellIndex && !cells[cellIndex].king)
      ) {
        return -1;
      }
      return ele; // default
    });

    return dispatch({
      state: { ...currentState, auxiliary: newAuxiliary },
      type: constants.START_MOVE,
    });
  };
}
