import { format, parseJSON } from "date-fns";
import { useStoreDispatch } from "../../store/context";
import { NavLink } from "react-router-dom";
import cartButton from "../../images/cart_button_red.png";
import styles from "../../styles/Home.module.css";

function CartProductCard({ id, name, price, origin, count, updatedAt }) {
  const { dispatch } = useStoreDispatch();

  return (
    <div className={styles.cartProductCard}>
      <hr></hr>
      <div className={styles.cartProductCardTitle}>
        <p>
          <NavLink className={styles.navlink} to={`/products/${id}`}>
            <b>
              {name}
              {count > 1 ? <span> &times; {count} шт.</span> : null}
            </b>
          </NavLink>
        </p>
      </div>
      <p>{price + " $"}</p>
      <p>Origin: {origin}</p>
      <p>Last update: {format(parseJSON(updatedAt), "PP")}</p>

      <img
        alt=""
        title="remove from cart"
        aria-label="Remove one product from cart"
        src={cartButton}
        width="35"
        height="30"
        onClick={(e) => {
          e.preventDefault();
          dispatch({
            type: "removedFromCart",
            payload: id,
          });
        }}
      />
    </div>
  );
}

export default CartProductCard;
