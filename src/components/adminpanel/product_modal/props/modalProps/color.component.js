import * as React from "react";
import { ButtonGroup, Button, Typography } from "@mui/material";

export const ProductDetailColor = ({ ProductColor }) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleButtonClick = (value) => {
    setSelectedValue(value);
  };
  return (
    <>
      <Typography
        className="text-secondary fw-bold me-2"
        style={{ fontSize: "14px" }}
      >
        Color:
      </Typography>
      <ButtonGroup className="flex-wrap p-3" variant="outlined" color="primary">
        {ProductColor &&
          ProductColor.map((item) => (
            <Button
              key={item}
              onClick={() => handleButtonClick(item)}
              color={selectedValue === item ? "primary" : "inherit"}
              variant={selectedValue === item ? "contained" : "outlined"}
            >
              {item.toUpperCase()}
            </Button>
          ))}
      </ButtonGroup>
    </>
  );
};
