import { expect } from 'chai';

import { MockTwitterRepository } from '../mocks/MockTwitterRepository';
import { GetTweetsUseCase } from '../../usecases';

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('GetTweetsUseCase', () => {
  let useCase: GetTweetsUseCase;
  beforeEach(() => {
    useCase = new GetTweetsUseCase(new MockTwitterRepository() as any);
  });

  it('should get tweets', async () => {
    const tweets = await useCase.getTweets('query-string');
    expect(!!tweets.search_metadata).to.be.true
    expect(!!tweets.statuses).to.be.true
    expect(tweets.statuses.length).to.be.greaterThan(0);
  });
});
