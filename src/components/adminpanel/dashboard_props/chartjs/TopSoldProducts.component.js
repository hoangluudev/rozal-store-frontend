import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import { useDashboardApi } from "@/hooks/api";

export const HorizontalBarChart = () => {
  const { topSoldProduct } = useDashboardApi().state;

  const [selectedDataset, setSelectedDataset] = React.useState("_allTime");

  const handleSelectDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  const getChartData = (dataset) => {
    if (!topSoldProduct) return { labels: ["Loading"], datasets: [] };
    const backgroundColors = [
      "#ef5350",
      "#42a5f5",
      "#ffa726",
      "#26c6da",
      "#7e57c2",
    ];

    // Mảng màu cho hoverBackgroundColor
    const hoverBackgroundColors = [
      "#e57373",
      "#64b5f6",
      "#ffb74d",
      "#4dd0e1",
      "#9575cd",
    ];
    const data = {
      labels: topSoldProduct[dataset].name,
      datasets: [
        {
          label: "Number of Products sold",
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors,
          data: topSoldProduct[dataset].quantity,
        },
      ],
    };
    return data;
  };

  const options = {
    maintainAspectRatio: false,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            let characterLimit = 8;
            let label = this.getLabelForValue(value);
            if (label.length >= characterLimit) {
              return (
                label
                  .slice(0, label.length)
                  .substring(0, characterLimit - 1)
                  .trim() + "..."
              );
            }
            return label;
          },
        },
      },
      x: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Paper style={{ padding: 16, height: "100%" }}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          variant="h6"
          component="div"
          style={{ textTransform: "capitalize" }}
        >
          Top product sold
        </Typography>
        <Box>
          <FormControl sx={{ width: 130 }}>
            <Select
              value={selectedDataset}
              displayEmpty
              size="small"
              onChange={handleSelectDatasetChange}
            >
              <MenuItem value={"_today"}>Today</MenuItem>
              <MenuItem value={"_thisMonth"}>This Month</MenuItem>
              <MenuItem value={"_thisYear"}>This Year</MenuItem>
              <MenuItem value={"_allTime"}>All Time</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
        <Container
          style={{ height: "calc(100% - 56px)", width: "100%" }}
          className="px-0"
        >
          <div
            style={{
              minHeight: 200,
              maxHeight: 300,
              height: "100%",
              width: "100%",
            }}
          >
            <Bar options={options} data={getChartData(selectedDataset)} />
          </div>
        </Container>
      </Box>
    </Paper>
  );
};
