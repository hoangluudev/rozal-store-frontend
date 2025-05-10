import React, { useState } from "react";
import { TextField, ButtonGroup, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import useToast from "../../../hooks/useNotifications";

const QuantityAdjustToggle = ({
  value = 1,
  onChange = null,
  pending = false,
  maxStock = 1,
}) => {
  const { sendMsgInfo } = useToast();
  const [inputValue, setInputValue] = useState(value);

  const handleChangeQty = () => {
    let newQuantity = inputValue;
    if (inputValue > maxStock) {
      newQuantity = maxStock;
      sendMsgInfo(
        "You have reached the maximum quantity available for this item"
      );
    } else if (inputValue <= 0) {
      newQuantity = 1;
    }
    onChange(Number(newQuantity));
    setInputValue(Number(newQuantity));
  };
  const handleButtonChangeQty = (qty) => {
    let newQuantity = qty;
    if (qty > maxStock) {
      newQuantity = maxStock;
    } else if (qty <= 0) {
      newQuantity = 1;
    }
    onChange(Number(newQuantity));
    setInputValue(Number(newQuantity));
  };
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <ButtonGroup variant="outlined">
      <IconButton
        color="inherit"
        size="small"
        onClick={() => handleButtonChangeQty(value - 1)}
        sx={{
          borderRadius: 0,
          borderTopLeftRadius: "3px",
          borderBottomLeftRadius: "3px",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
        disabled={value === 1 || pending}
      >
        <Remove
          sx={{
            fontSize: { xs: 14, sm: 20 },
          }}
        />
      </IconButton>
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleChangeQty}
        inputProps={{
          style: { textAlign: "center", padding: 4 },
        }}
        InputProps={{
          style: { borderRadius: 0, height: "100%" },
        }}
        sx={{ width: { xs: 40, sm: 60 } }}
        type="number"
        variant="outlined"
        disabled={pending}
      />
      <IconButton
        color="inherit"
        size="small"
        onClick={() => handleButtonChangeQty(value + 1)}
        sx={{
          borderRadius: 0,
          borderTopRightRadius: "3px",
          borderBottomRightRadius: "3px",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
        disabled={value === maxStock || pending}
      >
        <Add
          sx={{
            fontSize: { xs: 14, sm: 20 },
          }}
        />
      </IconButton>
    </ButtonGroup>
  );
};

export default QuantityAdjustToggle;
