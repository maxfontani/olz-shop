import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import shopReducer from "./shop/shopSlice";
import cartReducer from "./cart/cartSlice";
import filtersReducer from "./filters/filtersSlice";
import productsReducer from "./products/productsSlice";
import ordersReducer from "./orders/ordersSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    filters: filtersReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
