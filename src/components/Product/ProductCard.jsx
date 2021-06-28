import { format, parseJSON } from "date-fns";
import { useDispatch } from "react-redux";
import { addById } from "../../store/cartSlice";
import { NavLink } from "react-router-dom";
import cartButton from "../../images/cart_button_green.png";
import styles from "../../styles/Home.module.css";

function ProductCard(props) {
  const { id, name, price, origin, createdAt, updatedAt } = props;
  const dispatch = useDispatch();
  console.log("CARD");

  return (
    <NavLink className={styles.navlink} to={`/products/${id}`}>
      <div className={styles.productCard}>
        <div className={styles.productCardTitle}>
          <p>
            <b>{name}</b>
          </p>
        </div>
        <hr></hr>
        <p>{price + " $"}</p>
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
            dispatch(
              addById({ id, name, price, origin, createdAt, updatedAt })
            );
          }}
        />
      </div>
    </NavLink>
  );
}

export default ProductCard;
