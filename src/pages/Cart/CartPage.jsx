import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import CartProductHub from "./CartProductHub/CartProductHub.jsx";
// import { placeOrder } from "../../store/orders/thunks";
import { sagaOrdersActions } from "../../store/orders/sagas";
import { selectMyOrderStatus } from "../../store/orders/selectors";
import { AsyncFormWrapper, DialogWrapper } from "../../components/index";
import {
  selectCartTotalPrice,
  selectCartArr,
  selectCartOrder,
} from "../../store/cart/selectors";
import cartImg from "../../images/cart.png";

import styles from "./CartPage.module.css";

function CartPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { placeOrder } = sagaOrdersActions;
  const totalPrice = useSelector(selectCartTotalPrice);
  const cartArr = useSelector(selectCartArr);
  const cartOrder = useSelector(selectCartOrder);
  const [status, error] = useSelector(selectMyOrderStatus);
  const [showDialog, setShowDialog] = useState(false);

  const hasProducts = totalPrice > 0;

  const processOrder = (orderObj) => {
    // Changed logic according to HM#4
    // dispatch(placeOrder({ orderObj, dispatch }));
    dispatch(placeOrder(orderObj));
    setShowDialog(true);
  };

  const dialogDismissHandler = () => {
    setShowDialog(false);
    if (status === "success") history.push("/orders");
  };

  return (
    <>
      <DialogWrapper
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        dismissHandler={dialogDismissHandler}
      >
        <AsyncFormWrapper
          status={status}
          success={`Заказ оформлен успешно.
          Спасибо, что выбрали Yalantis!`}
          error={`Ошибка оформления заказа..
          ${error}.`}
        ></AsyncFormWrapper>
      </DialogWrapper>
      <h2>
        Корзина товаров{" "}
        {!hasProducts && (
          <img src={cartImg} alt="cart" width="32" height="32" />
        )}
      </h2>
      {hasProducts ? (
        <div>
          <button
            className={styles.orderBtn}
            // Changed logic according to HM#4
            // onClick={() => processOrder(cartOrder, dispatch)}
            onClick={() => processOrder(cartOrder)}
          >
            Оформить заказ
          </button>
          <p>
            <b>Всего: $ {totalPrice}</b>
          </p>
          <CartProductHub cartArr={cartArr} />
        </div>
      ) : (
        <p>
          Добавьте интересующие Вас товары в нашем&nbsp;
          <NavLink to="/products">Магазине</NavLink>
        </p>
      )}
    </>
  );
}

export default CartPage;
