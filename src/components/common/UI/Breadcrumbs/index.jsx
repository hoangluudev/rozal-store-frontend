import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Typography, Link as LinkMUI } from "@mui/material";
import { Link } from "react-router-dom";

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
            <LinkMUI
              key={index}
              component={Link}
              underline="hover"
              color="inherit"
              to={item.path}
              sx={textProps}
            >
              {item.title || "..."}
            </LinkMUI>
          )
        )
      ) : (
        <Typography color="text.primary">Empty Breadcrumb</Typography>
      )}
    </Breadcrumbs>
  );
};
export default BreadcrumbsComponent;
