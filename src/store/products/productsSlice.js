/* eslint no-param-reassign: ["off", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import { createSlice } from "@reduxjs/toolkit";
import { postMyProduct, editMyProduct, fetchProduct } from "./thunks";

export const initialState = {
  product: {
    product: {},
    status: "idle",
    error: null,
  },
  myProduct: {
    myProduct: {},
    status: "idle",
    error: null,
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    SET_MYPRODUCT: (state, action) => {
      const myProduct = action.payload;
      state.myProduct.myProduct = myProduct;
    },
    CLEARED_MYPRODUCT: (state) => {
      state.myProduct = initialState.myProduct;
    },
    CLEARED_PRODUCT: (state) => {
      state.product = initialState.product;
    },
  },
  extraReducers: {
    [postMyProduct.pending]: (state) => {
      state.myProduct.status = "loading";
      state.myProduct.error = null;
    },
    [postMyProduct.fulfilled]: (state, action) => {
      if (state.myProduct.status === "loading") {
        state.myProduct.myProduct = action.payload;
        state.myProduct.status = "success";
      }
    },
    [postMyProduct.rejected]: (state, action) => {
      if (state.myProduct.status === "loading") {
        state.myProduct.status = "error";
        state.myProduct.error = action.error?.message;
      }
    },
    [editMyProduct.pending]: (state) => {
      state.myProduct.status = "loading";
      state.myProduct.error = null;
    },
    [editMyProduct.fulfilled]: (state, action) => {
      if (state.myProduct.status === "loading") {
        state.myProduct.myProduct = action.payload;
        state.myProduct.status = "success";
      }
    },
    [editMyProduct.rejected]: (state, action) => {
      if (state.myProduct.status === "loading") {
        state.myProduct.status = "error";
        state.myProduct.error = action.error?.message;
      }
    },
    [fetchProduct.pending]: (state) => {
      state.product.status = "loading";
      state.error = null;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      if (state.product.status === "loading") {
        state.product.product = action.payload;
        state.product.status = "success";
      }
    },
    [fetchProduct.rejected]: (state, action) => {
      if (state.product.status === "loading") {
        state.product.status = "error";
        state.product.error = action.error?.message;
      }
    },
  },
});

export const {
  CLEARED_PRODUCT: clearProduct,
  CLEARED_MYPRODUCT: clearMyProduct,
  SET_MYPRODUCT: setMyProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
