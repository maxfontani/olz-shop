import { memo } from "react";
import { NavLink } from "react-router-dom";

import styles from "./MenuItem.module.css";

const MenuItem = ({ to, title, children }) => (
  <NavLink
    exact
    to={to}
    className={styles.navlink}
    activeClassName={styles.activeNavLink}
  >
    {title}
    {children}
  </NavLink>
);

export default memo(MenuItem);
