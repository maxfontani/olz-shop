import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Space, MultiSelect } from "../../../components/index";

import styles from "./ShopSidebar.module.css";

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

function ShopSidebar({ onChangeMultiSelect, onSubmit, onReset }) {
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
  const onHandleSubmit = useCallback(() => handleSubmit(onSubmit)(), []);

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
              onBlur={onHandleSubmit}
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
              onBlur={onHandleSubmit}
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
              onReset();
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

export default ShopSidebar;
