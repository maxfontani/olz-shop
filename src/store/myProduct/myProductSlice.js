/* eslint no-param-reassign: ["off", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import { createSlice } from "@reduxjs/toolkit";
import { postMyProduct, editMyProduct } from "./thunks";

const initialState = {
  myProduct: {},
  status: "idle",
  error: "",
};

export const myProductSlice = createSlice({
  name: "myProduct",
  initialState,
  reducers: {
    ADDED: (state, action) => {
      const product = action.payload;
      state.myProduct = product;
    },
    CLEARED: (_) => initialState,
  },
  extraReducers: {
    [postMyProduct.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [postMyProduct.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.myProduct = action.payload;
        state.status = "success";
      }
    },
    [postMyProduct.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "error";
        state.error = action.error?.message;
      }
    },
    [editMyProduct.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [editMyProduct.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.myProduct = action.payload;
        state.status = "success";
      }
    },
    [editMyProduct.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "error";
        state.error = action.error?.message;
      }
    },
  },
});

export const { CLEARED: clearMyProduct, ADDED: addMyProduct } =
  myProductSlice.actions;

export default myProductSlice.reducer;
