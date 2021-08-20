import { createAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { yalantisApiAuth } from "../../services/api/axios";
import { clearCart } from "../cart/cartSlice";

import {
  fetchOrderByIdLoading,
  fetchOrderByIdFailed,
  fetchOrderByIdSucceeded,
  placeOrderLoading,
  placeOrderFailed,
  placeOrderSucceeded,
} from "./ordersSlice";

export const sagaOrdersActions = {
  fetchOrderById: createAction("orders/FETCH_ORDER_BY_ID"),
  placeOrder: createAction("orders/PLACE_ORDER"),
};

export function* fetchOrderById(action) {
  try {
    const id = action.payload;
    yield put(fetchOrderByIdLoading());
    const response = yield call(yalantisApiAuth.get, `/orders/${id}`);
    const data = response?.data;
    yield put(fetchOrderByIdSucceeded(data));
  } catch (error) {
    yield put(fetchOrderByIdFailed(error));
  }
}

export function* placeOrder(action) {
  try {
    const orderObj = action.payload;
    yield put(placeOrderLoading());
    const response = yield call(yalantisApiAuth.post, "/orders/", {
      order: orderObj,
    });
    const data = response?.data;
    if (data.id) yield put(clearCart());
    yield put(placeOrderSucceeded(data));
  } catch (error) {
    yield put(placeOrderFailed(error));
  }
}

export function* watchFetchOrderById() {
  yield takeEvery(sagaOrdersActions.fetchOrderById().type, fetchOrderById);
}

export function* watchPlaceOrder() {
  yield takeEvery(sagaOrdersActions.placeOrder().type, placeOrder);
}
