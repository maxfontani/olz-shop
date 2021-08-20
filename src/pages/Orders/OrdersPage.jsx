import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OrdersHub from "./OrdersHub/OrdersHub.jsx";
import {
  selectOrdersHistoryArr,
  selectOrdersHistoryStatus,
} from "../../store/orders/selectors";
import { fetchOrdersHistory } from "../../store/orders/thunks";
import { Loader, MessageError, SearchField } from "../../components/index";
import { sagaOrdersActions } from "../../store/orders/sagas";
import folderImg from "../../images/folder.png";

import styles from "./OrdersPage.module.css";

function OrdersPage() {
  const dispatch = useDispatch();
  const ordersArr = useSelector(selectOrdersHistoryArr);
  const { fetchOrderById } = sagaOrdersActions;
  const [status, error] = useSelector(selectOrdersHistoryStatus);
  const [byId, setById] = useState(false);
  const noOrders = status === "success" && ordersArr.length === 0;

  const showAllHistory = () => {
    setById(false);
    dispatch(fetchOrdersHistory());
  };

  useEffect(() => {
    dispatch(fetchOrdersHistory());
  }, []);

  const findOrder = (id) => {
    // Changed logic according to HM#4
    // if (id) dispatch(fetchOrderById(id));
    if (id) dispatch(fetchOrderById(id));
    setById(true);
  };

  if (status === "error")
    return <MessageError message={`Ошибка соединения. ${error}`} />;

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
              onClick={showAllHistory}
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
