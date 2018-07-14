import * as firebase from 'firebase';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser, StoreState } from '../../@types';
import { auth, usersRef } from '../../lib/firebase';
import * as constants from '../constants';

export interface ILoginUser {
  type: constants.LOGIN_USER;
  payload: IUser;
}

export interface ICreateUser {
  type: constants.CREATE_USER;
  payload: IUser;
}

export interface IPersistedUser {
  type: constants.PERSISTED_USER;
  payload: IUser;
}

export interface ISignOutUser {
  type: constants.SIGN_OUT_USER;
  payload: IUser;
}

export type UserAction = ILoginUser | ICreateUser | IPersistedUser | ISignOutUser;

export function LoginUserAction(
  email: string,
  password: string,
): ThunkAction<Promise<Action>, StoreState, void, ILoginUser> {
  return async (dispatch: Dispatch<ILoginUser>): Promise<Action> => {
    try {
      const user = await auth
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => auth.signInWithEmailAndPassword(email, password));
      let username = '';

      if (user.user) {
        const snapshot = await usersRef.child(`${user.user.uid}`).once('value');
        const userRef = snapshot.val();
        username = userRef.username ? userRef.username : '';
      }
      return dispatch({
        payload: {
          email,
          isAuthenticated: true,
          username,
        },
        type: constants.LOGIN_USER,
      });
    } catch (e) {
      console.error(`Error fetching leaderboard: ${e}`);
      return {
        type: constants.LOGIN_USER,
      };
    }
  };
}

export function CreateUserAction(
  email: string,
  password: string,
  username: string,
): ThunkAction<Promise<Action>, StoreState, void, ICreateUser> {
  return async (dispatch: Dispatch<ICreateUser>): Promise<Action> => {
    try {
      try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        if (user.user) {
          await usersRef.child(`${user.user.uid}`).set({
            email,
            username,
            wins: 0,
          });
        }
      } catch (error) {
        throw new Error(error);
      }

      return dispatch({
        payload: {
          email,
          isAuthenticated: true,
          username,
        },
        type: constants.CREATE_USER,
      });
    } catch (e) {
      console.error(`Error creating user: ${e}`);
      return {
        type: constants.CREATE_USER,
      };
    }
  };
}

export function PersistedUserAction(): ThunkAction<
  Promise<Action>,
  StoreState,
  void,
  IPersistedUser
> {
  return async (dispatch: Dispatch<IPersistedUser>): Promise<any> => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const snapshot = await usersRef.child(`${user.uid}`).once('value');
        const userRef = snapshot.val();

        return dispatch({
          payload: {
            email: user.email as string,
            isAuthenticated: true,
            username: userRef.username ? userRef.username : '',
          },
          type: constants.PERSISTED_USER,
        });
      }

      return dispatch({
        payload: {
          email: '',
          isAuthenticated: false,
          username: '',
        },
        type: constants.PERSISTED_USER,
      });
    });
  };
}

export function SignOutUserAction(): ThunkAction<Promise<Action>, StoreState, void, ISignOutUser> {
  return async (dispatch: Dispatch<ISignOutUser>): Promise<any> => {
    await auth.signOut();
    dispatch({
      payload: {
        email: '',
        isAuthenticated: false,
        username: '',
      },
      type: constants.SIGN_OUT_USER,
    });
  };
}
