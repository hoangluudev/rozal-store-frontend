import React from "react";
import { Cancel, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Popover,
} from "@mui/material";
import useOrderManagementApi from "@/hooks/api/useOrderManagementApi";

export const OrderSearchText = () => {
  const { onOrderFilter, onOrderSearch } = useOrderManagementApi;
  const { itemPerPage, isSearchOn } = useOrderManagementApi.state;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [searchText, setSearchText] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmitSearch();
    }
  };

  const handleSubmitSearch = () => {
    onOrderFilter(0, itemPerPage, {});
    onOrderSearch(0, itemPerPage, searchText);
    handleClose();
  };

  const handleResetSearchText = () => {
    setSearchText("");
    onOrderSearch(0, itemPerPage, "");
  };

  return (
    <React.Fragment>
      <Tooltip title="Search">
        <IconButton onClick={handleClick}>
          <Search color={isSearchOn ? "primary" : "inherit"} />
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box style={{ padding: "0.5rem 1rem", display: "flex", gap: "10px" }}>
          <TextField
            value={searchText}
            name="ProductSearch"
            label="Search..."
            placeholder="Search by name/email/phone..."
            variant="standard"
            onChange={handleOnSearchChange}
            onKeyPress={handleKeyPress}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                fontSize: "0.75rem",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{ marginBottom: "15px" }}>
                  {isSearchOn ? (
                    <Tooltip title="Clear">
                      <IconButton edge="start" onClick={handleResetSearchText}>
                        <Cancel color="error" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <></>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="Search">
            <Button
              color="error"
              variant="contained"
              onClick={handleSubmitSearch}
            >
              <Search />
            </Button>
          </Tooltip>
        </Box>
      </Popover>
    </React.Fragment>
  );
};
