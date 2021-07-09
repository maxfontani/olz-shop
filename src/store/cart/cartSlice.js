/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }] */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADDED_BY_ID: (state, action) => {
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
    INCREMENTED_BY_ID: (state, action) => {
      const id = action.payload;
      if (id in state) {
        state[id].count += 1;
      }
    },
    DECREMENTED_BY_ID: (state, action) => {
      const id = action.payload;
      if (id in state && state[id].count > 1) {
        state[id].count -= 1;
      }
    },
    SET_COUNT_BY_ID: (state, action) => {
      const { id, count } = action.payload;
      if (id in state && typeof count === "number" && count > 0)
        state[id].count = count;
    },
    REMOVED_BY_ID: (state, action) => {
      const id = action.payload;
      if (id in state) delete state[id];
    },
  },
});

export const {
  ADDED_BY_ID: addById,
  SET_COUNT_BY_ID: setCountById,
  INCREMENTED_BY_ID: incrementById,
  DECREMENTED_BY_ID: decrementById,
  REMOVED_BY_ID: removeById,
} = cartSlice.actions;

export default cartSlice.reducer;
