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

export const CategoryFilter = ({ selectedValue, onChange }) => {
  const { productCategoryLists } = useSelector(
    (reduxData) => reduxData.PRODUCTS_REDUCERS
  );
  const categoryItems = productCategoryLists || [];

  const onCategoryChange = (value) => {
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
        Category
      </ListSubheader>
      <RadioGroup>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {categoryItems.map((item) => (
            <ListItemButton key={item} onClick={() => onCategoryChange(item)}>
              <FormControlLabel
                control={
                  <Radio
                    checked={
                      selectedValue.category && item === selectedValue.category
                        ? true
                        : false
                    }
                    value={item}
                  />
                }
                label={
                  item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
                }
              />
            </ListItemButton>
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
