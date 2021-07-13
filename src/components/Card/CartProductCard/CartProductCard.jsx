import { memo } from "react";
import { NavLink } from "react-router-dom";
import { format, parseJSON } from "date-fns";
import cartButton from "../../../images/cart_button_red.png";
import add from "../../../images/add.png";
import remove from "../../../images/remove.png";

import styles from "./CartProductCard.module.css";

const CartProductCard = ({
  product: { id, name, price, origin, updatedAt },
  amount,
  onIncr,
  onDecr,
  onRemove,
}) => (
  <div className={styles.cartProductCard}>
    <hr></hr>
    <div className={styles.cartProductCardTitle}>
      <NavLink className={styles.navlink} to={`/products/${id}`}>
        <b>{name}</b>
      </NavLink>
    </div>
    <p className={styles.cartProductCardAmount}>
      {amount > 1 && (
        <img
          src={remove}
          alt="уменьшить"
          aria-label="уменьшить количество единиц товара"
          width="15"
          height="15"
          onClick={() => onDecr(id)}
        />
      )}
      <span>&times; {amount}</span>
      <img
        src={add}
        alt="добавить"
        aria-label="увеличить количество единиц товара"
        width="15"
        height="15"
        onClick={() => onIncr(id)}
      />
    </p>
    <p>{price * amount} $</p>
    <p>Origin: {origin}</p>
    <p>Last update: {format(parseJSON(updatedAt), "PP")}</p>

    <img
      alt="удалить из корзины"
      aria-label="удалить товар из корзины"
      src={cartButton}
      width="35"
      height="30"
      onClick={() => onRemove(id)}
    />
  </div>
);

export default memo(CartProductCard);
