import { NavLink } from "react-router-dom";

import styles from "../../styles/Home.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <NavLink className={styles.navlink} to="/">
        <p className={styles.logo}>OLZ SHOP</p>
      </NavLink>
      <span className={styles.subtitle}>Buy, Sell, Trade</span>
    </div>
  );
}

export default Header;
