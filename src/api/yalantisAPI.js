import axios from "axios";

const yalantisApi = axios.create({
  baseURL: "https://yalantis-react-school-api.yalantis.com/api/v1",
});

export function getAllProductsAsync(dispatch) {
  return yalantisApi
    .get("/products")
    .then((response) => {
      if (response.data && response.data.items) {
        dispatch({ type: "fetchedAllProducts", payload: response.data.items });
      } else {
        dispatch({});
      }
    })
    .catch((err) => {
      console.log("ERR fetching products", err);
      dispatch({ type: "setError" });
    });
}

export function getProductByIdAsync(dispatch, id) {
  dispatch({ type: "clearedActiveProduct" });
  return yalantisApi
    .get(`/products/${id}`)
    .then((response) => {
      if (response.data && response.data.id) {
        dispatch({ type: "fetchedActiveProduct", payload: response.data });
      } else {
        dispatch({ type: "setError" });
      }
    })
    .catch((err) => {
      console.log("ERR fetching products", err);
      dispatch({ type: "setError" });
    });
}
