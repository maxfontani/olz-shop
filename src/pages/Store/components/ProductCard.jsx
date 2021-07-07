import { useState } from "react";
import { NavLink } from "react-router-dom";
import { format, parseJSON } from "date-fns";
import { useDispatch } from "react-redux";
import { addById } from "../../../store/cartSlice";
import EditProductForm from "../../../components/Forms/EditProductForm.jsx";
import DialogWrapper from "../../../components/UI/DialogWrapper.jsx";
import cartButtonImg from "../../../images/cart_button_green.png";
import editButtonImg from "../../../images/edit.png";

import styles from "../../../styles/Home.module.css";

function ProductCard({ product }) {
  const { id, name, price, origin, isEditable, updatedAt } = product;
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => setShowDialog(true);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addById({ ...product }));
  };
  const editProduct = () => {
    console.log("edit");
  };

  return (
    <NavLink className={styles.navlink} to={`/products/${id}`}>
      <DialogWrapper showDialog={showDialog} setShowDialog={setShowDialog}>
        <EditProductForm product={product} />
      </DialogWrapper>
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
        {isEditable ? (
          <img
            alt="редактировать"
            title="Редактировать товар."
            aria-label="Редактировать товар."
            src={editButtonImg}
            width="32"
            height="32"
            onClick={(e) => {
              e.preventDefault();
              openDialog();
            }}
          />
        ) : (
          <img
            alt="add to cart"
            title="Add the product to cart."
            aria-label="add to cart"
            src={cartButtonImg}
            width="32"
            height="32"
            onClick={(e) => {
              e.preventDefault();
              addToCart();
            }}
          />
        )}
      </div>
    </NavLink>
  );
}

export default ProductCard;
