import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputLine from "../UI/InputLine.jsx";
import { BasicProductSchema } from "../../utils/shemas";

import styles from "../../styles/Form.module.css";

export default function EditProductForm({
  product: { id, name, price, origin },
}) {
  const defaultValues = {
    title: name,
    price,
    origin,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(BasicProductSchema),
    mode: "onBlur",
    defaultValues,
  });
  const onSubmit = (data) => console.log(data);
  const onCancel = () => console.log("close");

  return (
    <form
      key={id}
      id="edit-product-form"
      className={styles.formOuter}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formTitle}>Редактировать товар</div>
      <InputLine
        inputProps={{
          ...register("title"),
          invalid: errors.title ? "true" : "false",
        }}
        labelText={"Название:"}
      />
      <InputLine
        inputProps={{
          ...register("price"),
          invalid: errors.title ? "true" : "false",
        }}
        labelText={"Цена:"}
      />
      <InputLine
        inputProps={{
          ...register("origin"),
          invalid: errors.title ? "true" : "false",
        }}
        labelText={"Регион:"}
      />

      <button className={styles.formButton} type="submit">
        Сохранить
      </button>
      <button
        className={styles.formButton}
        onClick={() =>
          reset(defaultValues, {
            keepErrors: false,
            keepDirty: false,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
          })
        }
      >
        Сбросить
      </button>
    </form>
  );
}
