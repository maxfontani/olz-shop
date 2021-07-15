import { memo } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => (
  <div className={styles.header}>
    <NavLink className={styles.navlink} to="/">
      <p className={styles.logo}>OLZ SHOP</p>
    </NavLink>
    <span className={styles.subtitle}>Buy, Sell, Trade</span>
  </div>
);

export default memo(Header);
