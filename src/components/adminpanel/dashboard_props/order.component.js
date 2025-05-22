import React from "react";
import {
  Grid,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { OrderGridCard } from "./props/OrderGridCard.component";
import {
  AutorenewOutlined,
  CheckOutlined,
  RemoveShoppingCartOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDashboardApi } from "@/hooks/api";

export const OrderStatsDashBoard = () => {
  const { totalOrderCount } = useDashboardApi().state;

  const [selectDataset, setSelectDataset] = React.useState("today");

  const handleDatasetChange = (event, newDataset) => {
    if (newDataset !== null) {
      setSelectDataset(newDataset);
    }
  };

  const datasetList = [
    { label: "Today", value: "today" },
    { label: "This Month", value: "month" },
    { label: "This Year", value: "year" },
    { label: "All time", value: "all" },
  ];
  const datasetMapping = {
    all: "_allTime",
    today: "_today",
    month: "_thisMonth",
    year: "_thisYear",
  };

  const selectedData = totalOrderCount
    ? totalOrderCount[datasetMapping[selectDataset]] || {}
    : {};

  const orderStatisticList = [
    {
      label: "Total Orders",
      textColor: "#f57c00",
      backgroundColor: "#ffecb3",
      icon: <ShoppingCartOutlined />,
      value: selectedData.all || 0,
    },
    {
      label: "Pending",
      textColor: "#2196f3",
      backgroundColor: "#bbdefb",
      icon: <AutorenewOutlined />,
      value: selectedData.pending || 0,
    },
    {
      label: "Delivered",
      textColor: "#4caf50",
      backgroundColor: "#c8e6c9",
      icon: <CheckOutlined />,
      value: selectedData.completed || 0,
    },
    {
      label: "Canceled",
      textColor: "#f44336",
      backgroundColor: "#ffcdd2",
      icon: <RemoveShoppingCartOutlined />,
      value: selectedData.canceled || 0,
    },
  ];

  return (
    <Grid
      container
      item
      xs={12}
      component={Paper}
      style={{ padding: "1rem" }}
      rowGap={2}
    >
      <Grid item xs={12}>
        <Stack
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              textTransform: "capitalize",
              fontWeight: 700,
            }}
          >
            Orders
          </Typography>
          <ToggleButtonGroup
            value={selectDataset}
            exclusive
            onChange={handleDatasetChange}
            aria-label="dataset-toggle"
            size="small"
            style={{ borderRadius: "1rem" }}
          >
            {datasetList.map((dataset) => (
              <ToggleButton
                key={dataset.value}
                value={dataset.value}
                aria-label={dataset.value}
                style={{
                  textTransform: "capitalize",
                  backgroundColor:
                    dataset.value === selectDataset ? "#42a5f5" : "inherit",
                  color: dataset.value === selectDataset ? "#fff" : "#42a5f5",
                }}
              >
                <Typography
                  fontSize={{ xs: "0.7rem", sm: "0.8rem" }}
                  style={{ fontWeight: 700 }}
                >
                  {dataset.label}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {orderStatisticList.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <OrderGridCard cardStyle={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
