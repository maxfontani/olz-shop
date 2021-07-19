import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";
import { yalantisApiAuth } from "../../services/api/axios";

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ orderObj, dispatch }) => {
    const response = await yalantisApiAuth.post("/orders", { order: orderObj });
    if (response.data.id) dispatch(clearCart());
    return response.data;
  },
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id) => {
    const response = await yalantisApiAuth.get(`/orders/${id}`);
    return response.data;
  },
);

export const fetchOrdersHistory = createAsyncThunk(
  "orders/fetchOrdersHistory",
  async () => {
    const response = await yalantisApiAuth.get(`/orders`);
    return response.data;
  },
);
