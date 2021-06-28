import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseJSON } from "date-fns";
import { selectCountById } from "../../store/cartSlice";
import {
  setCountById,
  decrementById,
  removeById,
  incrementById,
} from "../../store/cartSlice";
import { NavLink } from "react-router-dom";
import cartButton from "../../images/cart_button_red.png";
import add from "../../images/add.png";
import remove from "../../images/remove.png";

import styles from "../../styles/Home.module.css";

function CartProductCard({ id, amount, product }) {
  const dispatch = useDispatch();
  const count = useSelector((state) => selectCountById(state, id));
  const subTotalPrice = product.price * count + ` $`;

  return (
    <div className={styles.cartProductCard}>
      <hr></hr>
      <div className={styles.cartProductCardTitle}>
        <NavLink className={styles.navlink} to={`/products/${id}`}>
          <b>{product.name}</b>
        </NavLink>
      </div>
      <p className={styles.cartProductCardAmount}>
        {count > 1 && (
          <img
            src={remove}
            alt="уменьшить"
            aria-label="уменьшить количество единиц товара"
            width="15"
            height="15"
            onClick={(e) => {
              e.preventDefault();
              dispatch(decrementById(id));
            }}
          />
        )}
        <span>&times; {count ?? amount}</span>
        <img
          src={add}
          alt="добавить"
          aria-label="увеличить количество единиц товара"
          width="15"
          height="15"
          onClick={(e) => {
            e.preventDefault();
            dispatch(incrementById(id));
          }}
        />
      </p>
      <p>{count ? subTotalPrice : product.price}</p>
      <p>Origin: {product.origin}</p>
      <p>Last update: {format(parseJSON(product.updatedAt), "PP")}</p>

      <img
        alt="удалить из корзины"
        aria-label="удалить товар из корзины"
        src={cartButton}
        width="35"
        height="30"
        onClick={(e) => {
          e.preventDefault();
          dispatch(removeById(id));
        }}
      />
    </div>
  );
}

export default CartProductCard;
