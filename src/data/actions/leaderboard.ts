import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IFirebaseUser, ILeader, StoreState } from '../../@types';
import { usersRef } from '../../lib/firebase';
import * as constants from '../constants';

export interface IFetchLeaders {
  type: constants.FETCH_LEADERS;
  payload: ILeader[];
}

export interface IUpdateLeaders {
  type: constants.UPDATE_LEADERS;
}

export type LeadersAction = IFetchLeaders | IUpdateLeaders;

export function FetchLeadersAction(): ThunkAction<
  Promise<Action>,
  StoreState,
  void,
  IFetchLeaders
> {
  return async (dispatch: Dispatch<IFetchLeaders>): Promise<Action> => {
    try {
      const snapshot = await usersRef.once('value');
      const users = snapshot.val();

      const payload: IFirebaseUser[] = Object.keys(users)
        .map(u => ({
          name: users[u].email,
          wins: users[u].wins,
        }))
        .filter(u => u.wins > 0);

      return dispatch({
        payload,
        type: constants.FETCH_LEADERS,
      });
    } catch (e) {
      console.error(`Error fetching leaderboard: ${e}`);
      return {
        type: constants.FETCH_LEADERS,
      };
    }
  };
}

export function UpdateLeadersAction(
  name: string,
): ThunkAction<Promise<Action>, StoreState, void, IUpdateLeaders> {
  return async (dispatch: Dispatch<IUpdateLeaders>): Promise<Action> => {
    try {
      const snapshot = await usersRef.once('value');
      const users = snapshot.val();

      const existingUser = Object.keys(users).find(u => u === name);
      const newWins = existingUser ? users[existingUser] + 1 : 1;
      await usersRef.child(`/${name}`).set(newWins);

      return dispatch({
        type: constants.UPDATE_LEADERS,
      });
    } catch (e) {
      console.error(`Error updating leaderboard: ${e}`);
      return {
        type: constants.UPDATE_LEADERS,
      };
    }
  };
}
