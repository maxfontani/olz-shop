import { createSelector } from "reselect";

export const selectProductState = (state) => state.product;

export const selectProduct = createSelector(
  selectProductState,
  (productState) => {
    if (productState.product.id) {
      return productState.product;
    }
    return undefined;
  },
);
