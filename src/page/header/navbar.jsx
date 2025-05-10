import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Link,
  Button,
  Stack,
} from "@mui/material";
import MenuSideBar from "./sidebar/menusidebar";
import ElevationScroll from "./props/navbarProp";
import UserCartDropdown from "./sidebar/UserCartDropdown";
import UserDropdown from "./sidebar/UserDropdown";

const navButtons = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
  { label: "Shop Alpha", path: "/products-alpha" },
  { label: "Features", path: "/features" },
  { label: "Blog", path: "/blog" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const HeaderNavBar = () => {
  return (
    <ElevationScroll>
      <AppBar position="fixed">
        <Toolbar style={{ paddingRight: "0", justifyContent: "space-between" }}>
          <Typography variant="h5" component="div">
            <Link
              href="/"
              underline="none"
              color="inherit"
              className="text-uppercase"
              sx={{
                "&:hover": {
                  textDecoration: "none",
                  color: "#fd4848",
                },
                "&:active": {
                  textDecoration: "none",
                  color: "inherit",
                },
                "&:focus": {
                  textDecoration: "none",
                  color: "inherit",
                },
              }}
              fontSize={{ xs: "20px", sm: "26px" }}
            >
              <Typography
                component={"span"}
                fontSize={{ xs: "20px", sm: "26px" }}
                className="fw-bold me-2"
              >
                Rozal
              </Typography>
              Store
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              paddingLeft: "3rem",
            }}
          >
            {navButtons.map((button, index) => (
              <Button
                key={index}
                sx={{
                  my: 2,
                  px: "1rem",
                  fontSize: "16px",
                  color: "white",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  "&:hover": {
                    color: "#fd4848",
                  },
                  "&:active": {
                    textDecoration: "none",
                    color: "inherit",
                  },
                  "&:focus": {
                    textDecoration: "none",
                    color: "inherit",
                  },
                }}
                href={button.path}
              >
                {button.label}
              </Button>
            ))}
          </Box>
          <Stack flexDirection="row" alignItems="center" columnGap={1}>
            <UserCartDropdown />
            <UserDropdown />    
            <MenuSideBar />
          </Stack>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default HeaderNavBar;
