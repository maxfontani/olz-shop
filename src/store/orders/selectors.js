import { createSelector } from "reselect";

export const selectOrdersHistoryState = (state) => state.orders.history;
export const selectMyOrderState = (state) => state.orders.myOrder;

export const selectOrdersHistoryArr = createSelector(
  selectOrdersHistoryState,
  (state) => state.orders,
);

export const selectOrdersHistoryStatus = createSelector(
  selectOrdersHistoryState,
  (state) => {
    return [state.status, state.error];
  },
);

export const selectMyOrderStatus = createSelector(
  selectMyOrderState,
  (state) => {
    return [state.status, state.error];
  },
);
