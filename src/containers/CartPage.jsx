import { NavLink } from "react-router-dom";
import {
  Header,
  Menu,
  Content,
  Footer,
  CartProductHub,
} from "../components/exports";
import { useSelectorCartTotalPrice, useSelectorCart } from "../store/selectors";
import cartImg from "../images/cart.png";

import styles from "../styles/Home.module.css";

function CartPage() {
  const cart = useSelectorCart();
  const totalPrice = useSelectorCartTotalPrice();
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu />
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
          <CartProductHub cart={cart} />
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
