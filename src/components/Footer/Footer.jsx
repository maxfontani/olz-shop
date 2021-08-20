import { memo } from "react";

import styles from "./Footer.module.css";

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.footerContent}>
      <div>All rights reserved © 2021.</div>
      <div>
        <a
          href="https://maxfontani.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          by l33t Inc.
        </a>
      </div>
    </div>
  </div>
);

export default memo(Footer);
