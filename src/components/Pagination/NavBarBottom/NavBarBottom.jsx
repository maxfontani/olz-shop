import { range } from "../../../utils/helpers";

import styles from "./NavBarBottom.module.css";

const PAGES_PER_NAV_BLOCK = process.env.REACT_APP_PAGES_PER_NAV_BLOCK;

function NavBarBottom({
  curPage,
  lastPage,
  navBlock,
  setPage,
  prevPage,
  nextPage,
}) {
  const navBlockFirstPage = PAGES_PER_NAV_BLOCK * (navBlock - 1) + 1;
  const navBlockLastPage = PAGES_PER_NAV_BLOCK * navBlock;

  return (
    <div className={styles.navBarBottom}>
      <button
        className={`${styles.navBtn} ${styles.navBtnBack}`}
        onClick={prevPage}
        disabled={curPage === 1}
      ></button>
      {range(navBlockFirstPage, navBlockLastPage, 1).map(
        (page, index) =>
          page <= lastPage && (
            <button
              className={styles.navBarBottomPageBtn}
              key={index}
              active={(page === curPage).toString()}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          ),
      )}
      <button
        className={`${styles.navBtn} ${styles.navBtnFwd}`}
        onClick={nextPage}
        disabled={curPage === lastPage}
      ></button>
    </div>
  );
}

export default NavBarBottom;
