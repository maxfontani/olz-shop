import yalantisClient from './axios';

export function getAllProductsAsync(dispatch) {
  return yalantisClient
    .get('/products')
    .then((response) => {
      if (response.data && response.data.items) {
        dispatch({ type: 'fetchedAllProducts', payload: response.data.items });
      } else {
        dispatch({});
      }
    })
    .catch((err) => {
      console.error('ERR fetching products', err);
      dispatch({ type: 'setError' });
    });
}

export function getProductByIdAsync(dispatch, id) {
  return yalantisClient
    .get(`/products/${id}`)
    .then((response) => {
      if (response.data && response.data.id) {
        dispatch({ type: 'fetchedActiveProduct', payload: response.data });
      } else {
        dispatch({ type: 'setError' });
      }
    })
    .catch((err) => {
      console.error('ERR fetching products', err);
      dispatch({ type: 'setError' });
    });
}
