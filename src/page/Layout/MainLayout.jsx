import * as React from "react";
import { Outlet } from "react-router-dom";
import HeaderNavBar from "../header/navbar";
import FooterSection from "../footer/footer";
import { Box } from "@mui/material";
import useLoadInitialData from "../../hooks/useLoadInitialData";

export const MainLayout = () => {
  useLoadInitialData("user");
  return (
    <React.Fragment>
      <HeaderNavBar />
      <Box component={"main"}>
        <Outlet />
      </Box>
      <FooterSection />
    </React.Fragment>
  );
};
