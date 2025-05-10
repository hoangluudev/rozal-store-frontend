import { Divider } from "@mui/material";

const DividerComponent = ({
  isVertical = false,
  flexItem = false,
  variant = "fullWidth",
  sx = {},
  ...props
}) => {
  return (
    <Divider
      orientation={isVertical ? "vertical" : "horizontal"}
      flexItem={flexItem}
      variant={variant}
      style={{ width: isVertical ? "auto" : "100%", opacity: 1 }}
      sx={sx}
      {...props}
    />
  );
};
export default DividerComponent;
