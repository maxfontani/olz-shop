import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setFilters, resetFilters } from "../../../store/filters/filtersSlice";
import Space from "../../Layout/Space/Space.jsx";
import MultiSelect from "../../UI/MultiSelect.jsx";
import stringifyParamsArr from "../../../utils/helpers";

import styles from "./StoreSidebar.module.css";

const defaultValues = {
  origins: [],
  minPrice: "",
  maxPrice: "",
};

const multiSelectOptions = [
  { value: "africa", label: "Африка" },
  { value: "asia", label: "Азия" },
  { value: "europe", label: "Европа" },
  { value: "usa", label: "США" },
];

function StoreSidebar() {
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  const onChangeMultiSelect = useCallback((selection) => {
    const originsArr = selection.map((item) => item.value);
    const originsStr = stringifyParamsArr(originsArr);
    dispatch(setFilters({ page: 1, origins: originsStr }));
  }, []);

  // const onChangeMultiSelect = (selection) => {
  //   const originsArr = selection.map((item) => item.value);
  //   const originsStr = stringifyParamsArr(originsArr);
  //   dispatch(setFilters({ page: 1, origins: originsStr }));
  // };

  const onSubmit = (data) => {
    dispatch(
      setFilters({ page: 1, minPrice: data.minPrice, maxPrice: data.maxPrice }),
    );
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <Space size="xs" />
        <b>Фильтры:</b>
        <Space size="s" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Цена:</label>
          <div className={styles.sidebarPrice}>
            <input
              defaultValue=""
              type="number"
              min="0"
              max={getValues(["maxPrice"][0]) || Number.MAX_SAFE_INTEGER}
              {...register("minPrice", {
                min: 0,
                max: {
                  value: getValues(["maxPrice"][0]) || Number.MAX_SAFE_INTEGER,
                  message: "Укажите цены от нижней до верхней.",
                },
              })}
              onBlur={() => handleSubmit(onSubmit)()}
            />
            &nbsp;-&nbsp;
            <input
              defaultValue=""
              type="number"
              min={getValues(["minPrice"][0]) || 0}
              {...register("maxPrice", {
                min: {
                  value: getValues(["minPrice"][0]) || 0,
                  message: "Укажите цены от нижней до верхней.",
                },
              })}
              onBlur={() => handleSubmit(onSubmit)()}
            />
          </div>
          {errors.minPrice && (
            <span className={styles.errMsg}>{errors.minPrice.message}</span>
          )}
          {errors.maxPrice && !errors.minPrice && (
            <span className={styles.errMsg}>{errors.maxPrice.message}</span>
          )}
          <Space size="s" />
          <div className={styles.multiSelect}>
            <label>Континент:</label>
            <MultiSelect
              options={multiSelectOptions}
              control={control}
              onChange={onChangeMultiSelect}
            />
          </div>
          <Space size="xs" />
          <button
            className={styles.clearBtn}
            type="button"
            onClick={() => {
              dispatch(resetFilters());
              reset(defaultValues);
            }}
          >
            Сбросить все
          </button>
        </form>
      </div>
    </div>
  );
}

export default StoreSidebar;
