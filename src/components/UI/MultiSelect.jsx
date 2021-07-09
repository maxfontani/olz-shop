import { Controller } from "react-hook-form";
import Select from "react-select";

const MultiSelect = ({ control, options, onChange }) => (
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
          onChange(selection);
        }}
      />
    )}
  />
);

export default MultiSelect;
