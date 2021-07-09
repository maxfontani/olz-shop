import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  Header,
  Menu,
  Content,
  Footer,
  Error404,
} from "../../components/Layout";
import { fetchProduct } from "../../store/product/thunks";
import { clearProduct } from "../../store/product/productSlice";
import { selectProductState } from "../../store/product/selectors";
import ProductView from "../../components/Product/index";

import styles from "../Pages.module.css";

function ProductPage() {
  const { productId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { product, error } = useSelector(selectProductState);

  useEffect(() => {
    dispatch(fetchProduct(productId));
    return () => {
      dispatch(clearProduct());
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu location={location} />
        <Content>
          {error && <Error404 />}
          {!!product.id && <ProductView product={product} />}
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default ProductPage;
