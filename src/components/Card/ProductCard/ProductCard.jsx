import { memo } from "react";
import { NavLink } from "react-router-dom";
import { format, parseJSON } from "date-fns";
import { getLabelByOrigin } from "../../../utils/helpers";
import editButtonImg from "../../../images/edit.png";
import cartButtonImg from "../../../images/cart_button_green.png";

import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onAddToCart, onEdit }) => (
  <NavLink className={styles.navlink} to={`/products/${product.id}`}>
    <div className={styles.productCard}>
      <div className={styles.productCardTitle}>
        <p>
          <b>{product.name}</b>
        </p>
      </div>
      <hr></hr>
      <p>{`${product.price} $`}</p>
      <p>{getLabelByOrigin(product.origin)}</p>
      <p>{format(parseJSON(product.updatedAt), "PP")}</p>

      {product.isEditable ? (
        <img
          alt="редактировать"
          title="Редактировать товар."
          aria-label="Редактировать товар."
          src={editButtonImg}
          width="32"
          height="32"
          onClick={(e) => onEdit(e, product)}
        />
      ) : (
        <img
          alt="в корзину"
          title="Добавить в корзину."
          aria-label="Добавить товар в корзину."
          src={cartButtonImg}
          width="35"
          height="30"
          onClick={onAddToCart}
        />
      )}
    </div>
  </NavLink>
);

export default memo(ProductCard);
