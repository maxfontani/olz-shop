import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ProductView,
  Header,
  Menu,
  Content,
  Footer,
  Error404,
} from "../components/exports";
import { yalantisApi } from "../api/yalantisAPI";

import styles from "../styles/Home.module.css";

function ProductPage() {
  const { productId } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    yalantisApi.get(`/products/${productId}`).then(
      (result) => {
        setIsLoaded(true);
        setProduct(result.data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu />
        <Content>
          {error && <Error404 />}
          {!isLoaded && <div>Loading...</div>}
          {product && <ProductView product={product} />}
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default ProductPage;
