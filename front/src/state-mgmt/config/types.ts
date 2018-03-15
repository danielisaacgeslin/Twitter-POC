export interface Action {
  type: string;
  payload?: any;
}

export interface State {
  
}

export type Reducer<T> = (state: T, action: Action) => T;
export type Effect = (action: Action) => void;
