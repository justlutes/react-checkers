import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser, StoreState } from '../../@types';
import { auth } from '../../lib/firebase';
import * as constants from '../constants';

export interface ILoginUser {
  type: constants.LOGIN_USER;
  payload: IUser;
}

export type UserAction = ILoginUser;

export function LoginUserAction(
  email: string,
  password: string,
): ThunkAction<Promise<Action>, StoreState, void, ILoginUser> {
  return async (dispatch: Dispatch<ILoginUser>): Promise<Action> => {
    try {
      let user;
      try {
        user = await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        user = await auth.createUserWithEmailAndPassword(email, password);
      }

      if (!user) {
        throw new Error('Unable to login');
      }

      return dispatch({
        payload: {
          email,
          isAuthenticated: true,
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
