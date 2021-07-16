import { yalantisApi, yalantisApiAuth } from "./axios";
import { originsToSelectOptions } from "../../utils/helpers";

export function getOriginsAsync() {
  return yalantisApi
    .get("/products-origins")
    .then((response) => {
      if (response.data && response.data.items) {
        return response.data.items;
      }
      return [];
    })
    .catch(() => {
      throw new Error("Ошибка сервера при получении списка регионов.");
    });
}

export function postNewProduct(product) {
  return yalantisApiAuth
    .post("/products", { product })
    .then((response) => {
      if (response.data?.id) {
        return response.data;
      }
      return response?.message;
    })
    .catch((err) => err.message);
}

export function asyncOptionsLoader() {
  return getOriginsAsync().then((origins) => {
    return originsToSelectOptions(origins);
  });
}
