import { useSelector } from "react-redux";
import { CartProductCard } from "../../exports";
import { selectCartArr } from "../../../store/cartSlice";

import styles from "../../../styles/Home.module.css";

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
