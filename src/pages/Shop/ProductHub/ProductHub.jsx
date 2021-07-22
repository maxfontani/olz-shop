import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyProductState } from "../../../store/products/selectors";
import { addById } from "../../../store/cart/cartSlice";
import { editMyProduct } from "../../../store/products/thunks";
import {
  setMyProduct,
  clearMyProduct,
} from "../../../store/products/productsSlice";
import { asyncOptionsLoader } from "../../../services/api/calls";
import AsyncFormWrapper from "../../../components/Form/AsyncFormWrapper/AsyncFormWrapper.jsx";
import {
  ProductCard,
  DialogWrapper,
  ProductForm,
} from "../../../components/index";

import styles from "./ProductHub.module.css";

function ProductHub({ products }) {
  const dispatch = useDispatch();
  const { status, error, myProduct } = useSelector(selectMyProductState);
  const [showDialog, setShowDialog] = useState(false);

  const addToCart = (event, productObj) => {
    event.preventDefault();
    dispatch(addById({ ...productObj }));
  };
  const onOpenEdit = (event, product) => {
    event.preventDefault();
    dispatch(setMyProduct(product));
    setShowDialog(true);
  };

  const submitEditFormHandler = async (data, id) => {
    const product = {
      name: data.title,
      price: data.price,
      origin: data.origins.value,
    };
    dispatch(editMyProduct({ id, product, dispatch }));
  };

  const dialogDismissHandler = () => {
    dispatch(clearMyProduct());
    setShowDialog(false);
  };

  return (
    <div className={styles.productHubOuter}>
      <DialogWrapper
        showDialog={showDialog}
        dismissHandler={dialogDismissHandler}
      >
        <AsyncFormWrapper
          status={status}
          success="Товар успешно отредактирован!"
          error={`Ошибка!
          ${error}
          Возможные причины:
          - такой товар уже существует
          - нет Интернет соединения
          `}
        >
          <ProductForm
            product={myProduct}
            submitFormHandler={submitEditFormHandler}
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
              onOpenEdit={onOpenEdit}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductHub;
