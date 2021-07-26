import { useState, useLayoutEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { fetchShopPage } from "../../store/shop/thunks";
import {
  selectAllProducts,
  selectShopTotal,
  selectShopStatus,
} from "../../store/shop/selectors";
import { selectFilters } from "../../store/filters/selectors";
import {
  setFilters,
  setFiltersPage,
  resetFilters,
} from "../../store/filters/filtersSlice";
import {
  stringifyParamsArr,
  calcLastPage,
  debounce,
} from "../../utils/helpers";
import { Pagination, MessageError } from "../../components/index";
import ProductHub from "./ProductHub/ProductHub.jsx";
import ShopSidebar from "./ShopSidebar/ShopSidebar.jsx";

import styles from "./ShopPage.module.css";

function ShopPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const filters = useSelector(selectFilters);
  const total = useSelector(selectShopTotal);
  const lastPage = calcLastPage(total, filters.perPage);
  const [shopStatus, shopError] = useSelector(selectShopStatus);
  const [firstLoad, setFirstLoad] = useState(true);
  const query = useQuery();

  const getUrlParams = () => {
    const params = {};
    Object.keys(filters).forEach((key) => {
      let qValue = query.get(key);
      if (qValue) {
        if (key === "page" || key === "perPage") qValue = Number(qValue);
        if (qValue !== filters[key]) params[key] = qValue;
      }
    });
    return params;
  };

  const setUrlParams = () => {
    const params = new URLSearchParams({
      page: filters.page,
      perPage: filters.perPage,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      editable: filters.editable,
      origins: filters.origins,
    });
    history.replace({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  useLayoutEffect(() => {
    if (firstLoad) {
      const qFilters = getUrlParams();
      if (Object.keys(qFilters).length) {
        dispatch(setFilters({ ...filters, ...qFilters }));
      } else {
        dispatch(fetchShopPage(filters));
      }
      setFirstLoad(false);
    } else {
      setUrlParams();
      dispatch(fetchShopPage(filters));
    }
  }, [filters]);

  const setPageHandler = (navPage) => {
    query.set("page", "navPage");
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

  const sidebarSelectChangeHandler = (selection) => {
    const originsArr = selection.map((item) => item.value);
    const originsStr = stringifyParamsArr(originsArr);
    dispatch(setFilters({ page: 1, origins: originsStr }));
  };

  const sidebarSelectChangeHandlerDebounced = debounce(
    sidebarSelectChangeHandler,
    1000,
  );

  const sidebarSubmitHandler = (data) => {
    dispatch(
      setFilters({ page: 1, minPrice: data.minPrice, maxPrice: data.maxPrice }),
    );
  };

  const sidebarSubmitHandlerDebounced = debounce(sidebarSubmitHandler, 1000);

  const onResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, []);

  return (
    <div className={styles.split}>
      <ShopSidebar
        filters={filters}
        onChangeMultiSelect={(selection) =>
          sidebarSelectChangeHandlerDebounced(selection)
        }
        onSubmit={sidebarSubmitHandlerDebounced}
        onReset={onResetFilters}
      />
      {shopStatus === "error" && (
        <MessageError message={`Ошибка соединения. ${shopError}`} />
      )}
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
          <ProductHub products={products} filters={filters} />
        </Pagination>
      )}
    </div>
  );
}

export default ShopPage;
