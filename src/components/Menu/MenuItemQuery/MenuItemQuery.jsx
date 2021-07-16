import { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";

import styles from "../Menu.module.css";

function MenuItemQuery({ to, title, query, children }) {
  const isActiveHandler = useCallback(
    (match, location) => {
      if (match && match.isExact && location.search === query) {
        return true;
      }
      return false;
    },
    [query],
  );
  return (
    <NavLink
      to={to}
      className={styles.navlink}
      activeClassName={styles.activeNavLink}
      isActive={isActiveHandler}
    >
      {title}
      {children}
    </NavLink>
  );
}

export default memo(MenuItemQuery);
