import React from "react";
import Select from "react-select";

const options = [
  { value: "africa", label: "Африка" },
  { value: "asia", label: "Азия" },
  { value: "europe", label: "Европа" },
  { value: "usa", label: "США" },
];

const MultiSelect = () => (
  <Select isMulti options={options} className="multiSelect" />
);

export default MultiSelect;
