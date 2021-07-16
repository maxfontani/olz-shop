import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { fetchShopPage } from "../../store/shop/thunks";
import { selectAllProducts, selectShopTotal } from "../../store/shop/selectors";
import { selectFilters } from "../../store/filters/selectors";
import {
  setFilters,
  setFiltersPage,
  resetFilters,
} from "../../store/filters/filtersSlice";
import { stringifyParamsArr, calcLastPage } from "../../utils/helpers";
import Pagination from "../../components/Pagination/Pagination.jsx";
import ProductHub from "./ProductHub/ProductHub.jsx";
import ShopSidebar from "./ShopSidebar/ShopSidebar.jsx";

import styles from "./ShopPage.module.css";

function ShopPage() {
  const query = useQuery();
  const editable = query.get("editable") === "true";
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const filters = useSelector(selectFilters);
  const total = useSelector(selectShopTotal);
  const lastPage = calcLastPage(total, filters.perPage);

  useEffect(() => {
    dispatch(fetchShopPage({ ...filters, editable }));
  }, [filters, editable]);

  const setPageHandler = (navPage) => {
    dispatch(setFiltersPage(navPage));
  };

  const setPerPageHandler = (event) => {
    dispatch(setFilters({ page: 1, perPage: Number(event.target.value) }));
  };

  const prevPageHandler = () => {
    dispatch(setFiltersPage(filters.page - 1));
  };

  const nextPageHandler = () => {
    dispatch(setFiltersPage(filters.page + 1));
  };

  const sidebarMultiSelectChangeHandler = (selection) => {
    const originsArr = selection.map((item) => item.value);
    const originsStr = stringifyParamsArr(originsArr);
    dispatch(setFilters({ page: 1, origins: originsStr }));
  };

  const sidebarMultiSelectSubmitHandler = (data) => {
    dispatch(
      setFilters({ page: 1, minPrice: data.minPrice, maxPrice: data.maxPrice }),
    );
  };

  const onResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, []);

  return (
    <div className={styles.split}>
      <ShopSidebar
        filters={filters}
        onChangeMultiSelect={(selection) =>
          sidebarMultiSelectChangeHandler(selection)
        }
        onSubmit={sidebarMultiSelectSubmitHandler}
        onReset={onResetFilters}
      />
      {products.length > 0 && (
        <Pagination
          showNavBars={"both"}
          filters={filters}
          setPageHandler={setPageHandler}
          setPerPageHandler={setPerPageHandler}
          prevPageHandler={prevPageHandler}
          nextPageHandler={nextPageHandler}
          lastPage={lastPage}
        >
          <ProductHub products={products} filters={filters} />{" "}
        </Pagination>
      )}
    </div>
  );
}

export default ShopPage;
