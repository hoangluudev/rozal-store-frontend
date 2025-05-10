import { TextField } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";

const NumbericTextFieldComponent = ({
  value = "",
  onChange = null,
  isCurrency = false,
  style,
  ...props
}) => {
  const handleOnChange = (values) => {
    const numericValue = values.floatValue || 0;
    onChange(numericValue);
  };

  return (
    <NumericFormat
      value={value}
      onValueChange={handleOnChange}
      thousandSeparator
      valueIsNumericString={false}
      suffix={isCurrency ? " đ" : ""}
      customInput={TextField}
      placeholder="0"
      style={{ minWidth: "7rem", ...style }}
      {...props}
    />
  );
};
export default NumbericTextFieldComponent;
