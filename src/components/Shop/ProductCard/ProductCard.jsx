import { memo } from "react";
import { NavLink } from "react-router-dom";
import { format, parseJSON } from "date-fns";
import { useDispatch } from "react-redux";
import { addById } from "../../../store/cart/cartSlice";
import cartButton from "../../../images/cart_button_green.png";

import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const { id, name, price, origin, updatedAt } = product;
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addById({ ...product }));
  };

  return (
    <NavLink className={styles.navlink} to={`/products/${id}`}>
      <div className={styles.productCard}>
        <div className={styles.productCardTitle}>
          <p>
            <b>{name}</b>
          </p>
        </div>
        <hr></hr>
        <p>{`${price} $`}</p>
        <p>Origin: {origin}</p>
        <p>{format(parseJSON(updatedAt), "PP")}</p>

        <img
          alt="add to cart"
          title="Add the product to cart."
          aria-label="add to cart"
          src={cartButton}
          width="35"
          height="30"
          onClick={(e) => {
            e.preventDefault();
            addToCart();
          }}
        />
      </div>
    </NavLink>
  );
}

export default memo(ProductCard);
