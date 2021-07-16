import styles from "./InputLine.module.css";

export default function InputLine({ inputProps, labelText, autoComplete }) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{labelText}</label>
      <input
        {...inputProps}
        className={styles.input}
        type="text"
        autoComplete={autoComplete || "off"}
      />
      <span className={styles.underline}></span>
    </div>
  );
}
