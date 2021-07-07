import styles from "../../styles/Input.module.css";

export default function InputLine({ inputProps, labelText }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{labelText}</label>
      <input {...inputProps} className={styles.input} type="text" />
      <span className={styles.underline}></span>
    </div>
  );
}
