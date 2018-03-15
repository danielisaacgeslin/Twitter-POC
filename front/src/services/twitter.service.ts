import axios from 'axios';

import { TweetsResponseModel } from '../models';

export class TwitterService {
  private endpoint: string = 'http://localhost:3030/twitter';

  public async getTweets(query: string): Promise<TweetsResponseModel> {
    const options = { params: query };
    const { data } = await axios.get<TweetsResponseModel>(this.endpoint, options);
    return data;
  }
}