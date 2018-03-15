import { TweetsResponseModel } from '../../models';
import { tweetsResponse } from './tweetsResponse';

export class MockTwitterRepository {
  public async getTweets(query: string): Promise<TweetsResponseModel> {
    return tweetsResponse;
  }
}
