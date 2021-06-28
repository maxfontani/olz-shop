import React from "react";
import Space from "./Space";
import MultiSelect from "../UI/MultiSelect";
import styles from "../../styles/Home.module.css";

function Sidebar({ filters, setFilters, initialFilters }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <p>
          <b>Фильтры:</b>
        </p>
        <div className={styles.multiSelect}>
          <label>Континент:</label>
          <MultiSelect />
        </div>
        <Space size="s" />
        <label>Цена</label>
        <div>
          <input
            className={styles.minPrice}
            type="number"
            min="0"
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          {" - "}
          <input
            className={styles.minPrice}
            type="number"
            min="0"
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
        </div>
        <Space size="s" />
        <button
          className={styles.clearButton}
          type="reset"
          onClick={() => setFilters(initialFilters)}
        >
          Сбросить все
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
