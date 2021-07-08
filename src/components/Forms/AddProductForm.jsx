import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputLine from "../UI/InputLine.jsx";
import Space from "../Layout/Space.jsx";
import { BasicProductSchema } from "../../utils/shemas";

import styles from "../../styles/Form.module.css";

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(BasicProductSchema),
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    await setTimeout(() => {
      alert(data);
    }, 2000);
  };
  const onCancel = () => console.log("close");
  console.log(errors);

  return (
    <form
      id="add-product-form"
      className={styles.formOuter}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formTitle}>Новый товар</div>
      <InputLine
        inputProps={{
          ...register("title"),
          invalid: errors.title ? "true" : "false",
          disabled: isSubmitting,
        }}
        labelText={"Название:"}
      />
      {errors.title && (
        <div className={styles.formError}>{errors.title.message}</div>
      )}
      <InputLine
        inputProps={{
          ...register("price"),
          invalid: errors.price ? "true" : "false",
        }}
        labelText={"Цена:"}
      />
      {errors.price && (
        <div className={styles.formError}>{errors.price.message}</div>
      )}
      <InputLine
        inputProps={{
          ...register("origin"),
          invalid: errors.origin ? "true" : "false",
        }}
        labelText={"Регион:"}
      />
      {errors.origin && (
        <div className={styles.formError}>{errors.origin.message}</div>
      )}
      <Space size="s" />
      <button className={styles.formButton} type="submit">
        Добавить
      </button>
      <button
        type="reset"
        className={styles.formButton}
        onClick={() => {
          reset({
            keepErrors: false,
            keepDirty: false,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
          });
        }}
      >
        Сбросить
      </button>
    </form>
  );
}
