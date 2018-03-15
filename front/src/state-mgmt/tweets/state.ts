import { TweetModel } from '../../models';

export const stateName: string = 'tweets';

export class State {
  public list: TweetModel[] = [];

  constructor(args?: State) {
    if (args) Object.assign(this, args);
  }
}
