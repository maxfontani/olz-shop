import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useQuery from "../../../hooks/useQuery";
import { Space, MultiSelect } from "../../../components/index";
import { originsToSelectOptions } from "../../../utils/helpers";

import styles from "./ShopSidebar.module.css";

const multiSelectOptions = [
  { value: "africa", label: "Африка" },
  { value: "asia", label: "Азия" },
  { value: "europe", label: "Европа" },
  { value: "usa", label: "США" },
];

const initialValues = {
  origins: [],
  minPrice: "",
  maxPrice: "",
};

function ShopSidebar({ onChangeMultiSelect, onSubmit, onReset }) {
  const query = useQuery();
  const qEditable = query.get("editable");
  let qOrigins = query.get("origins")?.split(",");
  if (qOrigins && qOrigins[0]) {
    qOrigins = originsToSelectOptions(qOrigins);
  }

  const defaultValues = {
    origins: qOrigins || [],
    minPrice: query.get("minPrice") || "",
    maxPrice: query.get("maxPrice") || "",
  };

  const {
    register,
    getValues,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (qEditable === null) reset(initialValues);
  }, [qEditable]);

  const renderPriceErrors = () => {
    if (errors.minPrice)
      return <span className={styles.errMsg}>{errors.minPrice.message}</span>;
    if (errors.maxPrice)
      return <span className={styles.errMsg}>{errors.maxPrice.message}</span>;
    return null;
  };

  const resetAll = () => {
    onReset();
    reset(initialValues);
  };

  const runSubmit = () => handleSubmit(onSubmit)();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <Space size="xs" />
        <b>Фильтры:</b>
        <Space size="s" />
        <form>
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
              onBlur={runSubmit}
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
              onBlur={runSubmit}
            />
          </div>
          {renderPriceErrors()}
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
          <button className={styles.clearBtn} type="button" onClick={resetAll}>
            Сбросить все
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShopSidebar;
