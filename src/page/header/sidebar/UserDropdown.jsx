import React from "react";
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
  LogoutOutlined,
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
import { useNavigate } from "react-router-dom";

const loggedInMenuItems = [
  { label: "View profile", path: "/user/profile", icon: <PersonOutlined /> },
  { label: "My order", path: "/user/order", icon: <ShoppingCartOutlined /> },
  { label: "Wishlist", path: "#", icon: <FavoriteBorderOutlined /> },
  { label: "Setting", path: "#", icon: <SettingsOutlined /> },
];

const CustomMenuItem = ({ icon, label, path, onClick }) => (
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
    >
      {icon}
      <Typography sx={{ marginLeft: 1 }}>{label}</Typography>
    </MenuItem>
  </Link>
);

const UserDropdown = () => {
  const navigate = useNavigate();
  const { onUserLogout } = useUserAuthApi();
  const { currentUserData, isAdminRole } = useCurrentUserApi().state;
  const isLoggedIn = !isEmptyObj(currentUserData);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenDropdown = (event) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    onUserLogout();
    removeAccessToken();
    handleCloseDropdown();
  };

  const renderMenuItems = () => (
    <Box>
      {loggedInMenuItems.map((item, idx) => (
        <CustomMenuItem
          key={idx}
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
  );

  return (
    <>
      <IconButtonComponent
        color="inherit"
        hoverColor="error"
        icon={
          isLoggedIn && currentUserData?.profileImage ? (
            <Avatar
              alt=""
              src={currentUserData.profileImage}
              sx={{ width: 30, height: 30 }}
            />
          ) : (
            <Person color="inherit" />
          )
        }
        onClick={handleOpenDropdown}
        sx={{ display: { xs: "none", sm: "block" } }}
      />

      {isLoggedIn && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDropdown}
          keepMounted
          disableScrollLock
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: { maxWidth: 300, p: 2 } } }}
          sx={{ ul: { py: 0 } }}
        >
          <Box sx={{ mb: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ p: 1 }}
            >
              <Avatar src={currentUserData?.profileImage}>
                {!currentUserData?.profileImage &&
                  convertToShortLetter(currentUserData.fullName)}
              </Avatar>
              <Box>
                <Typography
                  fontSize="14px"
                  fontWeight={600}
                  noWrap
                  maxWidth={200}
                >
                  {currentUserData.fullName}
                </Typography>
                <Typography
                  fontSize="13px"
                  color="textSecondary"
                  noWrap
                  maxWidth={200}
                >
                  {currentUserData.email}
                </Typography>
              </Box>
            </Stack>
            <DividerComponent />
          </Box>
          {renderMenuItems()}
        </Menu>
      )}
    </>
  );
};

export default UserDropdown;
