import { useSelector } from "react-redux";
import { selectProductsTotal } from "../../../store/productsSlice";

import styles from "../../../styles/Home.module.css";

function NavBarBottom({ filters, setFilters, navBlock, setNavBlock }) {
  const total = useSelector(selectProductsTotal);
  const PAGES_PER_NAV_BLOCK = process.env.REACT_APP_PAGES_PER_NAV_BLOCK;
  const LAST_PAGE = Math.ceil(total / filters.perPage) ?? 1;

  const prevPage = () => {
    setFilters((state) => {
      return { ...state, page: state.page - 1 };
    });
  };

  const nextPage = () => {
    setFilters((state) => {
      if (state.page === PAGES_PER_NAV_BLOCK * navBlock)
        setNavBlock(navBlock + 1);
      return { ...state, page: state.page + 1 };
    });
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
              onClick={() =>
                setFilters((state) => {
                  return { ...state, page };
                })
              }
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
