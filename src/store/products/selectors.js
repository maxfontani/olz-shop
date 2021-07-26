import { createSelector } from "reselect";

export const selectMyProductState = (state) => state.products.myProduct;

export const selectMyProductStatus = createSelector(
  selectMyProductState,
  (myProductState) => [myProductState.status, myProductState.error],
);

export const selectMyProduct = createSelector(
  selectMyProductState,
  (myProductState) => {
    if (myProductState?.myProduct?.id) {
      return myProductState.myProduct;
    }
    return undefined;
  },
);

export const selectProductState = (state) => state.products.product;

export const selectProduct = createSelector(
  selectProductState,
  (productState) => {
    if (productState.product.id) {
      return productState.product;
    }
    return undefined;
  },
);
