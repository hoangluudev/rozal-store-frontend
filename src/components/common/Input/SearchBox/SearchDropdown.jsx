import React from "react";
import { Cancel, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Tooltip,
  Popover,
} from "@mui/material";
import TextFieldComponent from "../TextField";

const SearchDropdownComponent = ({
  value,
  isSearchOn,
  handleSubmit,
  handleReset,
  onChange,
  TextFieldProps,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmitSearch();
    }
  };
  const handleSubmitSearch = () => {
    handleSubmit();
    handleClose();
  };
  const handleResetSearch = () => {
    handleReset();
  };
  return (
    <React.Fragment>
      <Tooltip title="Search">
        <IconButton onClick={handleOpen}>
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
          <TextFieldComponent
            value={value}
            onChange={onChange}
            {...TextFieldProps}
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
                      <IconButton edge="start" onClick={handleResetSearch}>
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
export default SearchDropdownComponent;
