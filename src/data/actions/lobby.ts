import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as uuid from 'uuid/v4';
import { StoreState, IGameState } from '../../@types';
import * as constants from '../constants';
import generateBoard from '../../lib/generateBoard';
import { auth, roomsRef } from '../../lib/firebase';
import { push } from 'react-router-redux';

export interface ICreateRoom {
  roomId: number;
  type: constants.CREATE_LOBBY;
  state: IGameState;
}

export interface IJoinRoom {
  full: boolean;
  role?: 'black' | 'red';
  roomId: string | null;
  state?: IGameState;
  type: constants.JOIN_LOBBY;
}

export type LobbyAction = ICreateRoom | IJoinRoom;

export function CreateRoomAction(): ThunkAction<Promise<Action>, StoreState, void, ICreateRoom> {
  return async (dispatch: Dispatch<Action>): Promise<Action> => {
    try {
      const roomId = uuid();
      const roomData = {
        red: auth.currentUser && auth.currentUser.uid,
        roomId,
        state: generateBoard(),
      };
      await roomsRef.child(roomId.toString()).set(roomData);

      dispatch({
        ...roomData,
        type: constants.CREATE_LOBBY,
      });
      return dispatch(push(`/board/${roomId}`));
    } catch (e) {
      console.error(`Error creating lobby: ${e}`);
      return {
        type: constants.CREATE_LOBBY,
      };
    }
  };
}

export function JoinRoomAction(
  roomId: string,
): ThunkAction<Promise<Action>, StoreState, void, IJoinRoom> {
  return async (dispatch: Dispatch<Action>): Promise<Action> => {
    try {
      const roomRef = roomsRef.child(roomId);
      const snapshot = await roomRef.once('value');
      const existingRoom = snapshot.val();
      const uid = auth.currentUser && auth.currentUser.uid;

      if (!existingRoom) {
        return dispatch({
          full: false,
          roomId: null,
          type: constants.JOIN_LOBBY,
        });
      }

      if (existingRoom.red === uid) {
        dispatch({
          full: false,
          role: 'red',
          roomId,
          state: existingRoom.state,
          type: constants.JOIN_LOBBY,
        });
        return dispatch(push(`/board/${roomId}`));
      }

      if (existingRoom.black === undefined) {
        await roomRef.child('black').set(uid);
        dispatch({
          full: false,
          role: 'black',
          roomId,
          state: { ...existingRoom.state, black: uid },
          type: constants.JOIN_LOBBY,
        });
        return dispatch(push(`/board/${roomId}`));
      }
      if (existingRoom.black === uid) {
        dispatch({
          full: false,
          role: 'black',
          roomId,
          state: existingRoom.state,
          type: constants.JOIN_LOBBY,
        });
        return dispatch(push(`/board/${roomId}`));
      }

      return dispatch({
        full: true,
        roomId: null,
        type: constants.JOIN_LOBBY,
      });
    } catch (e) {
      console.error(`Error joining lobby: ${e}`);
      return {
        type: constants.JOIN_LOBBY,
      };
    }
  };
}
