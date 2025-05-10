import * as React from "react";
import {
  Box,
  FormControl,
  ListSubheader,
  ListItemButton,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useSelector } from "react-redux";

export const BrandFilter = ({ selectedValue, onChange }) => {
  const { productBrandLists } = useSelector(
    (reduxData) => reduxData.PRODUCTS_REDUCERS
  );
  const brandItems = productBrandLists || [];

  const handleBrandChange = (value) => {
    onChange(value);
  };

  return (
    <FormControl component="fieldset">
      <ListSubheader
        sx={{
          bgcolor: "background.paper",
          fontSize: "16px",
          fontWeight: "600",
          width: "100%",
        }}
      >
        Brand
      </ListSubheader>
      <RadioGroup>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {brandItems.map((item) => (
            <ListItemButton key={item} onClick={() => handleBrandChange(item)}>
              <FormControlLabel
                control={
                  <Radio
                    checked={
                      selectedValue.brand && item === selectedValue.brand
                        ? true
                        : false
                    }
                    value={item}
                  />
                }
                label={item.toUpperCase()}
              />
            </ListItemButton>
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
