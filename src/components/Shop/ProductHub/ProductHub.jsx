import React from "react";
import ProductCard from "../ProductCard/ProductCard.jsx";

import styles from "./ProductHub.module.css";

function ProductHub({ products }) {
  return (
    <div className={styles.productHubOuter}>
      <div className={styles.productHub}>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default ProductHub;
