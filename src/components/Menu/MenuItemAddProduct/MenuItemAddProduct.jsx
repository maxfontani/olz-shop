import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMyProduct } from "../../../store/products/thunks";
import { clearMyProduct } from "../../../store/products/productsSlice";
import { selectMyProductStatus } from "../../../store/products/selectors";
import { asyncOptionsLoader } from "../../../services/api/calls";
import { DialogWrapper, AsyncFormWrapper, AddProductForm } from "../../index";
import add from "../../../images/add.png";

import styles from "../Menu.module.css";

function MenuItemAddProduct() {
  const dispatch = useDispatch();
  const [status, error] = useSelector(selectMyProductStatus);
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);

  const submitFormHandler = async (data) => {
    const product = {
      name: data.title,
      price: data.price,
      origin: data.origins.value,
    };
    dispatch(postMyProduct({ product, dispatch }));
  };

  const dialogDismissHandler = () => {
    dispatch(clearMyProduct());
    setShowDialog(false);
  };

  return (
    <div className={styles.navlink} onClick={openDialog}>
      <DialogWrapper
        showDialog={showDialog}
        dismissHandler={dialogDismissHandler}
      >
        <AsyncFormWrapper
          status={status}
          success="Товар добавлен успешно!"
          error={`Ошибка!
          ${error}
          Возможные причины:
          - товар уже существует
          - нет Интернет соединения`}
        >
          <AddProductForm
            submitFormHandler={submitFormHandler}
            asyncOptionsLoader={asyncOptionsLoader}
          />
        </AsyncFormWrapper>
      </DialogWrapper>
      <div className={styles.menuHeader}>
        <img alt="add" aria-label="add" src={add} height="16" width="16" />
        &nbsp;Товар
      </div>
    </div>
  );
}
export default MenuItemAddProduct;
