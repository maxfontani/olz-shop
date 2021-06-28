import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsPage } from "../store/productsSlice";
import { selectAllProducts } from "../store/productsSlice";
import {
  ProductHub,
  Header,
  Menu,
  Content,
  Sidebar,
  Footer,
} from "../components/exports";

import styles from "../styles/Home.module.css";
import { useState } from "react";

function StorePage() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const initialFilters = {
    page: 1,
    perPage: 50,
    origins: "",
    minPrice: "",
    maxPrice: "",
  };
  const [filters, setFilters] = useState(initialFilters);

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
            <Sidebar
              filters={filters}
              setFilters={setFilters}
              initialFilters={initialFilters}
            />
            <ProductHub products={products ?? []} />
          </div>
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default StorePage;
