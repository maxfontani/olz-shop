import { useState } from "react";
import searchImg from "../../../images/search.png";

import styles from "./SearchField.module.css";

function SearchField({ inputProps, labelText, searchHandler }) {
  const [input, setInput] = useState("");
  return (
    <div className={styles.searchFieldOuter}>
      <label htmlFor="search-field">{labelText}</label>
      <div className={styles.searchField}>
        <input
          {...inputProps}
          className={styles.searchFieldInput}
          name="search-field"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        &nbsp;
        <button
          className={styles.searchFieldButton}
          onClick={() => searchHandler(input)}
        >
          <img alt="Найти" src={searchImg} width="24" height="24" />
        </button>
      </div>
    </div>
  );
}

export default SearchField;
