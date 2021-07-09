import { memo } from "react";
import { NavLink } from "react-router-dom";
import MenuCartItem from "./MenuCartItem.jsx";

import styles from "./Menu.module.css";

const Menu = ({ location }) => (
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
          <MenuCartItem />
        </NavLink>
      )}
    </div>
  </div>
);

export default memo(Menu);
