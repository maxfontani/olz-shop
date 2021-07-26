import errorImg from "../../images/action_error.png";

import styles from "./MessageError.module.css";

const MessageError = ({ message }) => (
  <div className={styles.messageError}>
    <img src={errorImg} alt="Error" width="32" height="32" />
    <p>{message ?? "Что-то пошло не так.."}</p>
  </div>
);

export default MessageError;
