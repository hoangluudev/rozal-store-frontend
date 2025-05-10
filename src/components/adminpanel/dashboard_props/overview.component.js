import React from "react";
import { Grid } from "@mui/material";
import { TotalRevenue } from "./props/TotalRevenue.component";
import { TotalSales } from "./props/TotalSales.component";
import { TotalProductsSold } from "./props/TotalProductsSold.component";
import { TotalCustomer } from "./props/TotalCustomers.component";

export const OverviewDashboard = () => {
  return (
    <Grid container item xs={12}>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TotalRevenue />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalProductsSold />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalCustomer />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalSales />
        </Grid>
      </Grid>
    </Grid>
  );
};
