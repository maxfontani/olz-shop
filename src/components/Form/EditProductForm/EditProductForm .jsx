import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { InputLine, AsyncSel, Space } from "../../index";
import { BasicProductSchema } from "../shemas/BasicProductShema";
import { getLabelByOrigin } from "../../../utils/helpers";

import styles from "../Form.module.css";

export default function EditProductForm({
  product: { id, name, price, origin },
  submitFormHandler,
  asyncOptionsLoader,
}) {
  const defaultValues = {
    title: name,
    price,
    origins: { value: origin, label: getLabelByOrigin(origin) },
  };
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    setError,
    reset,
  } = useForm({
    resolver: nopeResolver(BasicProductSchema),
    mode: "onBlur",
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
    submitFormHandler(id, data);
  };

  return (
    <form
      id="add-product-form"
      className={styles.formOuter}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formTitle}>Редактировать товар</div>
      <InputLine
        inputProps={{
          ...register("title"),
          invalid: errors.title ? "true" : "false",
          disabled: isSubmitting,
        }}
        labelText="Название:"
      />
      {errors.title && (
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
        style={styles.formSelect}
        name="origins"
        labelText="Регион:"
        placeholder="Выберите из списка.."
        control={control}
        loadOptions={loadOptionsHandler}
      />
      {errors?.origins && (
        <div className={styles.formError}>{errors.origins.message}</div>
      )}
      <Space size="l" />
      <button
        className={styles.formButton}
        type="submit"
        disabled={isSubmitting || !isDirty}
      >
        Сохранить
      </button>
      <button
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
