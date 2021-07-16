import { createSelector } from "reselect";

export const selectMyProductState = (state) => state.myProduct;

export const selectMyProduct = createSelector(
  selectMyProductState,
  (productState) => {
    if (productState?.product?.id) {
      return productState.product;
    }
    return undefined;
  },
);
