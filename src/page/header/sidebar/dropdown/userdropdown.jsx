import * as React from "react";
import {
  Box,
  IconButton,
  Menu,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemButton,
  Chip,
  ListItemText,
  ListItem,
} from "@mui/material";
import {
  AccountCircle,
  AdminPanelSettings,
  Login,
  Logout,
  ManageAccounts,
  Settings,
} from "@mui/icons-material";
import { useEffect } from "react";
import {
  getAccessToken,
  isAccessTokenExpired,
  removeAccessToken,
} from "../../../../services/tokenService";
import { useCurrentUserApi, useUserAuthApi } from "../../../../hooks/api";

function getShortedLetter(string) {
  const words = string.split(" ");
  const firstChar = words[0][0];
  const lastChar = words[words.length - 1][0];
  if (words.length > 1) {
    return (firstChar + lastChar).toUpperCase();
  }
  return firstChar.toUpperCase();
}

export const UserDropdown = () => {
  const { fetchUserByAccessToken } = useCurrentUserApi();
  const { onFetchRefreshToken, onUserLogout } = useUserAuthApi();
  const { getUserPending, currentUserData, isAdminRole, isRefresh } =
    useCurrentUserApi().state;
  const { isRefreshTokenExpired } = useUserAuthApi().state;

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isGetUser, setIsGetUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLinkClick = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = () => {
    onUserLogout();
    setAnchorElUser(null);
    removeAccessToken();
  };
  const LoggedMenuItem = () => (
    <>
      {isAdminRole ? (
        <>
          <Divider className="py-2">
            <Chip label="Admin Mode" size="small" />
          </Divider>
          <ListItemButton
            href={"/admin-panel/dashboard"}
            sx={{
              "&:hover": {
                backgroundColor: "#fd4848",
                color: "white",
              },
            }}
          >
            <ListItem>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary="Admin Panel" />
            </ListItem>
          </ListItemButton>
        </>
      ) : (
        <></>
      )}
      <Divider className="py-2">
        <Chip
          label={currentUserData.fullName || currentUserData.username}
          size="small"
        />
      </Divider>
      <ListItemButton
        onClick={() => handleLinkClick()}
        href="/user/profile"
        sx={{
          "&:hover": {
            backgroundColor: "#fd4848",
            color: "white",
          },
        }}
      >
        <ListItem>
          <ListItemIcon>
            <ManageAccounts />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
      </ListItemButton>
      <ListItemButton
        onClick={() => handleLinkClick()}
        href="#/"
        sx={{
          "&:hover": {
            backgroundColor: "#fd4848",
            color: "white",
          },
        }}
      >
        <ListItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </ListItemButton>
      <ListItemButton
        href="#/"
        onClick={() => handleLogOut()}
        sx={{
          "&:hover": {
            backgroundColor: "#fd4848",
            color: "white",
          },
        }}
      >
        <ListItem>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </ListItemButton>
    </>
  );
  const NotLoggedMenuItem = () => (
    <ListItemButton
      onClick={() => handleLinkClick()}
      href={"/login"}
      sx={{
        "&:hover": {
          backgroundColor: "#fd4848",
          color: "white",
        },
      }}
    >
      <ListItem>
        <ListItemIcon>
          <Login />
        </ListItemIcon>
        <ListItemText primary={"Login"} />
      </ListItem>
    </ListItemButton>
  );

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      fetchUserByAccessToken();
    } else {
      setIsGetUser(false);
      return;
    }
  }, []);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken && !isRefreshTokenExpired) {
      const interval = setInterval(() => {
        const isTokenExpired = isAccessTokenExpired();
        if (isTokenExpired) {
          onFetchRefreshToken();
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isRefreshTokenExpired, onFetchRefreshToken]);

  useEffect(() => {
    if (isRefresh) {
      onFetchRefreshToken();
    }
  }, [isRefresh, onFetchRefreshToken]);

  useEffect(() => {
    if (!getUserPending && currentUserData) {
      setIsGetUser(true);
    } else if (!currentUserData) {
      setIsGetUser(false);
    }
  }, [currentUserData, getUserPending]);
  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        onClick={handleOpenUserMenu}
        sx={{
          color: "white",
          ":hover": { color: "#fd4848" },
        }}
      >
        {isGetUser && currentUserData ? (
          currentUserData.profileImage ? (
            <Avatar alt="" src={currentUserData.profileImage || ""} />
          ) : (
            <Avatar alt="Profile Picture">
              {getShortedLetter(currentUserData.fullName)}
            </Avatar>
          )
        ) : (
          <AccountCircle fontSize="large" />
        )}
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        disableScrollLock={true}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        {currentUserData ? <LoggedMenuItem /> : <NotLoggedMenuItem />}
      </Menu>
    </Box>
  );
};
