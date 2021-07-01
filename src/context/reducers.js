import {
  getAllProductsAsync,
  getProductByIdAsync,
} from '../services/api/yalantis';

export function storeReducer(state, action) {
  switch (action.type) {
    case 'fetchedAllProducts': {
      return {
        data: { ...state.data, products: action.payload },
        state: 'ready',
      };
    }
    case 'fetchedActiveProduct': {
      return {
        data: { ...state.data, activeProduct: action.payload },
        state: 'ready',
      };
    }
    case 'clearedActiveProduct': {
      return {
        data: { ...state.data, activeProduct: null },
        state: 'ready',
      };
    }
    case 'addedToCart': {
      const product = action.payload;

      if (product.id in state.data.cart) {
        const incrCount = state.data.cart[product.id].count + 1;
        return {
          data: {
            ...state.data,
            cart: {
              ...state.data.cart,
              [product.id]: { count: incrCount, product },
            },
          },
          state: 'ready',
        };
      }
      return {
        data: {
          ...state.data,
          cart: {
            ...state.data.cart,
            [product.id]: { count: 1, product },
          },
        },
        state: 'ready',
      };
    }
    case 'removedFromCart': {
      const id = action.payload;

      if (state.data.cart[id].count > 1) {
        const updatedCartProduct = {};
        Object.assign(updatedCartProduct, state.data.cart[id]);
        updatedCartProduct.count -= 1;

        return {
          data: {
            ...state.data,
            cart: {
              ...state.data.cart,
              [id]: { ...updatedCartProduct },
            },
          },
          state: 'ready',
        };
      }
      const updatedCart = {};
      Object.assign(updatedCart, state.data.cart);
      delete updatedCart[id];
      return {
        data: {
          ...state.data,
          cart: {
            ...updatedCart,
          },
        },
        state: 'ready',
      };
    }
    case 'setLoading': {
      return { ...state, state: 'loading' };
    }
    case 'setError': {
      return { ...state, state: 'error' };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function storeReducerAsync(dispatch, action) {
  switch (action.type) {
    case 'getAllProducts': {
      return getAllProductsAsync(dispatch);
    }
    case 'getProductById': {
      if (action.payload) {
        return getProductByIdAsync(dispatch, action.payload);
      }
      throw new Error(`Async action ${action.type} lacks payload (id)`);
    }
    default: {
      throw new Error(`Unhandled async action type: ${action.type}`);
    }
  }
}
