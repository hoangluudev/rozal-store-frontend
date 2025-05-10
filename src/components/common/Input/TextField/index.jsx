import { TextField } from "@mui/material";
import React from "react";

const TextFieldComponent = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  label = "",
  ...props
}) => {
  const handleOnChange = (e) => {
    let value = e.target.value;
    if (type === "number") {
      value = e.target.value === "" ? "" : Number(value);
    }
    onChange(value);
  };

  return (
    <TextField
      value={value}
      onChange={handleOnChange}
      label={label}
      type={type}
      style={{ minWidth: "7rem" }}
      placeholder={placeholder}
      {...props}
    />
  );
};
export default TextFieldComponent;
