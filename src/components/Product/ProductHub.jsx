import React from "react";
import ProductCard from "./ProductCard";

import styles from "../../styles/Home.module.css";

function ProductHub({ products }) {
  return (
    <div className={styles.productHubOuter}>
      <div className={styles.productHub}>
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              origin={product.origin}
              createdAt={product.createdAt}
              updatedAt={product.updatedAt}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductHub;
