import { memo } from "react";
import MenuItem from "./MenuItem/MenuItem.jsx";
import MenuItemCart from "./MenuItemCart/MenuItemCart.jsx";
import MenuItemQuery from "./MenuItemQuery/MenuItemQuery.jsx";
import MenuItemAddProduct from "./MenuItemAddProduct/MenuItemAddProduct.jsx";

import styles from "./Menu.module.css";

const Menu = ({ location, totalPrice }) => (
  <div className={styles.menu}>
    <div className={styles.menuContent}>
      <MenuItem to="/" title="Главная" />
      <MenuItemQuery to="/products" title="Магазин" query="" />
      <MenuItemAddProduct />
      <MenuItemQuery
        to="/products?editable=true"
        query="?editable=true"
        title="Мои Товары"
      />
      {location.pathname !== "/cart" && (
        <MenuItem to={"/cart"} title={""}>
          <MenuItemCart totalPrice={totalPrice} />
        </MenuItem>
      )}
    </div>
  </div>
);

export default memo(Menu);
