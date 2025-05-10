import React, { useState } from "react";
import {
  Avatar,
  Box,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  PersonOutlined,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  SettingsOutlined,
  AccountCircle,
  LogoutOutlined,
  LoginOutlined,
  AdminPanelSettings,
  Person,
} from "@mui/icons-material";
import { convertToShortLetter, isEmptyObj } from "../../../utils/formatting";
import {
  DividerComponent,
  IconButtonComponent,
} from "../../../components/common/UI";
import { removeAccessToken } from "../../../services/tokenService";
import { useCurrentUserApi, useUserAuthApi } from "../../../hooks/api";

const CustomMenuItem = ({ icon, label, path, onClick, ...props }) => {
  return (
    <Link
      href={path}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
      onClick={onClick}
    >
      <MenuItem
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          border: "1px solid transparent",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: (theme) => theme.palette.error.light,
            color: (theme) => theme.palette.error.main,
            "& .MuiSvgIcon-root": {
              color: (theme) => theme.palette.error.main,
            },
          },
        }}
        {...props}
      >
        {icon}
        <Typography sx={{ marginLeft: 1 }}>{label}</Typography>
      </MenuItem>
    </Link>
  );
};

const loggedInMenuItems = [
  { label: "View profile", path: "/user/profile", icon: <PersonOutlined /> },
  { label: "My order", path: "/user/order", icon: <ShoppingCartOutlined /> },
  { label: "Wishlist", path: "#", icon: <FavoriteBorderOutlined /> },
  { label: "Setting", path: "#", icon: <SettingsOutlined /> },
];

const loggedOutMenuItems = [
  { label: "Login", path: "/login", icon: <LoginOutlined /> },
  { label: "Sign Up", path: "/sign-up", icon: <AccountCircle /> },
];

const UserDropdown = () => {
  const { onUserLogout } = useUserAuthApi();
  const { currentUserData, isAdminRole } = useCurrentUserApi().state;

  const isLoggedIn = !isEmptyObj(currentUserData);
  const [isOpenDropdown, setOpenDropdown] = useState(null);

  const handleOpenDropdown = (event) => {
    setOpenDropdown(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setOpenDropdown(null);
  };

  const handleLogOut = () => {
    onUserLogout();
    handleCloseDropdown();
    removeAccessToken();
  };

  const menuItems = isLoggedIn ? (
    <Box>
      {loggedInMenuItems.map((item, index) => (
        <CustomMenuItem
          key={index}
          path={item.path}
          icon={item.icon}
          label={item.label}
          onClick={handleCloseDropdown}
        />
      ))}
      {isAdminRole && (
        <>
          <DividerComponent />
          <CustomMenuItem
            icon={<AdminPanelSettings />}
            label="Admin Panel"
            path="/admin-panel/dashboard"
            onClick={handleCloseDropdown}
          />
        </>
      )}
      <DividerComponent />
      <CustomMenuItem
        icon={<LogoutOutlined />}
        label="Logout"
        onClick={handleLogOut}
      />
    </Box>
  ) : (
    <Box>
      {loggedOutMenuItems.map((item, index) => (
        <CustomMenuItem
          key={index}
          path={item.path}
          icon={item.icon}
          label={item.label}
          onClick={handleCloseDropdown}
        />
      ))}
    </Box>
  );

  return (
    <React.Fragment>
      <IconButtonComponent
        color="inherit"
        hoverColor="error"
        icon={
          isLoggedIn && currentUserData?.profileImage ? (
            <Avatar
              alt=""
              src={currentUserData.profileImage}
              sx={{
                width: 30,
                height: 30,
              }}
            />
          ) : (
            <Person color="inherit" />
          )
        }
        onClick={handleOpenDropdown}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      />

      <Menu
        anchorEl={isOpenDropdown}
        open={Boolean(isOpenDropdown)}
        onClose={handleCloseDropdown}
        keepMounted
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              maxWidth: 300,
              p: 2,
            },
          },
        }}
        sx={{
          ul: {
            py: 0,
          },
        }}
      >
        {isLoggedIn && currentUserData && (
          <Box
            sx={{
              mb: 1,
            }}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              columnGap={1}
              sx={{
                p: 1,
                maxWidth: "100%",
              }}
            >
              {currentUserData.profileImage ? (
                <Avatar alt="" src={currentUserData.profileImage} />
              ) : (
                <Avatar alt="Profile Picture">
                  {convertToShortLetter(currentUserData.fullName)}
                </Avatar>
              )}
              <Box>
                <Typography
                  fontSize={{ xs: "12px", sm: "14px" }}
                  fontWeight={600}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  maxWidth={200}
                >
                  {currentUserData?.fullName}
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={{ xs: "11px", sm: "13px" }}
                  color="textSecondary"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  maxWidth={200}
                >
                  {currentUserData?.email}
                </Typography>
              </Box>
            </Stack>
            <DividerComponent />
          </Box>
        )}

        {menuItems}
      </Menu>
    </React.Fragment>
  );
};

export default UserDropdown;
