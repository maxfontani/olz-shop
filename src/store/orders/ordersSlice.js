/* eslint no-param-reassign: ["off", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import { createSlice } from "@reduxjs/toolkit";
import { fetchOrdersHistory } from "./thunks";

const initialState = {
  history: {
    orders: [],
    status: "idle",
    error: null,
  },
  myOrder: {
    myOrder: {},
    status: "idle",
    error: null,
  },
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    SET_HISTORY: (state, action) => {
      const orders = action.payload;
      state.history.order = orders;
    },
    CLEARED: (_) => initialState,
    FETCH_ORDER_BY_ID_LOADING: (state) => {
      state.history.status = "loading";
      state.history.error = null;
    },
    FETCH_ORDER_BY_ID_SUCCEEDED: (state, action) => {
      if (state.history.status === "loading") {
        state.history.status = "success";
        state.history.orders = [action.payload];
      }
    },
    FETCH_ORDER_BY_ID_FAILED: (state, action) => {
      if (state.history.status === "loading") {
        state.history.status = "error";
        state.history.error = action.error?.message;
      }
    },
    PLACE_ORDER_LOADING: (state) => {
      state.myOrder.status = "loading";
      state.myOrder.error = null;
    },
    PLACE_ORDER_SUCCEEDED: (state, action) => {
      if (state.myOrder.status === "loading") {
        state.myOrder = action.payload;
        state.myOrder.status = "success";
      }
    },
    PLACE_ORDER_FAILED: (state, action) => {
      if (state.myOrder.status === "loading") {
        state.myOrder.status = "error";
        state.myOrder.error = action.error?.message;
      }
    },
  },
  extraReducers: {
    // Changed logic according to HM#4
    // [placeOrder.pending]: (state) => {
    //   state.myOrder.status = "loading";
    //   state.myOrder.error = null;
    // },
    // [placeOrder.fulfilled]: (state, action) => {
    //   if (state.myOrder.status === "loading") {
    //     state.myOrder = action.payload;
    //     state.myOrder.status = "success";
    //   }
    // },
    // [placeOrder.rejected]: (state, action) => {
    //   if (state.myOrder.status === "loading") {
    //     state.myOrder.status = "error";
    //     state.myOrder.error = action.error?.message;
    //   }
    // },
    // [fetchOrderById.pending]: (state) => {
    //   state.history.status = "loading";
    //   state.history.error = null;
    // },
    // [fetchOrderById.fulfilled]: (state, action) => {
    //   if (state.history.status === "loading") {
    //     state.history.status = "success";
    //     state.history.orders = [action.payload];
    //   }
    // },
    // [fetchOrderById.rejected]: (state, action) => {
    //   if (state.history.status === "loading") {
    //     state.history.status = "error";
    //     state.history.error = action.error?.message;
    //   }
    // },
    [fetchOrdersHistory.pending]: (state) => {
      state.history.status = "loading";
      state.history.error = null;
    },
    [fetchOrdersHistory.fulfilled]: (state, action) => {
      if (state.history.status === "loading") {
        const orders = action.payload.items;
        if (orders && orders.length) {
          state.history.orders = orders;
        } else {
          state.history.orders = [];
        }
        state.history.status = "success";
      }
    },
    [fetchOrdersHistory.rejected]: (state, action) => {
      if (state.history.status === "loading") {
        state.history.status = "error";
        state.history.error = action.error?.message;
      }
    },
  },
});

export const { CLEARED: clearOrders, SET_HISTORY: setOrdersHistory } =
  ordersSlice.actions;

export default ordersSlice.reducer;
