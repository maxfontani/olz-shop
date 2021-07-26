import doneImg from "../../images/action_success.png";

import styles from "./MessageSuccess.module.css";

const MessageSuccess = ({ message }) => (
  <div className={styles.messageSuccess}>
    <img src={doneImg} alt="Success" width="32" height="32" />
    <p>{message || "Успех!"}</p>
  </div>
);

export default MessageSuccess;
