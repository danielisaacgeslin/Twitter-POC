import { connect } from 'react-redux';

import { actions } from '../../state-mgmt/tweets';
import { Home } from './home.component';

const mapStateToProps = (state: any): any => ({
  list: state.tweets.list
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchTweets: (query: string): void => dispatch(actions.fetchTweets({ query }))
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
