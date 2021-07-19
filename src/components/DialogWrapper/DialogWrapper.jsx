import { Dialog } from "@reach/dialog";
import closeImg from "../../images/close.png";

import "@reach/dialog/styles.css";
import styles from "./DialogWrapper.module.css";

export default function DialogWrapper({
  children,
  showDialog,
  dismissHandler,
  noCloseButton,
}) {
  return (
    <Dialog
      className={styles.dialogOuter}
      aria-label="Modal dialog"
      isOpen={showDialog}
      onDismiss={dismissHandler}
    >
      {!noCloseButton && (
        <img
          className={styles.closeButton}
          src={closeImg}
          width="32"
          height="32"
          alt="закрыть"
          onClick={dismissHandler}
        />
      )}
      <div className={styles.dialogInner}>
        <div className={styles.dialogChildren}>{children}</div>
      </div>
    </Dialog>
  );
}
