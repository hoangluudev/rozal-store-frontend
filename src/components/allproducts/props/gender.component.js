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

export const GenderFilter = ({ selectedValue, onChange }) => {
  const { productGenderLists } = useSelector(
    (reduxData) => reduxData.PRODUCTS_REDUCERS
  );
  const genderItems = productGenderLists || [];

  const handleGenderChange = (value) => {
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
        Gender
      </ListSubheader>
      <RadioGroup>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {genderItems.map((item) => (
            <ListItemButton key={item} onClick={() => handleGenderChange(item)}>
              <FormControlLabel
                control={
                  <Radio
                    checked={
                      selectedValue.gender && item === selectedValue.gender
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
