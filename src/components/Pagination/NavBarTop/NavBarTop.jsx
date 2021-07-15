import NavBarPerPage from "../NavBarPerPage/NavBarPerPage.jsx";
import NavBarGoToPage from "../NavBarGoToPage/NavBarGoToPage.jsx";

import styles from "./NavBarTop.module.css";

function NavBarTop({ curPage, perPage, lastPage, setPage, setPerPage }) {
  return (
    <div className={styles.navBarTop}>
      <NavBarGoToPage
        style={styles.navBarTopLeft}
        curPage={curPage}
        lastPage={lastPage}
        setPage={setPage}
      />
      <NavBarPerPage
        style={styles.navBarTopRight}
        perPage={perPage}
        setPerPage={setPerPage}
      />
    </div>
  );
}

export default NavBarTop;
