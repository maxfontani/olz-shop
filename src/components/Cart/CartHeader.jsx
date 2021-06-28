import cart from "../../images/cart.png";

import styles from "../../styles/Home.module.css";

function CartHeader(props) {
  return (
    <div className={styles.cartHeader}>
      <img alt="cart" aria-label="cart" src={cart} height="20" width="20" />
      &nbsp;
      <div className={styles.cartHeaderText}>
        Корзина
        <div className={styles.cartHeaderPrice}>
          {/* {totalPrice && totalPrice !== 0 ? (
            <span>($ {totalPrice})</span>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default CartHeader;
