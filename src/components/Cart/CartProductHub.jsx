import { CartProductCard } from "../exports";
import styles from "../../styles/Home.module.css";

function CartProductHub({ cart }) {
  return (
    <div className={styles.cartProductHub}>
      {Object.values(cart).map((entry) => (
        <CartProductCard
          key={entry.product.id}
          id={entry.product.id}
          name={entry.product.name}
          price={entry.product.price}
          origin={entry.product.origin}
          createdAt={entry.product.createdAt}
          updatedAt={entry.product.updatedAt}
          count={entry.count}
        />
      ))}
    </div>
  );
}

export default CartProductHub;
