import React from "react";
import { storeReducer, storeReducerAsync } from "./reducers";

export const StoreStateContext = React.createContext();
export const StoreDispatchContext = React.createContext();

function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(storeReducer, {
    data: { products: null, activeProduct: null, cart: [] },
    state: "idle",
  });

  const dispatchAsync = (action) => {
    dispatch({ type: "setLoading" });
    storeReducerAsync(dispatch, action);
  };

  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider
        value={{ dispatch: dispatch, dispatchAsync: dispatchAsync }}
      >
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
}

function useStoreState() {
  const context = React.useContext(StoreStateContext);
  if (context === undefined) {
    throw new Error("useStoreState must be used within a StoreProvider");
  }
  return context;
}

function useStoreDispatch() {
  const context = React.useContext(StoreDispatchContext);
  if (context === undefined) {
    throw new Error("useStoreDispatch must be used within a StoreProvider");
  }
  return context;
}

export { StoreProvider, useStoreState, useStoreDispatch };
