/*  eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { fetchShopPage } from "./thunks";

export const shopAdapter = createEntityAdapter({
  // Sort by price
  sortComparer: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
});

const initialState = shopAdapter.getInitialState({
  total: 0,
  status: "idle",
  error: null,
});

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchShopPage.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchShopPage.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        shopAdapter.setAll(state, action.payload.items);
        state.total = action.payload.totalItems;
        state.status = "succeeded";
      }
    },
    [fetchShopPage.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export default shopSlice.reducer;
