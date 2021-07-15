import { configureStore } from "@reduxjs/toolkit";

import shopReducer from "./shop/shopSlice";
import cartReducer from "./cart/cartSlice";
import filtersReducer from "./filters/filtersSlice";
import productReducer from "./product/productSlice";

export default configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    filters: filtersReducer,
    product: productReducer,
  },
});
