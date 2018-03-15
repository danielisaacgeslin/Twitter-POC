import { TweetModel } from './TweetModel'

export interface TweetsResponseModel {
  statuses: TweetModel[];
  search_metadata: {
    completed_in: number;
    max_id: number;
    max_id_str: string;
    query: string;
    refresh_url: string;
    count: number;
    since_id: number;
    since_id_str: string;
  }
}
