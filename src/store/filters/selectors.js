import { createSelector } from "reselect";

export const selectFilters = (state) => state.filters;

export const selectCartTotalPrice = createSelector(
  selectFilters,
  (filters) => filters.page,
);
