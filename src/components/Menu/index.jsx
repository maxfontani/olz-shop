import { memo } from "react";
import MenuItem from "./MenuItem/MenuItem.jsx";
import MenuItemCart from "./MenuItemCart/MenuItemCart.jsx";

import styles from "./Menu.module.css";

const Menu = ({ location, totalPrice }) => (
  <div className={styles.menu}>
    <div className={styles.menuContent}>
      <MenuItem to={"/"} title={"Главная"} />
      <MenuItem to={"/products"} title={"Магазин"} />
      {location.pathname !== "/cart" && (
        <MenuItem to={"/cart"} title={""}>
          <MenuItemCart totalPrice={totalPrice} />
        </MenuItem>
      )}
    </div>
  </div>
);

export default memo(Menu);
