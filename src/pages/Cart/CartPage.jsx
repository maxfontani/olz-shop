import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Layout from "../../layout/Layout.jsx";
import CartProductHub from "./CartProductHub/CartProductHub.jsx";
import { selectCartTotalPrice } from "../../store/cart/selectors";

import cartImg from "../../images/cart.png";

function CartPage() {
  const totalPrice = useSelector(selectCartTotalPrice);
  return (
    <>
      <h2>
        Корзина товаров <img src={cartImg} alt="cart" width="30" height="30" />
      </h2>
      {totalPrice > 0 ? (
        <p>
          <b>Всего: $ {totalPrice}</b>
        </p>
      ) : (
        <p>
          Добавьте интересующие Вас товары в нашем&nbsp;
          <NavLink to="/products">Магазине</NavLink>
        </p>
      )}
      <CartProductHub />
    </>
  );
}

export default CartPage;
