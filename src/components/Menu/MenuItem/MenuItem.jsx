import { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";

import styles from "../Menu.module.css";

function MenuItem({ to, title, children, clickHandler }) {
  return (
    <NavLink
      to={to}
      className={styles.navlink}
      activeClassName={styles.activeNavLink}
      exact
      onClick={clickHandler}
    >
      {title}
      {children}
    </NavLink>
  );
}

export default memo(MenuItem);
