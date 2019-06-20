import * as React from 'react';
import { State, AnyAction } from '../App';

export const StateContext: React.Context<any> = React.createContext();

export const StateProvider = ({ reducer, initialState, children }: any): any => (
  <StateContext.Provider value={React.useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = (
  (): [State, React.Dispatch<AnyAction>] => React.useContext(StateContext)
);
