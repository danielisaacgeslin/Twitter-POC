import * as request from 'request';

import { ProvideSingleton, inject } from '../ioc';
import { safeParse } from '../utils';
import { TwitterTokenModel, TweetsResponseModel } from '../models';
import { TwitterController } from '../controllers/TwitterController';

@ProvideSingleton(TwitterRepository)
export class TwitterRepository {
  private token: TwitterTokenModel;

  public async getTweets(query: string): Promise<TweetsResponseModel> {
    const token: TwitterTokenModel = await this.getToken();
    return this.request<TweetsResponseModel>({
      method: 'GET',
      url: `https://api.twitter.com/1.1/search/tweets.json?q=${query}`,
      headers: { Authorization: `${this.token.token_type} ${this.token.access_token}`}
    });
  }

  private async getToken(): Promise<TwitterTokenModel> {
    if (this.token) return this.token;

    const key: string = 'dVTswNRT1lHDos6RwqwVv3kMJ';
    const secret: string = 'UGhDUM7ZckGSZMLKeOxwEe8hT8i3xCQ1Oxk79UZxfwupeL6x5y';
    const encodedSecret: string = new Buffer(`${key}:${secret}`).toString('base64');
    const options = {
      method: 'POST',
      url: 'https://api.twitter.com/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: `Basic ${encodedSecret}`
      },
      body: 'grant_type=client_credentials'
    }
    this.token = await this.request<TwitterTokenModel>(options);

    return this.token;
  }

  private async request<T>(options: { method: string; url: string; headers?: any; body?: string }): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      request(options, function (error, response) {
        if (error) return reject(error)
        else resolve(safeParse(response.body));
      });
    });
  }
}
