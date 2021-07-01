import useStoreState from './useStoreState';

export function useSelectorActiveProduct() {
  const store = useStoreState();
  return store.data.activeProduct;
}

export function useSelectorCart() {
  const store = useStoreState();
  return store.data.cart;
}

export function useSelectorCartTotalPrice() {
  const store = useStoreState();
  const cart = { ...store.data.cart };
  if (!cart || cart.length === 0) {
    return 0;
  }
  const totalCartPrice = Object.values(cart).reduce((acc, cur) => {
    return acc + cur.product.price * cur.count;
  }, 0);
  return totalCartPrice;
}

export function useSelectorCartProducts() {
  const store = useStoreState();
  const cartIds = store.data.cart;
  const cartProducts = store.data.products.filter((product) =>
    cartIds.includes(product.id),
  );
  return cartProducts;
}
