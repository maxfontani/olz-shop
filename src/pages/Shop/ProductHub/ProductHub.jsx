import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addById } from "../../../store/cart/cartSlice";
import { ProductCard } from "../../../components/index";

import styles from "./ProductHub.module.css";

function ProductHub({ products }) {
  const dispatch = useDispatch();
  const addToCart = useCallback((event, productObj) => {
    event.preventDefault();
    dispatch(addById({ ...productObj }));
  }, []);

  return (
    <div className={styles.productHubOuter}>
      <div className={styles.productHub}>
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={(event) => addToCart(event, product)}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductHub;
