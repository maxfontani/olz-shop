import { createAsyncThunk } from "@reduxjs/toolkit";
import yalantisApi from "../../services/api/axios";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    try {
      const response = await yalantisApi.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export default fetchProduct;
