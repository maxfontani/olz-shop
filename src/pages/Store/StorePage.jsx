import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "./hooks/useQuery";
import {
  fetchProductsPage,
  selectAllProducts,
} from "../../store/productsSlice";
import { Header, Menu, Content, Footer } from "../../components/exports";
import { StoreSidebar, ProductHub, NavBarTop, NavBarBottom } from "../exports";

import styles from "../../styles/Home.module.css";

function StorePage() {
  const query = useQuery();
  const editable = query.get("editable");

  const initialFilters = {
    page: 1,
    perPage: 50,
    origins: "",
    minPrice: "",
    maxPrice: "",
    editable,
  };
  const [filters, setFilters] = useState(initialFilters);
  const [navBlock, setNavBlock] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    if (filters.editable !== editable)
      setFilters((state) => {
        return { ...state, editable };
      });
  }, [editable]);

  useEffect(() => {
    console.log(filters);
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
