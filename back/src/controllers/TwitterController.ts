import { Route, Controller, Get, Query } from 'tsoa';

import { ProvideSingleton, inject } from '../ioc';
import { TweetsResponseModel } from '../models';
import { GetTweetsUseCase } from '../usecases';

@Route('twitter')
@ProvideSingleton(TwitterController)
export class TwitterController extends Controller {

  constructor(@inject(GetTweetsUseCase) private getTweetsUseCase: GetTweetsUseCase) {
    super();
  }

  @Get()
  public async getById(@Query() query: string): Promise<TweetsResponseModel> {
    return this.getTweetsUseCase.getTweets(query);
  }
}
