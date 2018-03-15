import * as React from 'react';

export class Header extends React.Component {
  public render(): JSX.Element {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          POC
        </div>
      </nav>
    );
  }
}