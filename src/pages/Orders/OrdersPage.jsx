import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OrdersHub from "./OrdersHub/OrdersHub.jsx";
import {
  selectOrdersHistoryArr,
  selectOrdersHistoryStatus,
} from "../../store/orders/selectors";
import { fetchOrdersHistory, fetchOrderById } from "../../store/orders/thunks";
import { Loader, MessageError, SearchField } from "../../components/index";
import folderImg from "../../images/folder.png";

import styles from "./OrdersPage.module.css";

function OrdersPage() {
  const dispatch = useDispatch();
  const ordersArr = useSelector(selectOrdersHistoryArr);
  const [status, error] = useSelector(selectOrdersHistoryStatus);
  const [byId, setById] = useState(false);
  const noOrders = status === "success" && ordersArr.length === 0;

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, []);

  const findOrder = (id) => {
    if (id) dispatch(fetchOrderById(id));
    setById(true);
  };

  if (status === "error")
    return (
      <MessageError
        message={`Ошибка соединения.
      ${error}`}
      />
    );

  return (
    <>
      <h2>
        История заказов{" "}
        <img src={folderImg} alt="orders" width="32" height="32" />
      </h2>
      {status === "loading" && <Loader />}
      {noOrders ? (
        <p>
          Разместите свой первый заказ, выбрав интересующие Вас товары в
          нашем&nbsp;
          <NavLink to="/products">Магазине</NavLink>
        </p>
      ) : (
        <div>
          <SearchField
            inputProps={{ placeholder: "Введите ID" }}
            labelText="Искать заказ по ID"
            searchHandler={findOrder}
          />
          {byId && (
            <button
              className={styles.showAllOrdersButton}
              onClick={() => {
                setById(false);
                dispatch(fetchOrdersHistory());
              }}
            >
              Показать всю историю
            </button>
          )}
          <hr />
          <OrdersHub ordersArr={ordersArr} />
        </div>
      )}
    </>
  );
}

export default OrdersPage;
