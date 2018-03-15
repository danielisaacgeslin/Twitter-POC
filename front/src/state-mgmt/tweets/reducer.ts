import { Action } from '../config';
import { actionTypes } from './actions';
import { stateName, State } from './state';
import { reducerRegistry } from '../config/reducer-registry';

export const reducer = (state = new State(), action: Action): State => {
  switch (action.type) {
    case actionTypes.SET_TWEETS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};

reducerRegistry.register(stateName, reducer);
