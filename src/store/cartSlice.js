/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addById: (state, action) => {
      const { id } = action.payload;
      if (id in state) {
        state[id].count += 1;
      } else {
        state[id] = {
          count: 1,
          product: { ...action.payload },
        };
      }
    },
    incrementById: (state, action) => {
      const id = action.payload;
      if (id in state) {
        state[id].count += 1;
      }
    },
    decrementById: (state, action) => {
      const id = action.payload;
      if (id in state && state[id].count > 1) {
        state[id].count -= 1;
      }
    },
    setCountById: (state, action) => {
      const { id, count } = action.payload;
      if (id in state && typeof count === 'number' && count > 0)
        state[id].count = count;
    },
    removeById: (state, action) => {
      const id = action.payload;
      if (id in state) delete state[id];
    },
  },
});

export const selectCartArr = (state) => Object.entries(state.cart);
export const selectCartById = (state, id) => state.cart[id] ?? undefined;
export const selectCountById = (state, id) =>
  state.cart[id] ? state.cart[id].count : undefined;
export const selectCartTotalPrice = (state) => {
  if (state.cart.length === 0) return 0;
  const totalCartPrice = Object.values(state.cart).reduce((acc, cur) => {
    return acc + cur.product.price * cur.count;
  }, 0);
  return totalCartPrice;
};

// Action creators are generated for each case reducer function
export const {
  addById,
  setCountById,
  incrementById,
  decrementById,
  removeById,
} = cartSlice.actions;

export default cartSlice.reducer;
