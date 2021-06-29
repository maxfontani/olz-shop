import CartProductCard from './CartProductCard.jsx';

import styles from '../../../styles/Home.module.css';

function CartProductHub({ cart }) {
  return (
    <div className={styles.cartProductHub}>
      {Object.values(cart).map((entry) => (
        <CartProductCard
          key={entry.product.id}
          product={entry.product}
          count={entry.count}
        />
      ))}
    </div>
  );
}

export default CartProductHub;
