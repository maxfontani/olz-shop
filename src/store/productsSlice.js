/*  eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { yalantisApi, yalantisApiAuth } from "../services/api/axios";

export const fetchProductsPage = createAsyncThunk(
  "products/fetchProductsPage",
  async (params) => {
    const query = {
      page: params.page || 1,
      perPage: params.perPage || 50,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      origins: params.origins,
      editable: params.editable || false,
    };

    const api = query.editable ? yalantisApiAuth : yalantisApi;
    const response = await api.get("/products", {
      params: {
        ...query,
      },
    });
    return response.data;
  },
);

export const addProductThunk = createAsyncThunk(
  "products/addProductThunk",
  async (newProduct) => {
    // The value we return becomes the `fulfilled` action payload
    try {
      const response = await yalantisApiAuth.post("/products");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
);

const productsAdapter = createEntityAdapter({
  // Sort by price
  sortComparer: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
});

export const {
  selectAll: selectAllProducts,
  selectIds: selectProductIds,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state) => state.products);

const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({
    total: 0,
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: {
    // ON FETCH PRODUCTS
    [fetchProductsPage.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchProductsPage.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        productsAdapter.setAll(state, action.payload.items);
        state.total = action.payload.totalItems;
        state.status = "succeeded";
      }
    },
    [fetchProductsPage.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
    // ON ADD PRODUCT
    [addProductThunk.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [addProductThunk.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.status = "succeeded";
      }
    },
    [addProductThunk.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export const selectProductsTotal = (state) => state.products.total;

export default productsSlice.reducer;
