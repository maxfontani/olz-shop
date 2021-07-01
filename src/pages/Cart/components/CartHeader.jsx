import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../../../store/cartSlice";
import cart from "../../../images/cart.png";

import styles from "../../../styles/Home.module.css";

function CartHeader() {
  const totalPrice = useSelector(selectCartTotalPrice);
  return (
    <div className={styles.cartHeader}>
      <img alt="cart" aria-label="cart" src={cart} height="20" width="20" />
      &nbsp;
      <div className={styles.cartHeaderText}>
        Корзина
        <div className={styles.cartHeaderPrice}>
          {totalPrice > 0 && <span>({`$ ${totalPrice}`})</span>}
        </div>
      </div>
    </div>
  );
}

export default CartHeader;
