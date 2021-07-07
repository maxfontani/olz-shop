import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CartHeader } from "../../pages/exports";
import DialogWrapper from "../UI/DialogWrapper.jsx";
import AddProductForm from "../Forms/AddProductForm.jsx";
import add from "../../images/add.png";

import styles from "../../styles/Home.module.css";

function Menu() {
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => setShowDialog(true);
  return (
    <div className={styles.menu}>
      <DialogWrapper showDialog={showDialog} setShowDialog={setShowDialog}>
        <AddProductForm />
      </DialogWrapper>
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
        <div className={styles.navlink} onClick={openDialog}>
          <div className={styles.menuHeader}>
            <img alt="add" aria-label="add" src={add} height="16" width="16" />
            &nbsp;Товар
          </div>
        </div>
        <NavLink
          exact
          to="/products?editable=true"
          className={styles.navlink}
          activeClassName={styles.activeNavLink}
        >
          Мои Товары
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
