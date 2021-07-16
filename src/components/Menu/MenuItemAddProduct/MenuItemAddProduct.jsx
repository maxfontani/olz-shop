import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postMyProduct } from "../../../store/myProduct/thunks";
import { clearMyProduct } from "../../../store/myProduct/myProductSlice";
import { selectMyProductState } from "../../../store/myProduct/selectors";
import { asyncOptionsLoader } from "../../../services/api/calls";
import { DialogWrapper, AsyncFormWrapper, AddProductForm } from "../../index";
import add from "../../../images/add.png";

import styles from "../Menu.module.css";

function MenuItemAddProduct() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectMyProductState);
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    dispatch(clearMyProduct());
    setShowDialog(true);
  };

  const submitFormHandler = async (data) => {
    const product = {
      name: data.title,
      price: data.price,
      origin: data.origins.value,
    };
    dispatch(postMyProduct(product));
  };

  return (
    <div className={styles.navlink} onClick={openDialog}>
      <DialogWrapper showDialog={showDialog} setShowDialog={setShowDialog}>
        <AsyncFormWrapper
          status={status}
          success="Товар добавлен успешно!"
          error={error}
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
