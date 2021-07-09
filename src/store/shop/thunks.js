import { createAsyncThunk } from "@reduxjs/toolkit";
import yalantisApi from "../../services/api/axios";

export const fetchShopPage = createAsyncThunk(
  "shop/fetchShopPage",
  async (params) => {
    const query = {
      page: params.page || 1,
      perPage: params.perPage || 50,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      origins: params.origins,
    };
    try {
      const response = await yalantisApi.get("/products", {
        params: {
          ...query,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export default fetchShopPage;
