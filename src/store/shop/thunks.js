import { createAsyncThunk } from "@reduxjs/toolkit";
import { yalantisApi, yalantisApiAuth } from "../../services/api/axios";

export const fetchShopPage = createAsyncThunk(
  "shop/fetchShopPage",
  async (params) => {
    const query = {
      page: params.page || 1,
      perPage: params.perPage || 50,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      origins: params.origins,
      editable: params.editable || false,
    };
    try {
      const api = query.editable ? yalantisApiAuth : yalantisApi;
      const response = await api.get("/products", {
        params: {
          ...query,
        },
      });
      return response.data || {};
    } catch (error) {
      return error;
    }
  },
);
