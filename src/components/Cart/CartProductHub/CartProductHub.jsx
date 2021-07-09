import { useSelector } from "react-redux";
import { CartProductCard } from "../index";
import { selectCartArr } from "../../../store/cart/selectors";

import styles from "./CartProductHub.module.css";

function CartProductHub() {
  const cartArr = useSelector(selectCartArr);

  return (
    <div className={styles.cartProductHub}>
      {cartArr.map((entry) => {
        const [id, value] = entry;
        return (
          <CartProductCard
            key={id}
            id={id}
            amount={value.count}
            product={value.product}
          />
        );
      })}
    </div>
  );
}

export default CartProductHub;
