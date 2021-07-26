import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CartProductCard } from "../../../components/index";
import {
  decrementById,
  removeById,
  incrementById,
} from "../../../store/cart/cartSlice";

import styles from "./CartProductHub.module.css";

function CartProductHub({ cartArr }) {
  const dispatch = useDispatch();
  const onDecr = useCallback((id) => {
    dispatch(decrementById(id));
  }, []);
  const onIncr = useCallback((id) => {
    dispatch(incrementById(id));
  }, []);
  const onRemove = useCallback((id) => {
    dispatch(removeById(id));
  }, []);

  return (
    <div className={styles.cartProductHub}>
      {cartArr.map((entry) => {
        const [id, value] = entry;
        return (
          <CartProductCard
            key={id}
            amount={value.count}
            product={value.product}
            onDecr={onDecr}
            onIncr={onIncr}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}

export default CartProductHub;
