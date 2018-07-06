import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../../@types';
import { leadersRef } from '../../lib/firebase';
import * as constants from '../constants';

export interface IFetchLeaders {
  type: constants.FETCH_LEADERS;
  payload: any;
}

export type FetchLeadersAction = ThunkAction<{}, {}, {}, IFetchLeaders>;

export const FetchLeadersAction: ActionCreator<
  ThunkAction<Promise<Action>, StoreState, void, IFetchLeaders>
> = () => {
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
};
