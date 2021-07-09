import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchShopPage } from "../../store/shop/thunks";
import { selectAllProducts, selectShopTotal } from "../../store/shop/selectors";
import { selectFilters } from "../../store/filters/selectors";
import { Header, Menu, Content, Footer } from "../../components/Layout";
import {
  StoreSidebar,
  ProductHub,
  NavBarTop,
  NavBarBottom,
} from "../../components/Shop/index";

import styles from "../Pages.module.css";

function ShopPage() {
  const location = useLocation();
  const [navBlock, setNavBlock] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const filters = useSelector(selectFilters);
  const total = useSelector(selectShopTotal);

  useEffect(() => {
    dispatch(fetchShopPage(filters));
  }, [filters]);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu location={location} />
        <Content>
          <div className={styles.split}>
            <StoreSidebar filters={filters} />
            <div className={styles.productHubLayout}>
              <NavBarTop filters={filters} total={total} />
              <ProductHub products={products} />
              {products.length > 0 && (
                <NavBarBottom
                  filters={filters}
                  total={total}
                  navBlock={navBlock}
                  setNavBlock={setNavBlock}
                />
              )}
            </div>
          </div>
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default ShopPage;
