import { createAsyncThunk } from "@reduxjs/toolkit";
import { yalantisApi, yalantisApiAuth } from "../../services/api/axios";
import {
  setFiltersEditable,
  initialState as filters,
} from "../filters/filtersSlice";
import { fetchShopPage } from "../shop/thunks";

export const fetchProduct = createAsyncThunk(
  "products/product/fetchProduct",
  async (id) => {
    const response = await yalantisApi.get(`/products/${id}`);
    return response.data;
  },
);

export const postMyProduct = createAsyncThunk(
  "products/myProduct/postMyProduct",
  async ({ product, dispatch }) => {
    const response = await yalantisApiAuth.post(
      "/products",
      { product },
      { timeout: 2500 },
    );
    if (response.data.id)
      dispatch(fetchShopPage({ ...filters, editable: true }));
    return response.data;
  },
);

export const editMyProduct = createAsyncThunk(
  "products/myProduct/editMyProduct",
  async ({ id, product, dispatch }) => {
    const response = await yalantisApiAuth.patch(
      `/products/${id}`,
      {
        product,
      },
      { timeout: 4700 },
    );
    if (response.data.id) dispatch(setFiltersEditable(true));
    return response.data;
  },
);
