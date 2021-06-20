import { useParams } from "react-router-dom";
import {
  ProductView,
  Header,
  Menu,
  Content,
  Footer,
} from "../components/exports";
import { useStoreDispatch } from "../store/context.js";
import { useSelectorActiveProduct } from "../store/selectors.js";

import styles from "../styles/Home.module.css";
import { useState } from "react";

function ProductPage() {
  const { productId } = useParams();
  const { dispatchAsync } = useStoreDispatch();
  const activeProduct = useSelectorActiveProduct();

  useState(() => {
    dispatchAsync({ type: "getProductById", payload: productId });
  }, [productId]);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu />
        <Content>
          {activeProduct && <ProductView product={activeProduct} />}
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default ProductPage;
