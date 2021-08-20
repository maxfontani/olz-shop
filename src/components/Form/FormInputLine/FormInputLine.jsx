import { InputLine } from "../..";
import styles from "../Form.module.css";

const FormInputLine = ({ tag, label, register, errors, isSubmitting }) => (
  <>
    <InputLine
      inputProps={{
        ...register,
        invalid: errors[tag] ? "true" : "false",
        disabled: isSubmitting,
      }}
      labelText={label}
    />
    {errors[tag] && (
      <div className={styles.formError}>{errors[tag].message}</div>
    )}
  </>
);

export default FormInputLine;
