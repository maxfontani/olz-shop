import { Dialog } from "@reach/dialog";

import "@reach/dialog/styles.css";
import styles from "../../styles/Dialog.module.css";

export default function DialogWrapper({ children, showDialog, setShowDialog }) {
  const close = () => setShowDialog(false);

  return (
    <Dialog
      className={styles.dialogOuter}
      aria-label="Modal dialog"
      isOpen={showDialog}
      onDismiss={close}
    >
      <div className={styles.dialogInner}>
        <div className={styles.dialogHeader}>
          <button className={styles.closeButton} onClick={close}>
            <span>×</span>
          </button>
        </div>
        <div className={styles.dialogChildren}>{children}</div>
      </div>
    </Dialog>
  );
}
