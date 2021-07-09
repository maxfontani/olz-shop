import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Header, Menu, Content, Footer } from "../../components/Layout";
import { CartProductHub } from "../../components/Cart/index";
import { selectCartTotalPrice } from "../../store/cart/selectors";

import cartImg from "../../images/cart.png";

import styles from "../Pages.module.css";

function CartPage() {
  const location = useLocation();
  const totalPrice = useSelector(selectCartTotalPrice);
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu location={location} />
        <Content>
          <h2>
            Корзина товаров{" "}
            <img src={cartImg} alt="cart" width="30" height="30" />
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
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
