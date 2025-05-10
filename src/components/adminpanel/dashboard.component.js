import * as React from "react";
import { useDispatch } from "react-redux";
import { fetchDashboardStatistics } from "../../actions/admin/dashboard.action";
import { Box, Grid, Typography } from "@mui/material";
import { ProductCategoryPieChart } from "./dashboard_props/chartjs/ProductCategoryPieChart.component";
import { OrderStatsDashBoard } from "./dashboard_props/order.component";
import { OverviewDashboard } from "./dashboard_props/overview.component";
import { SalesBarChart } from "./dashboard_props/chartjs/SalesBarChart.component";
import { HorizontalBarChart } from "./dashboard_props/chartjs/TopSoldProducts.component";

export const AdminDashboard = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);
  return (
    <React.Fragment>
      <Box style={{ marginBottom: "1rem" }}>
        <Typography style={{ fontWeight: 700, fontSize: "1rem" }}>
          Dashboard Overview
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid container item xs={12}>
            <OverviewDashboard />
          </Grid>
          <Grid container item xs={12}>
            <OrderStatsDashBoard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SalesBarChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HorizontalBarChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProductCategoryPieChart />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
