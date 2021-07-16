import { Dialog } from "@reach/dialog";
import closeImg from "../../images/close.png";

import "@reach/dialog/styles.css";
import styles from "./DialogWrapper.module.css";

export default function DialogWrapper({
  children,
  showDialog,
  setShowDialog,
  noCloseButton,
}) {
  const close = () => setShowDialog(false);

  return (
    <Dialog
      className={styles.dialogOuter}
      aria-label="Modal dialog"
      isOpen={showDialog}
      onDismiss={close}
    >
      {!noCloseButton && (
        <img
          className={styles.closeButton}
          src={closeImg}
          width="32"
          height="32"
          alt="закрыть"
          onClick={close}
        />
      )}
      <div className={styles.dialogInner}>
        <div className={styles.dialogChildren}>{children}</div>
      </div>
    </Dialog>
  );
}
