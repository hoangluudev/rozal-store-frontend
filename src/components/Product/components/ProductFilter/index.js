import React from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Close,
  Search,
  RestartAlt,
  FilterAlt,
  FilterAltOff,
} from "@mui/icons-material";
import { IconButtonComponent } from "../../../common/UI";
import DrawerFilterForm from "./DrawerFilterForm";
import { useCustomSearchParams } from "../../../../hooks/useSearchParams";

const ProductFilterDrawer = ({
  filterValue,
  filterOptionsData = {},
  isFilterOn = false,
}) => {
  const {
    setSearchParamsURLWithResetPage,
    resetSearchParamURL,
    removeSearchParamURL,
  } = useCustomSearchParams();

  const updateSearchParams = (newParams, newPage) => {
    setSearchParamsURLWithResetPage(newParams, newPage);
  };
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [filterData, setFilterData] = React.useState(filterValue);

  const onFilterChange = (data) => {
    setFilterData(data);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const handleSubmitFilter = () => {
    updateSearchParams(filterData, 1);
    handleCloseDrawer();
  };
  const handleResetFilter = () => {
    setFilterData({});
    resetSearchParamURL();
    handleCloseDrawer();
  };
  const handleDeleteFilter = (key) => () => {
    setFilterData((prevFilterValue) => {
      const newFilterValue = { ...prevFilterValue };
      delete newFilterValue[key];
      removeSearchParamURL(key);
      return newFilterValue;
    });
  };
  React.useEffect(() => {
    setFilterData(filterValue);
  }, [filterValue]);
  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleOpenDrawer}
        startIcon={isFilterOn ? <FilterAlt /> : <FilterAltOff />}
        style={{
          background: "transparent",
          color: "black",
        }}
      >
        Filter
      </Button>
      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        anchor="left"
        disableScrollLock={true}
        PaperProps={{
          sx: {
            width: {
              xs: "100%",
              sm: "300px",
              md: "350px",
            },
            scrollbarWidth: "thin",
          },
        }}
      >
        <Box height="100%" display="flex" flexDirection="column">
          <Stack
            flexDirection={"row"}
            justifyContent="space-between"
            alignItems="center"
            p={2}
            borderBottom={1}
            borderColor="divider"
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
            >
              Filter
            </Typography>
            <IconButton onClick={handleCloseDrawer}>
              <Close />
            </IconButton>
          </Stack>
          <Box flex={1} p={2} pb={"1rem"}>
            <DrawerFilterForm
              filterValue={filterData}
              onChange={onFilterChange}
              handleDeleteFilter={handleDeleteFilter}
              filterOptionsData={filterOptionsData}
            />
          </Box>
          <AppBar
            position="sticky"
            color="default"
            sx={{ top: "auto", bottom: 0, left: 0, right: 0 }}
          >
            <Toolbar>
              <Stack
                flexDirection="row"
                alignItems="center"
                width={"100%"}
                columnGap={1}
              >
                <IconButtonComponent
                  icon={<RestartAlt />}
                  color="primary"
                  hoverColor="warning"
                  tooltipTitle="Reset Filter"
                  onClick={handleResetFilter}
                  disabled={!isFilterOn}
                />
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  endIcon={<Search />}
                  onClick={handleSubmitFilter}
                >
                  Apply
                </Button>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default ProductFilterDrawer;
