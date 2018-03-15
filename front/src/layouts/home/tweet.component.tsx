import * as React from 'react';

import { TweetModel } from '../../models';
import { Hashtag } from './hashtag';

export interface TweetProps {
  tweet: TweetModel;
}

export class Tweet extends React.Component<TweetProps, any> {
  public render(): JSX.Element {
    const tweet: TweetModel = this.props.tweet;
    return (
      <li className="max-w-sm rounded overflow-hidden shadow-lg px-2">
        <img className="w-full" src={tweet.user.profile_banner_url} alt={tweet.user.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{tweet.user.name}</div>
          <p className="text-grey-darker text-base">
            {tweet.text}{tweet.truncated ? '...' : null}
          </p>
        </div>
        <div className="px-6 py-4">
          {tweet.entities.hashtags.map((hashtag, i) => <Hashtag key={i} hashtag={hashtag.text} />)}
        </div>
        <div className="flex items-stretch">
          <div className="self-center flex-1 text-center px-4 py-2 m-2">
            <a
              className="no-underline bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              href={`https://twitter.com/funnel_io/status/${tweet.id_str}`}
              target="_blank"
            >
              visit
            </a>
          </div>
        </div>
      </li>
    );
  }
}
