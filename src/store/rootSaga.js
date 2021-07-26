import { takeEvery } from "redux-saga/effects";
import { fetchOrderById } from "./orders/sagas";

export default function* rootSaga() {
  yield takeEvery("saga/FETCH_ORDER_BY_ID", fetchOrderById);
}
