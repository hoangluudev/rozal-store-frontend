import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button, Stack } from "@mui/material";
import MenuSideBar from "./sidebar/menusidebar";
import ElevationScroll from "./props/navbarProp";
import UserCartDropdown from "./sidebar/UserCartDropdown";
import UserDropdown from "./sidebar/UserDropdown";

const navButtons = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
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
              to="/"
              style={{
                color: "inherit",
                fontSize: "20px",
                textTransform: "uppercase",
                textDecoration: "none",
                "&:hover": {
                  color: "#fd4848",
                },
                "&:active": {
                  color: "inherit",
                },
                "&:focus": {
                  color: "inherit",
                },
              }}
            >
              <Typography
                component={"span"}
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  mr: 1,
                }}
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
                component={Link}
                to={button.path}
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
