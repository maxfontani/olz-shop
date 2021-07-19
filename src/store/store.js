import { configureStore } from "@reduxjs/toolkit";

import shopReducer from "./shop/shopSlice";
import cartReducer from "./cart/cartSlice";
import filtersReducer from "./filters/filtersSlice";
import productsReducer from "./products/productsSlice";
import ordersReducer from "./orders/ordersSlice";

export default configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    filters: filtersReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});
