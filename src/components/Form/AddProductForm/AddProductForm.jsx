import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { InputLine, AsyncSel, Space } from "../../index";
import { BasicProductSchema } from "../shemas/BasicProductShema";

import styles from "../Form.module.css";

const defaultValues = {
  title: "",
  price: 0,
  origins: [],
};

export default function AddProductForm({
  submitFormHandler,
  asyncOptionsLoader,
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
    reset,
  } = useForm({
    resolver: nopeResolver(BasicProductSchema),
    mode: "onTouched",
    defaultValues,
  });

  const loadOptionsHandler = () =>
    asyncOptionsLoader().catch((err) =>
      setError("origins", {
        type: err.type,
        message: "Не удалось загрузить список..",
      }),
    );

  const onSubmit = (data) => {
    submitFormHandler(data);
  };

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
        labelText="Название:"
      />
      {errors?.title && (
        <div className={styles.formError}>{errors.title.message}</div>
      )}
      <InputLine
        inputProps={{
          ...register("price", { valueAsNumber: true }),
          invalid: errors.price ? "true" : "false",
          disabled: isSubmitting,
        }}
        labelText="Цена:"
      />
      {errors?.price && (
        <div className={styles.formError}>{errors.price.message}</div>
      )}
      <AsyncSel
        name="origins"
        labelText="Регион:"
        placeholder="Выберите из списка.."
        control={control}
        loadOptions={loadOptionsHandler}
      />
      {errors?.origins && (
        <div className={styles.formError}>{errors.origins.value?.message}</div>
      )}

      <Space size="s" />
      <button
        className={styles.formButton}
        type="submit"
        disabled={isSubmitting}
      >
        Добавить
      </button>
      <button
        type="reset"
        className={styles.formButton}
        disabled={isSubmitting || !isDirty}
        onClick={() => {
          reset(defaultValues, {
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
