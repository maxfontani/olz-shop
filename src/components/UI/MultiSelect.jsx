import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import stringifyParamsArr from "../../utils/helpers";

const options = [
  { value: "africa", label: "Африка" },
  { value: "asia", label: "Азия" },
  { value: "europe", label: "Европа" },
  { value: "usa", label: "США" },
];

export default function MultiSelect({ control, setFilters }) {
  return (
    <Controller
      name="origins"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          className="multiSelect"
          isMulti
          options={options}
          closeMenuOnSelect={false}
          onChange={(selection) => {
            field.onChange(selection);
            const originsArr = selection.map((item) => item.value);
            const originsStr = stringifyParamsArr(originsArr);
            setFilters((state) => {
              return { ...state, page: 1, origins: originsStr };
            });
          }}
        />
      )}
    />
  );
}
