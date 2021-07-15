import cart from "../../../images/cart.png";

import styles from "./MenuItemCart.module.css";

const MenuItemCart = ({ totalPrice }) => (
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

export default MenuItemCart;
