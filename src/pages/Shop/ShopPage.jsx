import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopPage } from "../../store/shop/thunks";
import { selectAllProducts, selectShopTotal } from "../../store/shop/selectors";
import { selectFilters } from "../../store/filters/selectors";
import {
  setFilters,
  setFiltersPage,
  resetFilters,
} from "../../store/filters/filtersSlice";
import stringifyParamsArr from "../../utils/helpers";
import { NavBarTop, NavBarBottom } from "../../components/index";
import ProductHub from "./ProductHub/ProductHub.jsx";
import ShopSidebar from "./ShopSidebar/ShopSidebar.jsx";

import styles from "./ShopPage.module.css";

const PAGES_PER_NAV_BLOCK = process.env.REACT_APP_PAGES_PER_NAV_BLOCK;

function ShopPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const filters = useSelector(selectFilters);
  const total = useSelector(selectShopTotal);
  const lastPage = Math.ceil(total / filters.perPage) || 1;

  const [navBlock, setNavBlock] = useState(1);

  const setPage = useCallback((navPage) => {
    const newNavBlock = Math.ceil(navPage / PAGES_PER_NAV_BLOCK);
    if (newNavBlock !== navBlock) setNavBlock(newNavBlock);
    dispatch(setFiltersPage(navPage));
  }, []);

  const setPerPage = useCallback((event) => {
    dispatch(setFilters({ page: 1, perPage: Number(event.target.value) }));
  }, []);

  const prevPage = () => {
    if (
      navBlock > 1 &&
      filters.page === PAGES_PER_NAV_BLOCK * (navBlock - 1) + 1
    ) {
      setNavBlock(navBlock - 1);
    }
    dispatch(setFiltersPage(filters.page - 1));
  };

  const nextPage = () => {
    if (filters.page === PAGES_PER_NAV_BLOCK * navBlock) {
      setNavBlock(navBlock + 1);
      dispatch(setFiltersPage(filters.page + 1));
    }
    dispatch(setFiltersPage(filters.page + 1));
  };

  const onChangeMultiSelect = useCallback((selection) => {
    const originsArr = selection.map((item) => item.value);
    const originsStr = stringifyParamsArr(originsArr);
    dispatch(setFilters({ page: 1, origins: originsStr }));
  }, []);

  const onResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, []);

  const onSubmitMultiSelect = useCallback((data) => {
    dispatch(
      setFilters({ page: 1, minPrice: data.minPrice, maxPrice: data.maxPrice }),
    );
  }, []);

  useEffect(() => {
    dispatch(fetchShopPage(filters));
  }, [filters]);

  return (
    <div className={styles.split}>
      <ShopSidebar
        filters={filters}
        onChangeMultiSelect={(selection) => onChangeMultiSelect(selection)}
        onSubmit={onSubmitMultiSelect}
        onReset={onResetFilters}
      />
      <div className={styles.productHubLayout}>
        <NavBarTop
          curPage={filters.page}
          perPage={filters.perPage}
          lastPage={lastPage}
          setPage={setPage}
          setPerPage={setPerPage}
        />
        <ProductHub products={products} />
        {products.length > 0 && (
          <NavBarBottom
            curPage={filters.page}
            lastPage={lastPage}
            navBlock={navBlock}
            setPage={setPage}
            prevPage={() => prevPage()}
            nextPage={() => nextPage()}
          />
        )}
      </div>
    </div>
  );
}

export default ShopPage;
