import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Header,
  Menu,
  Content,
  Footer,
  Error404,
} from "../../components/exports";
import { ProductView } from "../exports";
import { yalantisApi } from "../../services/api/axios";

import styles from "../../styles/Home.module.css";

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
      (err) => {
        setIsLoaded(true);
        setError(err);
      },
    );
    return () => setProduct(undefined);
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
