import { format, parseJSON } from "date-fns";

import styles from "./ProductViewCard.module.css";

function ProductViewCard({ product: { name, price, origin, updatedAt } }) {
  return (
    <div className={styles.ProductViewCard}>
      <p>
        <b>{name}</b>
      </p>
      <hr></hr>
      <p>{`${price} $`}</p>
      <p>Origin: {origin}</p>
      <p>{format(parseJSON(updatedAt), "PP")}</p>
    </div>
  );
}

export default ProductViewCard;
