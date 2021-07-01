import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsPage,
  selectAllProducts,
} from "../../store/productsSlice";
import { Header, Menu, Content, Footer } from "../../components/exports";
import { StoreSidebar, ProductHub, NavBarTop, NavBarBottom } from "../exports";

import styles from "../../styles/Home.module.css";

function StorePage() {
  const initialFilters = {
    page: 1,
    perPage: 50,
    origins: "",
    minPrice: "",
    maxPrice: "",
  };
  const [filters, setFilters] = useState(initialFilters);
  const [navBlock, setNavBlock] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProductsPage(filters));
  }, [filters]);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu />
        <Content>
          <div className={styles.split}>
            <StoreSidebar
              filters={filters}
              setFilters={setFilters}
              initialFilters={initialFilters}
            />
            <div className={styles.productHubLayout}>
              <NavBarTop filters={filters} setFilters={setFilters} />
              <ProductHub products={products} />
              {products.length > 0 && (
                <NavBarBottom
                  filters={filters}
                  setFilters={setFilters}
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

export default StorePage;
