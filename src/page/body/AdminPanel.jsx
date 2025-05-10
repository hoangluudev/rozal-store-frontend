import * as React from "react";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  AppBar,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  MenuOpen,
  Dashboard,
  LocalShipping,
  Inventory,
  Home,
  Groups,
  SupervisorAccount,
  Discount,
  Settings,
  Paid,
  Storage,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import UserDropdown from "../header/sidebar/UserDropdown";
import {
  DrawerHeader,
  StyledAppBar,
  StyledDrawer,
} from "../../components/adminpanel/adminpanel_props/drawer_AdminPanel";
import { Outlet, Link } from "react-router-dom";
import TypographyComponent from "../../components/common/UI/Typography";
import { useCurrentUserApi } from "../../hooks/api";

const isChildSelectedInParent = (parentArrObj, selectedTab) => {
  return parentArrObj.some((obj) => obj.path === selectedTab);
};

export const AdminPanelPage = () => {
  const gTabId = window.location.pathname;
  const [selectedTab, setSelectedTab] = React.useState(gTabId);
  const [selectedTabName, setSelectedTabName] = React.useState("");

  const { currentUserData } = useCurrentUserApi().state;

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openChildrenTab, setOpenChildrenTab] = React.useState({});

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenChildrenTab({});
    setOpenDrawer(false);
  };
  const handleMenuItemClick = (tabId, tabName) => {
    setSelectedTab(tabId);
    setSelectedTabName(tabName);
  };

  const onToggleChildrenTab = (index) => {
    handleDrawerOpen();
    setOpenChildrenTab((prev) => ({
      [index]: !prev[index],
    }));
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin-panel/dashboard",
      icon: <Dashboard />,
      children: [],
    },
    {
      title: "Order",
      path: "/admin-panel/order",
      icon: <LocalShipping />,
      children: [],
    },
    {
      title: "Product",
      path: "#",
      icon: <Inventory />,
      children: [
        {
          title: "Inventory",
          path: "/admin-panel/product",
        },
      ],
    },
    {
      title: "Product Alpha",
      path: "#",
      icon: <Inventory />,
      children: [
        {
          title: "Inventory",
          path: "/admin-panel/product-alpha",
        },
        {
          title: "Categories",
          path: "/admin-panel/product-alpha/categories",
        },
        {
          title: "Product Types",
          path: "/admin-panel/product-alpha/product-types",
        },
        {
          title: "Collections",
          path: "/admin-panel/product-alpha/collections",
        },
      ],
    },
    {
      title: "Coupons",
      path: "/admin-panel/coupons",
      icon: <Discount />,
      children: [],
    },
    {
      title: "Customer",
      path: "/admin-panel/customer",
      icon: <Groups />,
      children: [],
    },
    {
      title: "Staff",
      path: "/admin-panel/staff",
      icon: <SupervisorAccount />,
      children: [],
    },
    {
      title: "Transactions",
      path: "/admin-panel/transactions",
      icon: <Paid />,
      children: [],
    },
    {
      title: "Catalog",
      path: "#",
      icon: <Storage />,
      children: [
        {
          title: "Attributes",
          path: "/admin-panel/catalog/attribute",
        },
        {
          title: "Upload Image",
          path: "/admin-panel/catalog/upload-image",
        },
      ],
    },
  ];
  const bottomMenuItems = [
    {
      title: "Settings",
      path: "/admin-panel/settings",
      icon: <Settings />,
      children: [],
    },
    {
      title: "Go to Home",
      path: "/",
      icon: <Home />,
      children: [],
    },
  ];
  const NavMenu = (item, index) => {
    return (
      <>
        <Link style={{ textDecoration: "none" }} to={item.path}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedTab === item.path}
              onClick={() => {
                if (item.children.length > 0) {
                  onToggleChildrenTab(index);
                } else {
                  handleMenuItemClick(item.path, item.title);
                }
              }}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? "initial" : "center",
                px: 2.5,
                backgroundColor:
                  selectedTab === item.path ? "#99dfff" : "inherit",
                boxShadow:
                  selectedTab === item.path ||
                  isChildSelectedInParent(item.children, selectedTab)
                    ? "-5px 0px 0px 0px #80d8ff inset"
                    : "none",
                "&:hover": {
                  backgroundColor:
                    selectedTab === item.path ? "#99dfff" : "#e0f7fa",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
              >
                <TypographyComponent
                  style={{
                    fontWeight: 700,
                    color:
                      selectedTab === item.path ||
                      isChildSelectedInParent(item.children, selectedTab)
                        ? "#2196f3"
                        : "black",
                    display: openDrawer ? "block" : "none",
                  }}
                  xs={"0.8rem"}
                  sm={"0.9rem"}
                >
                  {item.title}
                </TypographyComponent>
                {openDrawer &&
                  item.children.length > 0 &&
                  (openChildrenTab[index] ? (
                    <ExpandLess
                      color={
                        selectedTab === item.path ||
                        isChildSelectedInParent(item.children, selectedTab)
                          ? "primary"
                          : "action"
                      }
                    />
                  ) : (
                    <ExpandMore
                      color={
                        selectedTab === item.path ||
                        isChildSelectedInParent(item.children, selectedTab)
                          ? "primary"
                          : "action"
                      }
                    />
                  ))}
              </Stack>
            </ListItemButton>
          </ListItem>
        </Link>
        <Collapse in={openChildrenTab[index]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child, childIndex) => (
              <Link
                key={childIndex}
                to={child.path}
                style={{ textDecoration: "none" }}
              >
                <ListItemButton
                  selected={selectedTab === child.path}
                  onClick={() => handleMenuItemClick(child.path, child.title)}
                  sx={{
                    pl: 4,
                    py: 1,
                    backgroundColor:
                      selectedTab === child.path ? "#9fa8da" : "inherit",
                    boxShadow:
                      selectedTab === child.path
                        ? "-5px 0px 0px 0px #8c9eff inset"
                        : "none",
                    "&:hover": {
                      backgroundColor:
                        selectedTab === child.path ? "#99dfff" : "#c5cae9",
                    },
                  }}
                >
                  <TypographyComponent
                    style={{
                      fontWeight: 700,
                      color: selectedTab === child.path ? "#3f51b5" : "#757575",
                    }}
                    xs={"0.85rem"}
                  >
                    {child.title}
                  </TypographyComponent>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      </>
    );
  };
  const DrawerList = () => {
    return (
      <>
        <DrawerHeader>
          <Link
            href="/"
            style={{
              width: "100%",
              textDecoration: "none",
              fontSize: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              color: "black",
            }}
          >
            <Typography
              variant="h4"
              fontSize={{ xs: "28px", lg: "32px" }}
              className="fw-bold me-2"
            >
              Rozal
            </Typography>
            <Typography variant="h4" fontSize={{ xs: "28px", lg: "32px" }}>
              Store
            </Typography>
          </Link>
        </DrawerHeader>
        <Divider variant="middle" component="div" />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? "initial" : "center",
                px: 2.5,
                pointerEvents: "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openDrawer ? 3 : "auto",
                  justifyContent: "center",
                  pointerEvents: "all",
                }}
              >
                <UserDropdown />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentUserData ? currentUserData.fullName : "Loading..."
                }
                secondary={
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {currentUserData ? currentUserData.role.name : "Loading..."}
                  </Typography>
                }
                sx={{ opacity: openDrawer ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider variant="middle" component="div" />
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>{NavMenu(item, index)}</React.Fragment>
          ))}
        </List>
        <Stack style={{ height: "100%" }} justifyContent={"flex-end"}>
          <Divider variant="middle" component="div" />
          <List>
            {bottomMenuItems.map((item, index) => (
              <React.Fragment key={index}>
                {NavMenu(item, index)}
              </React.Fragment>
            ))}
          </List>
        </Stack>
      </>
    );
  };
  const ToolbarList = () => (
    <Toolbar>
      {openDrawer ? (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerClose}
          edge="start"
          sx={{
            marginRight: 2,
          }}
        >
          <MenuOpen />
        </IconButton>
      ) : (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(openDrawer && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Stack
        className="w-100"
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" noWrap component="div">
          {selectedTabName ? selectedTabName : "Admin Panel"}
        </Typography>
        <UserDropdown />
      </Stack>
    </Toolbar>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMdUp ? (
        <StyledAppBar position="fixed" open={openDrawer}>
          {ToolbarList()}
        </StyledAppBar>
      ) : (
        <AppBar position="fixed">{ToolbarList()}</AppBar>
      )}
      {isMdUp ? (
        <StyledDrawer variant="permanent" open={openDrawer}>
          {DrawerList()}
        </StyledDrawer>
      ) : (
        <SwipeableDrawer
          anchor={"left"}
          open={openDrawer}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
        >
          {DrawerList()}
        </SwipeableDrawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: "auto" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};
