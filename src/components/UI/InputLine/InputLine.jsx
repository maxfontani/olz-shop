import styles from "./InputLine.module.css";

const InputLine = ({ inputProps, labelText, autoComplete }) => (
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

export default InputLine;
