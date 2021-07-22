import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { InputLine, AsyncSel, Space } from "../../index";
import FormInputLine from "../FormInputLine/FormInputLine.jsx";
import { BasicProductSchema } from "../shemas/BasicProductShema";
import { getLabelByOrigin } from "../../../utils/helpers";

import styles from "../Form.module.css";

const resetOptions = {
  keepErrors: false,
  keepDirty: false,
  keepIsSubmitted: false,
  keepTouched: false,
  keepIsValid: false,
  keepSubmitCount: false,
};

export default function ProductForm({
  product,
  submitFormHandler,
  asyncOptionsLoader,
}) {
  const defaultValues = {
    title: product?.name || "",
    price: product?.price || 0,
    origins: product?.origin
      ? { value: product?.origin, label: getLabelByOrigin(product?.origin) }
      : {},
  };

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

  const onSubmit = (data) => submitFormHandler(data, product?.id);

  return (
    <form
      id="product-form"
      className={styles.formOuter}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formTitle}>Редактировать товар</div>
      <FormInputLine
        tag="title"
        label="Название:"
        register={register("title")}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <FormInputLine
        tag="price"
        label="Цена:"
        register={register("price", { valueAsNumber: true })}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <AsyncSel
        name="origins"
        labelText="Регион:"
        placeholder="Выберите из списка.."
        control={control}
        loadOptions={loadOptionsHandler}
        errors={errors}
      />
      <Space size="s" />
      <button
        className={styles.formButton}
        type="submit"
        disabled={isSubmitting || !isDirty}
      >
        {product?.id ? "Сохранить" : "Добавить"}
      </button>
      <button
        type="button"
        className={styles.formButton}
        disabled={isSubmitting || !isDirty}
        onClick={() => {
          reset(defaultValues, resetOptions);
        }}
      >
        Сбросить
      </button>
    </form>
  );
}
