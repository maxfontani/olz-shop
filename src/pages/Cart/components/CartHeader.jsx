import cartImg from '../../../images/cart.png';
import { useSelectorCartTotalPrice } from '../../../context/hooks/selectors';

import styles from '../../../styles/Home.module.css';

function CartHeader() {
  const totalPrice = useSelectorCartTotalPrice();

  return (
    <div className={styles.cartHeader}>
      <img alt="cart" aria-label="cart" src={cartImg} height="20" width="20" />
      &nbsp;
      <div className={styles.cartHeaderText}>
        Корзина
        <div className={styles.cartHeaderPrice}>
          {totalPrice ? <span>({`$ ${totalPrice}`})</span> : null}
        </div>
      </div>
    </div>
  );
}

export default CartHeader;
