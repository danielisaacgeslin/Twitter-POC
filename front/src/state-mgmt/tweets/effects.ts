import { store, Action, Effect, effectRegistry } from '../config';
import { actionTypes, actions } from './actions';
import { twitterService } from '../../services';
import { TweetsResponseModel } from '../../models';

const Effect: Effect = async (action: Action): Promise<void> => {
  const response: TweetsResponseModel = await twitterService.getTweets(action.payload);
  store.dispatch(actions.setTweets(response.statuses));
};

effectRegistry.register(actionTypes.FETCH_TWEETS, Effect);
