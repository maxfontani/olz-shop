import { createSelector } from "reselect";

export const selectCartArr = (state) => Object.entries(state.cart);
export const selectCartItems = (state) => Object.values(state.cart);
export const selectCartById = (state, id) => state.cart[id] ?? undefined;
export const selectCountById = (state, id) =>
  state.cart[id] ? state.cart[id].count : undefined;

export const selectCartLength = createSelector(
  selectCartArr,
  (arr) => arr.length,
);

export const selectCartTotalPrice = createSelector(
  selectCartLength,
  selectCartItems,
  (length, items) => {
    if (length === 0) return 0;
    const totalCartPrice = items.reduce((acc, cur) => {
      return acc + cur.product.price * cur.count;
    }, 0);
    return totalCartPrice;
  },
);
