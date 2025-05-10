import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Collapse,
  Box,
} from "@mui/material";
import { Menu, Search, Close } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { NotificationDropdown } from "./dropdown/notifiactiondropdown";

// Arrays of menu items
const collapsibleMenuItems = [
  { path: "/products", label: "Shop" },
  { path: "/products-alpha", label: "Shop Alpha" },
  { path: "#/", label: "Features" },
  { path: "#/", label: "Blog" },
  { path: "#/", label: "About" },
  { path: "#/", label: "Contact" },
];

const listMenuItems = [
  { path: "/shopping-cart", label: "My Cart" },
  { path: "#/", label: "My Wishlist" },
  { path: "/user/order", label: "Track Order" },
  { path: "#/", label: "Refunds" },
  { path: "#/", label: "Help & FAQs" },
];

const MenuSideBar = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openMenuDropDown, setOpenMenuDropDown] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          borderLeft: "1px solid rgba(87, 101, 106, 0.8)",
          borderRadius: "0",
          color: "white",
          ":hover": { color: "#fd4848" },
        }}
        className="p-3"
      >
        <Menu fontSize="large" />
      </IconButton>
      <Drawer
        anchor="right"
        disableScrollLock={true}
        open={openDrawer}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NotificationDropdown />
          <IconButton onClick={handleDrawerToggle}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ px: 5 }}>
          <TextField
            id="input-search"
            type="text"
            label="Search..."
            className="w-100 mb-3"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>
        <Divider />
        <List>
          <ListItem
            className="d-block d-lg-none"
            sx={{ padding: "5px 0" }}
            onClick={() => setOpenMenuDropDown(!openMenuDropDown)}
          >
            <ListItemButton>
              <ListItemText primary="Menu" />
              <IconButton aria-label="expand" size="large">
                <FontAwesomeIcon icon={faCaretDown} />
              </IconButton>
            </ListItemButton>
          </ListItem>
          <Collapse in={openMenuDropDown}>
            <List component="div" disablePadding className="px-3">
              {collapsibleMenuItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemButton href={item.path}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
          {listMenuItems.map((item, index) => (
            <ListItem key={index} className="px-0">
              <ListItemButton href={item.path}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MenuSideBar;
