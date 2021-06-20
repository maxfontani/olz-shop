import { useStoreState } from "./context";

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
  const cart = store.data.cart;
  if (!cart || cart.length === 0) {
    return 0;
  } else {
    let totalCartPrice = 0;
    for (const id in cart) {
      totalCartPrice =
        totalCartPrice + cart[id]["product"]["price"] * cart[id]["count"];
    }
    return totalCartPrice;
  }
}

export function useSelectorCartProducts() {
  const store = useStoreState();
  const cartIds = store.data.cart;
  const cartProducts = store.data.products.filter((product) =>
    cartIds.includes(product.id)
  );
  return cartProducts;
}
