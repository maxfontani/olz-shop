import React from 'react';
import { storeReducer, storeReducerAsync } from './reducers';

export const StoreStateContext = React.createContext();
export const StoreDispatchContext = React.createContext();

function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(storeReducer, {
    data: { products: null, activeProduct: null, cart: [] },
    state: 'idle',
  });

  const dispatchAsync = (action) => {
    dispatch({ type: 'setLoading' });
    storeReducerAsync(dispatch, action);
  };

  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={{ dispatch, dispatchAsync }}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
}

export { StoreProvider };
