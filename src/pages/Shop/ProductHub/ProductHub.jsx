import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyProductState } from "../../../store/myProduct/selectors";
import { addById } from "../../../store/cart/cartSlice";
import { fetchShopPage } from "../../../store/shop/thunks";
import { editMyProduct } from "../../../store/myProduct/thunks";
import { clearMyProduct } from "../../../store/myProduct/myProductSlice";
import { asyncOptionsLoader } from "../../../services/api/calls";
import AsyncFormWrapper from "../../../components/Form/AsyncFormWrapper/AsyncFormWrapper.jsx";
import {
  ProductCard,
  DialogWrapper,
  EditProductForm,
} from "../../../components/index";

import styles from "./ProductHub.module.css";

function ProductHub({ products, filters }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectMyProductState);
  const [showDialog, setShowDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(undefined);

  const addToCart = (event, productObj) => {
    event.preventDefault();
    dispatch(addById({ ...productObj }));
  };
  const onEdit = (event, product) => {
    event.preventDefault();
    dispatch(clearMyProduct());
    setEditProduct(product);
    setShowDialog(true);
  };

  const submitFormHandler = async (id, data) => {
    const product = {
      name: data.title,
      price: data.price,
      origin: data.origins.value,
    };
    console.log("GO", id, product);
    dispatch(editMyProduct({ id, product }));
    dispatch(fetchShopPage({ ...filters, editable: true }));
  };

  return (
    <div className={styles.productHubOuter}>
      <DialogWrapper showDialog={showDialog} setShowDialog={setShowDialog}>
        <AsyncFormWrapper
          status={status}
          success="Товар успешно отредактирован!"
          error={error}
        >
          <EditProductForm
            product={editProduct}
            submitFormHandler={submitFormHandler}
            asyncOptionsLoader={asyncOptionsLoader}
          />
        </AsyncFormWrapper>
      </DialogWrapper>
      <div className={styles.productHub}>
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(event) => addToCart(event, product)}
              onEdit={onEdit}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductHub;
