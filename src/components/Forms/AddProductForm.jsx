import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BasicProductSchema } from "../../utils/shemas";

import styles from "../../styles/Form.module.css";

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BasicProductSchema),
  });
  const onSubmit = (data) => console.log(data);
  const onCancel = () => console.log("close");

  return (
    <form
      id="add-product-form"
      className={styles.formInputOuter}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formHeaderOuter}>
        <div className={styles.formHeaderInner}>
          <div className={styles.formTitle}>Новый товар</div>
        </div>
      </div>
      <div className={styles.formInput}>
        <label className={styles.formLabel} htmlFor="title">
          Title:
        </label>
        <input placeholder="enter title" {...register("title")} />
      </div>
      <div className={styles.formInput}>
        <label className={styles.formLabel} htmlFor="price">
          Price:
        </label>
        <input {...register("price")} />
      </div>
      <div className={styles.formInput}>
        <label className={styles.formLabel} htmlFor="origin">
          Origin:
        </label>
        <input {...register("origin")} />
      </div>

      <div className={styles.formButtonsOuter}>
        <input className={styles.formButton} type="submit" value="Создать" />
      </div>
    </form>
  );
}
