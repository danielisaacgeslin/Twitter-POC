import * as React from 'react';
import { debounce } from 'lodash';

import { TweetModel } from '../../models';
import { Tweet } from './tweet.component';

export interface HomeProps {
  fetchTweets: (query: string) => void;
  list: TweetModel[];
}

export class Home extends React.Component<HomeProps, any> {
  public debouncedSearch: any = debounce(this.search.bind(this), 500);

  public search(query: string): void {
    this.props.fetchTweets(query);
  }

  public render(): JSX.Element {
    return (
      <div className="container mx-auto">
        <form className="w-full">
          <div className="flex items-center border-b border-b-2 border-teal py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2"
              aria-label="search"
              type="text"
              placeholder="search"
              onChange={(event: any) => { this.debouncedSearch(event.target.value); }}
            />
          </div>
        </form>
        <ul className="flex flex-wrap">
          {this.props.list.map(tweet => (
            <div key={tweet.id_str} className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <Tweet tweet={tweet} />
            </div>
          ))}
        </ul>
      </div>
    );
  }
}