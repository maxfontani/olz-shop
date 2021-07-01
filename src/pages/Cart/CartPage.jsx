import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Header, Menu, Content, Footer } from "../../components/exports";
import { CartProductHub } from "../exports";
import { selectCartTotalPrice } from "../../store/cartSlice";

import cartImg from "../../images/cart.png";

import styles from "../../styles/Home.module.css";

function CartPage() {
  const totalPrice = useSelector(selectCartTotalPrice);
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
          <CartProductHub />
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
