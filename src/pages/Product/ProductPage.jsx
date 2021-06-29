import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Menu, Content, Footer } from '../../components/exports';
import ProductView from './components/ProductView.jsx';
import useStoreDispatch from '../../context/hooks/useStoreDispatch';
import { useSelectorActiveProduct } from '../../context/hooks/selectors';

import styles from '../../styles/Home.module.css';

function ProductPage() {
  const { productId } = useParams();
  const { dispatch, dispatchAsync } = useStoreDispatch();
  const activeProduct = useSelectorActiveProduct();

  useEffect(() => {
    dispatchAsync({ type: 'getProductById', payload: productId });
    return () => dispatch({ type: 'clearedActiveProduct' });
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
