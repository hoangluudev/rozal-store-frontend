import * as React from "react";
import {
  Box,
  FormControl,
  ListSubheader,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";

export const PriceRangeFilter = ({
  productDataList,
  onChange,
  filteredData,
}) => {
  const { isFilterOn } = useSelector(
    (reduxData) => reduxData.PRODUCTS_REDUCERS
  );
  const productData = isFilterOn ? filteredData : productDataList;
  const initialPrice = {
    priceFrom: 0,
    priceTo: 100,
  };
  const [priceRange, setPriceRange] = React.useState(initialPrice);

  const handleInputChange = (key, value) => {
    let updatedPriceRange = { ...priceRange };
    if (isNaN(parseInt(value))) {
      value = 0;
    }
    if (key === "priceFrom") {
      updatedPriceRange.priceFrom = parseInt(value);
    }
    if (key === "priceTo") {
      updatedPriceRange.priceTo = parseInt(value);
    }
    setPriceRange(updatedPriceRange);
  };
  const handleOnBlurInput = (key, value) => {
    let updatedPriceRange = { ...priceRange };
    if (isNaN(parseInt(value))) {
      value = 0;
    }
    if (key === "priceFrom") {
      updatedPriceRange.priceFrom = parseInt(value);
      if (updatedPriceRange.priceFrom >= updatedPriceRange.priceTo) {
        updatedPriceRange.priceFrom = updatedPriceRange.priceTo - 1000;
      }
    }
    if (key === "priceTo") {
      updatedPriceRange.priceTo = parseInt(value);
      if (updatedPriceRange.priceTo <= updatedPriceRange.priceFrom) {
        updatedPriceRange.priceTo = updatedPriceRange.priceFrom + 1000;
      }
    }
    setPriceRange(updatedPriceRange);
    onChange(updatedPriceRange);
  };
  React.useEffect(() => {
    if (productData.length > 0) {
      let min = Math.min(
        ...productData.map((product) => product.promotionPrice)
      );
      let max = Math.max(
        ...productData.map((product) => product.promotionPrice)
      );
      setPriceRange({
        priceFrom: min,
        priceTo: max,
      });
    }
  }, [productData]);

  return (
    <FormControl>
      <ListSubheader
        sx={{
          bgcolor: "background.paper",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Price
      </ListSubheader>
      <Box className="gap-3 my-3 px-4" display="flex" alignItems="center">
        <TextField
          label="From"
          type="number"
          value={priceRange.priceFrom}
          onChange={(e) =>
            handleInputChange("priceFrom", parseInt(e.target.value))
          }
          onBlur={(e) =>
            handleOnBlurInput("priceFrom", parseInt(e.target.value))
          }
          InputProps={{
            inputProps: {
              min: 0,
              step: "any",
              style: { textAlign: "right" },
            },
            endAdornment: <InputAdornment position="start">đ</InputAdornment>,
          }}
        />
        <span>-</span>
        <TextField
          className=""
          label="To"
          type="number"
          value={priceRange.priceTo}
          onChange={(e) =>
            handleInputChange("priceTo", parseInt(e.target.value))
          }
          onBlur={(e) =>
            handleOnBlurInput("priceTo", parseInt(e.target.value))
          }
          InputProps={{
            inputProps: { min: 0, style: { textAlign: "right" } },
            endAdornment: <InputAdornment position="start">đ</InputAdornment>,
          }}
        />
      </Box>
    </FormControl>
  );
};
