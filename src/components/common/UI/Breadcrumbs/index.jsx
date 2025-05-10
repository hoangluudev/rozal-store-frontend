import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import React from "react";

const BreadcrumbsComponent = ({ breadcrumbList = [], textProps = {} }) => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNext fontSize="small" />}
      style={{ fontWeight: 600 }}
    >
      {breadcrumbList && breadcrumbList.length > 0 ? (
        breadcrumbList.map((item, index) =>
          item.isDisabled ? (
            <Typography key={index} color="text.primary" sx={textProps}>
              {item.title}
            </Typography>
          ) : (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={item.path}
              sx={textProps}
            >
              {item.title || "..."}
            </Link>
          )
        )
      ) : (
        <Typography color="text.primary">Empty Breadcrumb</Typography>
      )}
    </Breadcrumbs>
  );
};
export default BreadcrumbsComponent;
