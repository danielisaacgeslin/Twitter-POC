import * as React from 'react';

export interface HashtagProps {
  hashtag: string;
}

export class Hashtag extends React.Component<HashtagProps, any> {
  public cssClasses: string[] = [
    'inline-block',
    'bg-grey-lighter',
    'rounded-full',
    'px-3',
    'py-1',
    'text-sm',
    'font-semibold',
    'text-grey-darker',
    'mr-2'
  ];
  public render(): JSX.Element {
    return (
      <span className={this.cssClasses.join(' ')}>
        #{this.props.hashtag}
      </span>
    );
  }
}
