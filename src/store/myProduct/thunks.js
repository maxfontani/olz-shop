import { createAsyncThunk } from "@reduxjs/toolkit";
import { yalantisApiAuth } from "../../services/api/axios";

export const postMyProduct = createAsyncThunk(
  "myProduct/postMyProduct",
  async (product) => {
    const response = await yalantisApiAuth.post(
      "/products",
      { product },
      { timeout: 2500 },
    );
    return response.data;
  },
);

export const editMyProduct = createAsyncThunk(
  "myProduct/editMyProduct",
  async ({ id, product }) => {
    const response = await yalantisApiAuth.patch(
      `/products/${id}`,
      {
        product,
      },
      { timeout: 4700 },
    );
    return response.data;
  },
);
