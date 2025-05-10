import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ProductCategoryPieChart = () => {
  const { totalProductEachCategory } = useSelector(
    (reduxData) => reduxData.ADMIN_DASHBOARD_REDUCERS
  );

  const categoryListLabels = totalProductEachCategory
    ? totalProductEachCategory.label
    : [];
  const categoryListData = totalProductEachCategory
    ? totalProductEachCategory.totalProducts
    : [];

  const backgroundColors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(255, 0, 255)",
    "rgb(0, 255, 255)",
    "rgb(128, 0, 0)",
    "rgb(0, 128, 128)",
  ];

  const chartData = {
    labels: categoryListLabels,
    datasets: [
      {
        label: "Number of Products",
        data: categoryListData,
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: true,
    },
    plugins: {
      legend: {
        position: "left",
      },
    },
  };

  return (
    <Paper style={{ padding: 16, height: "100%" }}>
      <Typography variant="h6" component="div" gutterBottom>
        Total Product in Each Category
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Container
          style={{ height: "calc(100% - 56px)", width: "100%" }}
          className="px-0"
        >
          <div
            style={{
              minHeight: 200,
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <Pie data={chartData} options={chartOptions} />
          </div>
        </Container>
      </Box>
    </Paper>
  );
};
