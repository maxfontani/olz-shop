import { memo } from "react";
import { NavLink } from "react-router-dom";
import { format, parseJSON } from "date-fns";
import cartButton from "../../../images/cart_button_green.png";

import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onClick }) => (
  <NavLink className={styles.navlink} to={`/products/${product.id}`}>
    <div className={styles.productCard}>
      <div className={styles.productCardTitle}>
        <p>
          <b>{product.name}</b>
        </p>
      </div>
      <hr></hr>
      <p>{`${product.price} $`}</p>
      <p>Origin: {product.origin}</p>
      <p>{format(parseJSON(product.updatedAt), "PP")}</p>

      <img
        alt="add to cart"
        title="Add the product to cart."
        aria-label="add to cart"
        src={cartButton}
        width="35"
        height="30"
        onClick={onClick}
      />
    </div>
  </NavLink>
);

export default memo(ProductCard);
