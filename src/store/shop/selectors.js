import { createSelector } from "reselect";
import { shopAdapter } from "./shopSlice";

export const {
  selectAll: selectAllProducts,
  selectIds: selectProductIds,
  selectById: selectProductById,
} = shopAdapter.getSelectors((state) => state.shop);

export const selectShop = (state) => state.shop;

export const selectShopTotal = createSelector(selectShop, (shop) => shop.total);

export const selectShopStatus = createSelector(selectShop, (shop) => [
  shop.status,
  shop.error,
]);
