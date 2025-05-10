import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { convertToCurrency } from "../../../../utils/formatting";

const CurrencyRangeSlider = ({
  min = 0,
  max = 10000000,
  valueFrom = min,
  valueTo = max,
  value = [valueFrom, valueTo],
  step = 100000,
  onChange,
}) => {
  const [sliderValue, setSliderValue] = React.useState(value);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography style={{ textAlign: "center" }} gutterBottom>
        {convertToCurrency(sliderValue[0])} -{" "}
        {convertToCurrency(sliderValue[1])}
      </Typography>
      <Slider
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onChange={handleSliderChange}
        onChangeCommitted={(event, newValue) => onChange && onChange(newValue)}
        valueLabelDisplay="off"
        aria-labelledby="currency-range-slider"
      />
    </Box>
  );
};
export default CurrencyRangeSlider;
