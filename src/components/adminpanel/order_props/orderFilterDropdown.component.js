import * as React from "react";
import {
  IconButton,
  Tooltip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Popper,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "./props/predefinedRanges";
import "rsuite/dist/rsuite.min.css";
import { formatDate } from "../../../utils/formatting";
import useOrderManagementApi from "@/hooks/api/useOrderManagementApi";

const orderStatusOptions = ["pending", "completed", "canceled"];
const progressStatusOptions = [
  { status: "Order Confirmed" },
  { status: "Order Packed" },
  { status: "On the Way" },
  { status: "Out for Delivery" },
  { status: "Delivered" },
];

export const OrderFilterDropdown = () => {
  const { onOrderFilter, onOrderSearch } = useOrderManagementApi();
  const { itemPerPage, isFilterOn } = useOrderManagementApi().state;

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [progressStatus, setProgressStatus] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState("");
  const [filterInput, setFilterInput] = React.useState({});
  const [dateRange, setDateRange] = React.useState([]);

  const handleOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onOrderCreatedDateChange = (value) => {
    setDateRange(value);
    if (
      !value ||
      value.length === 0 ||
      value[0] === null ||
      value[1] === null
    ) {
      setFilterInput((prevState) => ({
        ...prevState,
        createdDate: [],
      }));
    } else {
      setFilterInput((prevState) => ({
        ...prevState,
        createdDate: [formatDate(value[0]), formatDate(value[1])],
      }));
    }
  };
  const onPaymentMethodChange = (event) => {
    const value = event.target.value;
    setPaymentMethod(value);
    setFilterInput((prevState) => ({
      ...prevState,
      paymentMethod: value,
    }));
  };
  const onProgressStatusChange = (event) => {
    const value = event.target.value;
    setProgressStatus(value);
    setFilterInput((prevState) => ({
      ...prevState,
      progressStatus: value,
    }));
  };
  const onOrderStatusChange = (event) => {
    const value = event.target.value;
    setOrderStatus(value);
    setFilterInput((prevState) => ({
      ...prevState,
      orderStatus: value,
    }));
  };

  const handleClearFilter = () => {
    onOrderFilter(0, itemPerPage, {});
    setDateRange([]);
    setPaymentMethod("");
    setProgressStatus("");
    setOrderStatus("");
    setFilterInput({});
    handleClose();
  };
  const handleSubmitFilter = async () => {
    await onOrderSearch(0, itemPerPage, "");
    await onOrderFilter(0, itemPerPage, filterInput);
    handleClose();
  };

  return (
    <React.Fragment>
      <Tooltip title="Filter">
        <Badge
          color="primary"
          variant="dot"
          overlap="circular"
          invisible={!isFilterOn}
        >
          <IconButton onClick={handleOpen}>
            <FilterAlt color={isFilterOn ? "primary" : "inherit"} />
          </IconButton>
        </Badge>
      </Tooltip>
      <Popper
        id={"customer-filter"}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <Paper>
          <Box padding={2} maxWidth={300}>
            <FormControl fullWidth margin="normal">
              <DateRangePicker
                showOneCalendar
                ranges={predefinedRanges}
                value={dateRange}
                block
                size="lg"
                placement={isSmUp ? "bottomEnd" : "bottom"}
                onChange={onOrderCreatedDateChange}
                placeholder="Select Created Date"
              />
            </FormControl>
            <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
              <InputLabel id="payment-method-select-label">
                Payment Method
              </InputLabel>
              <Select
                labelId="payment-method-select-label"
                value={paymentMethod}
                label="Payment Method"
                onChange={onPaymentMethodChange}
              >
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
              <InputLabel id="progress-status-select-label">
                Progress Status
              </InputLabel>
              <Select
                labelId="progress-status-select-label"
                value={progressStatus}
                label="Progress Status"
                onChange={onProgressStatusChange}
              >
                {progressStatusOptions.map((option) => (
                  <MenuItem key={option.status} value={option.status}>
                    {option.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
              <InputLabel id="order-status-select-label">
                Order Status
              </InputLabel>
              <Select
                labelId="order-status-select-label"
                value={orderStatus}
                label="Order Status"
                onChange={onOrderStatusChange}
              >
                {orderStatusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ padding: "0.3rem" }}
          >
            <Button variant="text" color="primary" onClick={handleClearFilter}>
              Clear
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleSubmitFilter}
            >
              Apply
            </Button>
          </Box>
        </Paper>
      </Popper>
    </React.Fragment>
  );
};
