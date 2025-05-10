import * as React from "react";
import {
  IconButton,
  Tooltip,
  Box,
  Paper,
  Badge,
  Menu,
  Button,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

export const FilterDropdownComponent = ({
  value,
  onChange,
  isFilterOn,
  handleSubmit,
  handleReset,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubmitFilter = () => {
    handleSubmit();
    handleClose();
  };

  const handleResetFilter = () => {
    handleReset();
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
      <Menu
        id={"filter-dropdown"}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          maxHeight: "calc(85% - 96px)",
          ul: { paddingY: "0" },
        }}
      >
        <Paper>
          <Box padding={2} width={300}>
            {React.cloneElement(children, {
              value,
              onChange,
            })}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ padding: "0.3rem" }}
          >
            <Button variant="text" color="primary" onClick={handleResetFilter}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleSubmitFilter}>
              Apply
            </Button>
          </Box>
        </Paper>
      </Menu>
    </React.Fragment>
  );
};
