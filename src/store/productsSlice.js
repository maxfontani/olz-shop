import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { yalantisApi } from "../api/yalantisAPI";

export const fetchProductsPage = createAsyncThunk(
  "products/fetchProductsPage",
  async (params) => {
    const query = {
      page: params.page ?? 1,
      perPage: params.perPage ?? 50,
      origins: params.origins ?? "",
      minPrice: params.minPrice ?? "",
      maxPrice: params.maxPrice ?? "",
    };

    const response = await yalantisApi.get("/products", {
      params: {
        ...query,
      },
    });
    return response.data;
  }
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
    status: "idle",
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchProductsPage.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchProductsPage.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        console.log("FULF PAY ", action.payload);
        productsAdapter.setAll(state, action.payload.items);
        state.status = "succeeded";
      }
    },
    [fetchProductsPage.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

// export const {
//   productsCleared,
// } = productsSlice.actions;

export default productsSlice.reducer;

// export const reloadAllProducts = () => async (dispatch) => {
//   dispatch(productsCleared());
//   dispatch(fetchProducts());
// };
