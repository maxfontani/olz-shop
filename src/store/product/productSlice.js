/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./thunks";

const initialState = {
  product: {},
  status: "idle",
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CLEARED: (state) => {
      state.product = {};
    },
  },
  extraReducers: {
    [fetchProduct.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.product = action.payload;
        state.status = "succeeded";
      }
    },
    [fetchProduct.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export const { CLEARED: clearProduct } = productSlice.actions;

export default productSlice.reducer;
