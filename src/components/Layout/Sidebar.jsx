import React from 'react';
import styles from '../../styles/Home.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <ul>
          <li>Tech</li>
          <li>Merch</li>
          <li>Alcohol</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
