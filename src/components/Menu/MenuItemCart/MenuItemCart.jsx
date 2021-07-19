import cart from "../../../images/cart.png";

import styles from "./MenuItemCart.module.css";

const MenuItemCart = ({ totalPrice }) => (
  <div className={styles.menuHeader}>
    <img alt="cart" aria-label="cart" src={cart} height="20" width="20" />
    &nbsp;
    <div className={styles.MenuItemCartText}>
      Корзина
      <div className={styles.MenuItemCartPrice}>
        {totalPrice > 0 && <span>({`$ ${totalPrice}`})</span>}
      </div>
    </div>
  </div>
);

export default MenuItemCart;
