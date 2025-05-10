import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import useLoadInitialData from "../../hooks/useLoadInitialData";

export const AdminLayout = () => {
  useLoadInitialData("admin");
  return (
    <React.Fragment>
      <Box component={"main"} style={{ background: "#eeeeee" }}>
        <Outlet />
      </Box>
    </React.Fragment>
  );
};
