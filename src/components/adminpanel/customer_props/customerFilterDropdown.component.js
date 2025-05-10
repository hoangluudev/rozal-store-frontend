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
import { useDispatch, useSelector } from "react-redux";
import {
  onCustomerFilter,
  onCustomerSearch,
} from "../../../actions/admin/userManagement.action";
import { formatDate } from "../../../utils/formatting";

export const CustomerFilterDropdown = () => {
  const dispatch = useDispatch();
  const { itemPerPage, isFilterOn } = useSelector(
    (reduxData) => reduxData.USERS_ADMIN_REDUCERS
  );
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [gender, setGender] = React.useState("");
  const [dateRange, setDateRange] = React.useState([]);
  const [filterInput, setFilterInput] = React.useState({});

  const handleOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGenderChange = (event) => {
    const gValue = event.target.value;
    setGender(gValue);
    setFilterInput((preState) => ({
      ...preState,
      gender: gValue,
    }));
  };
  const handleDateRangeChange = (value) => {
    setDateRange(value);
    if (
      !value ||
      value.length === 0 ||
      value[0] === null ||
      value[1] === null
    ) {
      setFilterInput((prevState) => ({
        ...prevState,
        joinDate: [],
      }));
    } else {
      setFilterInput((prevState) => ({
        ...prevState,
        joinDate: [formatDate(value[0]), formatDate(value[1])],
      }));
    }
  };
  const handleClearFilter = () => {
    dispatch(onCustomerFilter(0, itemPerPage, {}));
    setDateRange([]);
    setGender("");
    setFilterInput({});
    handleClose();
  };
  const handleSubmitFilter = async () => {
    await dispatch(onCustomerSearch(0, itemPerPage, ""));
    await dispatch(onCustomerFilter(0, itemPerPage, filterInput));
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
          <Box padding={2} maxWidth={250}>
            <FormControl fullWidth size="small">
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                value={gender}
                label="Gender"
                onChange={handleGenderChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <DateRangePicker
                showOneCalendar
                ranges={predefinedRanges}
                value={dateRange}
                block
                size="lg"
                placement={isSmUp ? "bottomEnd" : "bottom"}
                onChange={handleDateRangeChange}
                placeholder="Select Join Date"
              />
            </FormControl>

            <Box marginTop={2} display="flex" justifyContent="space-between">
              <Button
                variant="text"
                color="primary"
                onClick={handleClearFilter}
              >
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
          </Box>
        </Paper>
      </Popper>
    </React.Fragment>
  );
};
