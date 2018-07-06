import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ILeader, ILeaderboard, StoreState } from '../../@types';
import { leadersRef } from '../../lib/firebase';
import * as constants from '../constants';

export interface IFetchLeaders {
  type: constants.FETCH_LEADERS;
  payload: ILeaderboard;
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
      const snapshot = await leadersRef.once('value');
      let payload = snapshot.val();
      payload = Object.keys(payload).map(p => ({
        name: p,
        wins: payload[p],
      }));

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
  current: ILeader[],
): ThunkAction<Promise<Action>, StoreState, void, IUpdateLeaders> {
  return async (dispatch: Dispatch<IUpdateLeaders>): Promise<Action> => {
    try {
      const currentWins = current.find(l => l.name.toLowerCase() === name.toLowerCase()) || {
        name,
        wins: 0,
      };
      const newWins = currentWins.wins + 1;
      await leadersRef.child(`/${name}`).set(newWins);

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
