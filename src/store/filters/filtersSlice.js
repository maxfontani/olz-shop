/* eslint no-param-reassign: "off" */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  perPage: 50,
  origins: "",
  minPrice: "",
  maxPrice: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    SET_FILTERS: (state, action) => {
      const filters = action.payload;
      return { ...state, ...filters };
    },
    SET_PAGE: (state, action) => {
      const page = action.payload;
      state.page = page;
    },
    SET_PER_PAGE: (state, action) => {
      const perPage = action.payload;
      state.perPage = perPage;
    },
    SET_ORIGINS: (state, action) => {
      const origins = action.payload;
      state.origins = origins;
    },
    SET_MIN_PRICE: (state, action) => {
      const minPrice = action.payload;
      state.minPrice = minPrice;
    },
    SET_MAX_PRICE: (state, action) => {
      const maxPrice = action.payload;
      state.maxPrice = maxPrice;
    },
    RESET: (state) => initialState,
  },
});

export const {
  SET_FILTERS: setFilters,
  SET_PAGE: setFiltersPage,
  SET_PER_PAGE: setFiltersPerPage,
  SET_ORIGINS: setFiltersOrigins,
  SET_MIN_PRICE: setFiltersMinPrice,
  SET_MAX_PRICE: setFiltersMaxPrice,
  RESET: resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
