import * as React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/style/style.scss";
import { ToastContainer } from "react-toastify";

export const AppLayout = () => {
  return (
    <React.Fragment>
      <ToastContainer limit={3} />
      <Outlet />
    </React.Fragment>
  );
};
