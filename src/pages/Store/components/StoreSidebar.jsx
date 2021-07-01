import React from "react";
import { useForm } from "react-hook-form";
import Space from "../../../components/Layout/Space.jsx";
import { MultiSelect } from "../../../components/exports";

import styles from "../../../styles/Home.module.css";

function StoreSidebar({ setFilters, initialFilters }) {
  const defaultValues = {
    origins: [],
    minPrice: "",
    maxPrice: "",
  };
  const {
    register,
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });
  const watchPrice = watch(["minPrice", "maxPrice"]);
  const onSubmit = (data) => {
    setFilters((state) => {
      return {
        ...state,
        page: 1,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
      };
    });
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
              max={watchPrice[1] || Number.MAX_SAFE_INTEGER}
              {...register("minPrice", {
                min: 0,
                max: {
                  value: watchPrice[1] || Number.MAX_SAFE_INTEGER,
                  message: "Укажите цены от нижней до верхней.",
                },
              })}
              onBlur={() => handleSubmit(onSubmit)()}
            />
            &nbsp;-&nbsp;
            <input
              defaultValue=""
              type="number"
              min={watchPrice[0] || 0}
              {...register("maxPrice", {
                min: {
                  value: watchPrice[0] || 0,
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
            <MultiSelect control={control} setFilters={setFilters} />
          </div>
          <Space size="xs" />
          <button
            className={styles.clearBtn}
            type="button"
            onClick={() => {
              setFilters(initialFilters);
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
