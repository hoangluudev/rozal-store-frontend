import React from "react";
import { Grid, Typography } from "@mui/material";

const FormFieldComponent = ({
  id,
  label = "",
  isColumn = false,
  isResponsive = true,
  children,
  titleProps,
  ...props
}) => (
  <Grid
    container
    item
    xs={12}
    alignItems={"center"}
    rowGap={1}
    columnGap={2}
    {...props}
  >
    <Grid
      item
      xs={isResponsive ? 12 : "auto"}
      sm={isColumn === true ? 12 : "auto"}
    >
      <Typography {...titleProps}>
        {id ? <label htmlFor={id}>{label}</label> : label}
      </Typography>
    </Grid>
    <Grid
      item
      xs={isResponsive ? 12 : "auto"}
      sm={isColumn === true ? 12 : "auto"}
    >
      {children ? children : null}
    </Grid>
  </Grid>
);

export default FormFieldComponent;
