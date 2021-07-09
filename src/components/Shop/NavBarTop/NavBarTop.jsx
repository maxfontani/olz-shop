import { useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import {
  setFilters,
  setFiltersPage,
} from "../../../store/filters/filtersSlice";

import styles from "./NavBarTop.module.css";

function NavBarTop({ filters, total }) {
  const dispatch = useDispatch();
  const LAST_PAGE = Math.ceil(total / filters.perPage) || 1;

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { page: 1 },
  });

  useLayoutEffect(() => {
    setValue("page", filters.page);
  }, [filters.page]);

  const goToPage = (data) => {
    if (data && data.page <= LAST_PAGE) {
      dispatch(setFiltersPage(data.page));
    }
  };
  const setPerPage = (e) => {
    dispatch(setFilters({ page: 1, perPage: Number(e.target.value) }));
  };
  return (
    <div className={styles.navBarTop}>
      <form onSubmit={handleSubmit(goToPage)}>
        <div className={styles.navBarTopLeft}>
          <label>
            Страница <strong>{filters.page}</strong> из {LAST_PAGE} | Перейти на{" "}
          </label>
          <input
            type="number"
            min="1"
            max={LAST_PAGE}
            {...register("page", {
              min: {
                value: 1,
                message: "Эта страница вне диапазона.",
              },
              max: {
                value: LAST_PAGE,
                message: "Эта страница вне диапазона.",
              },
            })}
          />{" "}
          <button type="submit" onClick={() => goToPage()}>
            Go
          </button>
          {errors.page && <span>{errors.page.message}</span>}
        </div>
      </form>
      <div className={styles.navBarTopRight}>
        Товаров на странице:{" "}
        <select value={filters.perPage} onChange={(e) => setPerPage(e)}>
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default NavBarTop;
