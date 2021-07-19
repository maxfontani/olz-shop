import { memo } from "react";
import { useDispatch } from "react-redux";
import { setFiltersEditable } from "../../store/filters/filtersSlice";
import MenuItem from "./MenuItem/MenuItem.jsx";
import MenuItemQuery from "./MenuItemQuery/MenuItemQuery.jsx";
import MenuItemCart from "./MenuItemCart/MenuItemCart.jsx";
import MenuItemAddProduct from "./MenuItemAddProduct/MenuItemAddProduct.jsx";

import styles from "./Menu.module.css";

function Menu({ location, totalPrice }) {
  const dispatch = useDispatch();
  const filterEditable = (bool) => {
    dispatch(setFiltersEditable(bool));
  };
  return (
    <div className={styles.menu}>
      <div className={styles.menuContent}>
        <MenuItem to="/" title="Главная" />
        <MenuItemQuery
          to="/products"
          title="Магазин"
          query=""
          clickHandler={() => filterEditable(false)}
        />
        <MenuItemAddProduct />
        <MenuItemQuery
          to="/products?editable=true"
          title="Мои Товары"
          query="?editable=true"
          clickHandler={() => filterEditable(true)}
        />
        {location.pathname !== "/cart" && (
          <MenuItem to={"/cart"} title={""}>
            <MenuItemCart totalPrice={totalPrice} />
          </MenuItem>
        )}
        <MenuItem to="/orders" title="Мои Заказы" />
      </div>
    </div>
  );
}
export default memo(Menu);
