import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDashboardApi } from "@/hooks/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SalesBarChart = () => {
  const { saleStatisticOverrall } = useDashboardApi().state;

  const [selectedTab, setSelectedTab] = useState("sales");

  const handleSelectTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const weeklyStats = saleStatisticOverrall
    ? saleStatisticOverrall._weekly
    : null;
  const monthlyStats = saleStatisticOverrall
    ? saleStatisticOverrall._monthly
    : null;

  const [chartLabel, setChartLabel] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [totalSale, setTotalSale] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("weekly");

  const isDataLoaded =
    chartLabel.length > 0 &&
    totalOrder.length > 0 &&
    totalRevenue.length > 0 &&
    totalSale.length > 0;

  useEffect(() => {
    if (selectedDataset === "weekly" && weeklyStats) {
      setChartLabel(weeklyStats.label);
      setTotalOrder(weeklyStats.totalOrders);
      setTotalRevenue(weeklyStats.totalRevenues);
      setTotalSale(weeklyStats.totalSales);
    } else if (selectedDataset === "monthly" && monthlyStats) {
      setChartLabel(monthlyStats.label);
      setTotalOrder(monthlyStats.totalOrders);
      setTotalRevenue(monthlyStats.totalRevenues);
      setTotalSale(monthlyStats.totalSales);
    }
  }, [selectedDataset, weeklyStats, monthlyStats]);

  const handleSelectDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const salesData = {
    labels: chartLabel || [],
    datasets: [
      {
        type: "bar",
        label: "Total Revenue",
        data: totalRevenue || [],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
      {
        type: "bar",
        label: "Total Sales",
        data: totalSale || [],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };
  const ordersData = {
    labels: chartLabel || [],
    datasets: [
      {
        type: "bar",
        label: "Total Orders",
        data: totalOrder || [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const saleOptions = {
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.value || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              const formattedValue =
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                })
                  .format(context.raw)
                  .replace("₫", "") + "đ";
              label += formattedValue;
            }
            return label;
          },
        },
      },
    },
  };
  const orderOptions = {
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <Paper style={{ padding: 16, height: "100%" }}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" component="div">
          {selectedDataset === "weekly" ? "Weekly Sales" : "Monthly Sales"}
        </Typography>
        <Box>
          <FormControl sx={{ minWidth: 100 }} size="small">
            <Select
              value={selectedDataset}
              displayEmpty
              size="small"
              onChange={handleSelectDatasetChange}
            >
              <MenuItem value={"weekly"}>Weekly</MenuItem>
              <MenuItem value={"monthly"}>Monthly</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleSelectTabChange} aria-label="">
              <Tab
                label="Sales"
                value="sales"
                style={{
                  textTransform: "capitalize",
                }}
              />
              <Tab
                label="Orders"
                value="orders"
                style={{
                  textTransform: "capitalize",
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="sales" style={{ padding: "1rem" }}>
            <Box>
              <Container
                style={{ height: "calc(100% - 56px)", width: "100%" }}
                className="px-0"
              >
                {isDataLoaded && (
                  <div
                    style={{ minHeight: 200, height: "100%", width: "100%" }}
                  >
                    <Bar data={salesData} options={saleOptions} />
                  </div>
                )}
              </Container>
            </Box>
          </TabPanel>
          <TabPanel value="orders" style={{ padding: "1rem" }}>
            <Box>
              <Container
                style={{ height: "calc(100% - 56px)", width: "100%" }}
                className="px-0"
              >
                {isDataLoaded && (
                  <div
                    style={{ minHeight: 200, height: "100%", width: "100%" }}
                  >
                    <Bar data={ordersData} options={orderOptions} />
                  </div>
                )}
              </Container>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
};
