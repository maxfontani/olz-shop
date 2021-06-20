import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import { CartHeader } from "../exports";

import styles from "../../styles/Home.module.css";

function Menu() {
  const location = useLocation();
  return (
    <div className={styles.menu}>
      <div className={styles.menuContent}>
        <NavLink
          exact
          to="/"
          className={styles.navlink}
          activeClassName={styles.activeNavLink}
        >
          Главная
        </NavLink>
        <NavLink
          exact
          to="/products"
          className={styles.navlink}
          activeClassName={styles.activeNavLink}
        >
          Магазин
        </NavLink>
        {location.pathname !== "/cart" && (
          <NavLink
            to="/cart"
            className={styles.navlink}
            activeClassName={styles.activeNavLink}
          >
            <CartHeader />
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Menu;
