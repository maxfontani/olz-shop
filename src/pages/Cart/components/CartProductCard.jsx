import { format, parseJSON } from 'date-fns';
import { NavLink } from 'react-router-dom';
import useStoreDispatch from '../../../context/hooks/useStoreDispatch';
import cartButtonImg from '../../../images/cart_button_red.png';
import styles from '../../../styles/Home.module.css';

function CartProductCard({
  count,
  product: { id, name, price, origin, updatedAt },
}) {
  const { dispatch } = useStoreDispatch();
  const removeFromCart = () => {
    dispatch({
      type: 'removedFromCart',
      payload: id,
    });
  };

  return (
    <div className={styles.cartProductCard}>
      <hr></hr>
      <div className={styles.cartProductCardTitle}>
        <p>
          <NavLink className={styles.navlink} to={`/products/${id}`}>
            <b>
              {name}
              {count > 1 && <span>&times; {`${count} шт.`}</span>}
            </b>
          </NavLink>
        </p>
      </div>
      <p>{`${price} $`}</p>
      <p>Origin: {origin}</p>
      <p>Last update: {format(parseJSON(updatedAt), 'PP')}</p>

      <img
        alt=""
        title="remove from cart"
        aria-label="Remove one product from cart"
        src={cartButtonImg}
        width="35"
        height="30"
        onClick={(e) => {
          e.preventDefault();
          removeFromCart();
        }}
      />
    </div>
  );
}

export default CartProductCard;
