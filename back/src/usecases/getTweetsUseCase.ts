import { ProvideSingleton, inject } from '../ioc';
import { TwitterRepository } from '../repositories';
import { TweetsResponseModel } from '../models';

@ProvideSingleton(GetTweetsUseCase)
export class GetTweetsUseCase {

  constructor(@inject(TwitterRepository) private twitterRepository: TwitterRepository) { }

  public async getTweets(query: string): Promise<TweetsResponseModel> {
    return this.twitterRepository.getTweets(query);
  }
}
