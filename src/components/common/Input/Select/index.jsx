import React from "react";
import { FormHelperText, MenuItem, Select } from "@mui/material";

const SelectComponent = ({
  value,
  onChange,
  options = [],
  optionValueProps = "value",
  helpertext,
  ...props
}) => {
  const handleOnChange = (value) => {
    onChange(value);
  };

  return (
    <>
      <Select
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        defaultValue={""}
        {...props}
      >
        {options.length > 0 ? (
          options.map((item, index) => (
            <MenuItem key={index} value={item[optionValueProps]}>
              {item.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
        )}
      </Select>
      {helpertext && <FormHelperText error>{helpertext}</FormHelperText>}
    </>
  );
};
export default SelectComponent;
