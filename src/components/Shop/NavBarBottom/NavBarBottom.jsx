import { useDispatch } from "react-redux";
import { setFiltersPage } from "../../../store/filters/filtersSlice";

import styles from "./NavBarBottom.module.css";

function NavBarBottom({ filters, total, navBlock, setNavBlock }) {
  const dispatch = useDispatch();
  const PAGES_PER_NAV_BLOCK = process.env.REACT_APP_PAGES_PER_NAV_BLOCK;
  const LAST_PAGE = Math.ceil(total / filters.perPage) ?? 1;

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

  return (
    <div className={styles.navBarBottom}>
      <button
        className={`${styles.navBtn} ${styles.navBtnBack}`}
        onClick={() => prevPage()}
        disabled={filters.page === 1}
      ></button>

      {Array.from(
        { length: PAGES_PER_NAV_BLOCK },
        (_, i) => PAGES_PER_NAV_BLOCK * (navBlock - 1) + i + 1,
      ).map(
        (page, index) =>
          page <= LAST_PAGE && (
            <button
              className={styles.navBarBottomPageBtn}
              key={index}
              active={(page === filters.page).toString()}
              onClick={() => dispatch(setFiltersPage(page))}
            >
              {page}
            </button>
          ),
      )}

      <button
        className={`${styles.navBtn} ${styles.navBtnFwd}`}
        onClick={() => nextPage()}
        disabled={filters.page === LAST_PAGE}
      ></button>
    </div>
  );
}

export default NavBarBottom;
