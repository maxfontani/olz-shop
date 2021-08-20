import { format, parseJSON } from "date-fns";
import { getLabelByOrigin } from "../../../utils/helpers";

import styles from "./ProductViewCard.module.css";

const ProductViewCard = ({
  product: { name, price, origin, updatedAt },
  count,
}) => (
  <div className={styles.ProductViewCard}>
    <p>
      <b>{name}</b>
    </p>
    {count && <span>&times; {count}</span>}
    <p>{`${price} $ за ед.`}</p>
    <p>Регион: {getLabelByOrigin(origin)}</p>
    <p>{format(parseJSON(updatedAt), "PP")}</p>
  </div>
);

export default ProductViewCard;
