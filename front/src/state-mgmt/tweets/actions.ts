import { TweetModel } from '../../models';
import { stateName } from './state';

export const actionTypes = {
  'FETCH_TWEETS': `[${stateName}] Fetch tweets`,
  'SET_TWEETS': `[${stateName}] Set tweets`
};

export class FetchTweets {
  public readonly type: string = actionTypes.FETCH_TWEETS;
  constructor(public payload: { query: string }) { }
}

export class SetTweets {
  public readonly type: string = actionTypes.SET_TWEETS;
  constructor(public payload: TweetModel[]) { }
}

export const actions = {
  fetchTweets: (payload: { query: string }) => ({ payload, type: actionTypes.FETCH_TWEETS }),
  setTweets: (payload: TweetModel[]) => ({ payload, type: actionTypes.SET_TWEETS }),
};
