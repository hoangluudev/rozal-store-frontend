import * as React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { MoreVert, PaymentsOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { convertToCurrency } from "../../../../utils/formatting";

export const TotalRevenue = () => {
  const { totalRevenue } = useSelector(
    (reduxData) => reduxData.ADMIN_DASHBOARD_REDUCERS
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let textColor = "#fff";
  let backgroundColor = "#4caf50";

  const [selectDataset, setSelectDataset] = React.useState("today");

  const datasetList = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "This Year", value: "year" },
    { label: "All time", value: "all" },
  ];

  const datasetMapping = {
    all: "_allTime",
    today: "_today",
    week: "_thisWeek",
    month: "_thisMonth",
    year: "_thisYear",
  };

  const handleDatasetChange = (event, newDataset) => {
    if (newDataset !== null) {
      setSelectDataset(newDataset);
      handleClose();
    }
  };
  const selectedData = totalRevenue
    ? totalRevenue[datasetMapping[selectDataset]]
    : {};

  return (
    <Card
      variant="elevation"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "1rem",
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <CardContent>
        <Stack flexDirection={"column"} justifyContent={"center"} gap={2}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack flexDirection={"row"} alignItems={"center"} columnGap={1}>
              <PaymentsOutlined sx={{ color: textColor }} fontSize="large" />
              <Typography
                sx={{
                  fontSize: 16,
                  textTransform: "capitalize",
                  fontWeight: 600,
                  color: "#fff",
                }}
              >
                Total revenue
              </Typography>
            </Stack>

            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleOpenDropdown}
            >
              <MoreVert style={{ color: "#fff" }} />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "max-content",
                },
              }}
            >
              {datasetList.map((option) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === selectDataset}
                  onClick={(event) => handleDatasetChange(event, option.value)}
                  style={{
                    backgroundColor:
                      option.value === selectDataset ? "#a5d6a7" : "inherit",
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
          <Typography
            sx={{
              fontSize: "1.5rem",
              textTransform: "capitalize",
              fontWeight: 700,
              color: `${textColor}`,
            }}
          >
            {totalRevenue && selectedData
              ? `${convertToCurrency(selectedData)}`
              : "0đ"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
