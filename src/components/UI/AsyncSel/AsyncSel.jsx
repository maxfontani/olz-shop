import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

import styles from "./AsyncSel.module.css";

const AsyncSel = ({
  name,
  isMulti,
  labelText,
  placeholder,
  control,
  loadOptions,
  errors,
}) => (
  <div className={styles.asyncSelectOuter}>
    <label htmlFor={name}>{labelText}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AsyncSelect
          {...field}
          className={styles.asyncSelect}
          placeholder={placeholder}
          noOptionsMessage={() =>
            "Список пуст. Проверьте Интернет соединение.."
          }
          isMulti={isMulti}
          defaultOptions
          loadOptions={loadOptions}
        />
      )}
    />
    {errors?.origins && (
      <div className={styles.asyncSelectError}>
        {errors.origins.value?.message}
      </div>
    )}
  </div>
);

export default AsyncSel;
