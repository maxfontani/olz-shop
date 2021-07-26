import { createSelector } from "reselect";
import { calcTotalPrice } from "../../utils/helpers";

export const selectCartArr = (state) => Object.entries(state.cart);
export const selectCartItems = (state) => Object.values(state.cart);
export const selectCartById = (state, id) => state.cart[id] ?? undefined;
export const selectCountById = (state, id) =>
  state.cart[id] ? state.cart[id].count : undefined;

export const selectCartLength = createSelector(
  selectCartArr,
  (arr) => arr.length,
);

export const selectCartTotalPrice = createSelector(selectCartItems, (items) =>
  calcTotalPrice(items),
);

export const selectCartOrder = createSelector(selectCartArr, (cartArr) => {
  const order = { pieces: [] };
  order.pieces = cartArr.map((entry) => {
    const [id, value] = entry;
    return { productId: id, count: value.count };
  });
  return order;
});
