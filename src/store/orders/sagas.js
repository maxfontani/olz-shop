import { call, put } from "redux-saga/effects";
import { yalantisApiAuth } from "../../services/api/axios";
import { clearCart } from "../cart/cartSlice";

export function* fetchOrderById(action) {
  try {
    const id = action.payload;
    yield put({ type: "orders/FETCH_ORDER_BY_ID_LOADING" });
    const response = yield call(yalantisApiAuth.get, `/orders/${id}`);
    const data = response?.data;
    yield put({ type: "orders/FETCH_ORDER_BY_ID_SUCCEEDED", payload: data });
  } catch (error) {
    yield put({ type: "orders/FETCH_ORDER_BY_ID_FAILED", error });
  }
}

export function* placeOrder(action) {
  try {
    const orderObj = action.payload;
    yield put({ type: "orders/PLACE_ORDER_LOADING" });
    const response = yield call(yalantisApiAuth.post, [
      "/orders",
      { order: orderObj },
    ]);
    const data = response?.data;
    if (data.id) yield put(clearCart());
    yield put({ type: "orders/PLACE_ORDER_SUCCEEDED", payload: data });
  } catch (error) {
    yield put({ type: "orders/PLACE_ORDER_FAILED", error });
  }
}
