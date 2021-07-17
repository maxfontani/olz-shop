import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyProductState } from "../../../store/myProduct/selectors";
import { addById } from "../../../store/cart/cartSlice";
import { fetchShopPage } from "../../../store/shop/thunks";
import { editMyProduct } from "../../../store/myProduct/thunks";
import {
  clearMyProduct,
  setMyProduct,
} from "../../../store/myProduct/myProductSlice";
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
  const { status, error, myProduct } = useSelector(selectMyProductState);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (status === "success") {
      dispatch(fetchShopPage({ ...filters, editable: true }));
      dispatch(clearMyProduct());
    }
  }, [status]);

  const addToCart = (event, productObj) => {
    event.preventDefault();
    dispatch(addById({ ...productObj }));
  };
  const onEdit = (event, product) => {
    console.log(
      "🚀 ~ file: ProductHub.jsx ~ line 28 ~ onEdit ~ product",
      product,
    );
    event.preventDefault();
    dispatch(setMyProduct(product));
    setShowDialog(true);
  };

  const submitFormHandler = async (id, data) => {
    const product = {
      name: data.title,
      price: data.price,
      origin: data.origins.value,
    };
    dispatch(editMyProduct({ id, product }));
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
            product={myProduct}
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
