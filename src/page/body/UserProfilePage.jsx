import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Grid, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import {
  LocationOn,
  LockPerson,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import { PageContainerLayout } from "../../components/common/Layout";
import { BreadcrumbsComponent } from "../../components/common/UI";
import { getAccessToken } from "../../services/tokenService";
import { LoadingElementComponent } from "../../components/misc/LoadingElement.component";
import { RequireLoginComponent } from "../../components/misc/RequireLogin.component";
import { useCurrentUserApi } from "../../hooks/api";

const UserProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const { currentUserData } = useCurrentUserApi().state;

  const isUserLoggedIn = getAccessToken();
  const breadcrumbsList = [
    {
      title: "Home",
      path: "/",
      isDisabled: false,
    },
    {
      title: "My Profile",
      path: "",
      isDisabled: true,
    },
  ];
  const menuItems = React.useMemo(
    () => [
      {
        title: "Account",
        path: "/user/profile",
        icon: <Person />,
      },
      {
        title: "Security",
        path: "/user/security",
        icon: <LockPerson />,
      },
      {
        title: "Order",
        path: "/user/order",
        icon: <ShoppingCart />,
      },
      {
        title: "Address",
        path: "/user/address",
        icon: <LocationOn />,
      },
    ],
    []
  );

  const [tabIndex, setTabIndex] = React.useState(0);

  React.useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = menuItems.findIndex((item) =>
      currentPath.includes(item.path)
    );
    if (foundIndex !== -1) {
      setTabIndex(foundIndex);
    }
  }, [location.pathname, menuItems]);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <PageContainerLayout>
      <BreadcrumbsComponent breadcrumbList={breadcrumbsList} />
      <Grid container columnSpacing={3} rowSpacing={2}>
        <Grid item xs={12} sm={2}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: "2rem",
            }}
          >
            <Tabs
              orientation={isMobile ? "horizontal" : "vertical"}
              variant="scrollable"
              value={tabIndex}
              onChange={handleChangeTab}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                borderRadius: "2rem",
              }}
            >
              {menuItems.map((item, index) => (
                <Tab
                  key={index}
                  component={Link}
                  to={item.path}
                  icon={item.icon}
                  label={item.title}
                  wrapped
                />
              ))}
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10}>
          {currentUserData ? (
            <Outlet />
          ) : !isUserLoggedIn ? (
            <RequireLoginComponent />
          ) : (
            <LoadingElementComponent />
          )}
        </Grid>
      </Grid>
    </PageContainerLayout>
  );
};
export default UserProfilePage;
