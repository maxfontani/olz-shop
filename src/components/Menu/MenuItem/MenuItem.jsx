import { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";

import styles from "../Menu.module.css";

function MenuItem({ to, title, children }) {
  return (
    <NavLink
      to={to}
      className={styles.navlink}
      activeClassName={styles.activeNavLink}
      exact
    >
      {title}
      {children}
    </NavLink>
  );
}

export default memo(MenuItem);
