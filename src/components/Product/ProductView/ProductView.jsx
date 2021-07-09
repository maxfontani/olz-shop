import { format, parseJSON } from "date-fns";

import styles from "./ProductView.module.css";

function ProductCard(props) {
  const { name, price, origin, updatedAt } = props.product;
  return (
    <div className={styles.productView}>
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

export default ProductCard;
