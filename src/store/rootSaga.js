import { all } from "redux-saga/effects";
import { watchPlaceOrder, watchFetchOrderById } from "./orders/sagas";

export default function* rootSaga() {
  yield all([watchPlaceOrder(), watchFetchOrderById()]);
}
