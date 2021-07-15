import { useState, useEffect } from "react";
import NavBarBottom from "./NavBarBottom/NavBarBottom.jsx";
import NavBarTop from "./NavBarTop/NavBarTop.jsx";

import styles from "./Pagination.module.css";

const PAGES_PER_NAV_BLOCK = process.env.REACT_APP_PAGES_PER_NAV_BLOCK;

export default function Pagination({
  showNavBars,
  children,
  filters,
  lastPage,
  setPageHandler,
  setPerPageHandler,
  prevPageHandler,
  nextPageHandler,
}) {
  const [navBlock, setNavBlock] = useState(1);
  const showNavBarTop = showNavBars === "both" || showNavBars === "top";
  const showNavBarBottom = showNavBars === "both" || showNavBars === "bot";

  useEffect(() => {
    const newNavBlock = Math.ceil(filters.page / PAGES_PER_NAV_BLOCK);
    if (newNavBlock !== navBlock) setNavBlock(newNavBlock);
  }, [filters]);

  const setPage = (navPage) => {
    setPageHandler(navPage);
  };

  const setPerPage = (event) => {
    setPerPageHandler(event);
  };

  const prevPage = () => {
    prevPageHandler();
  };

  const nextPage = () => {
    nextPageHandler();
  };

  return (
    <div className={styles.paginationLayout}>
      {showNavBarTop && (
        <NavBarTop
          curPage={filters.page}
          perPage={filters.perPage}
          lastPage={lastPage}
          setPage={setPage}
          setPerPage={setPerPage}
        />
      )}
      {children}
      {showNavBarBottom && (
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
  );
}
