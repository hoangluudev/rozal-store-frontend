import React, { useState, useEffect } from "react";
import {
  Grid,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  Stack,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Avatar,
  Paper,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ArrowBackIos, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TextFieldComponent } from "../../components/common/Input";
import { useUserAuthApi } from "../../hooks/api";

export const LoginPage = () => {
  const { onUserSignIn } = useUserAuthApi();
  const { loginPending } = useUserAuthApi().state;

  const [showPassword, setShowPassword] = useState(false);
  const [isRememberUser, setIsRemberUser] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLoginForm, setUserLoginForm] = useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onUsernameChange = (value) => {
    setUsername(value);
    setUserLoginForm((preState) => ({
      ...preState,
      username: value,
    }));
  };
  const onPasswordChange = (value) => {
    setPassword(value);
    setUserLoginForm((preState) => ({
      ...preState,
      password: value,
    }));
  };
  const onRememberUserChange = (event) => setIsRemberUser(event.target.checked);

  const handleSubmit = () => {
    onUserSignIn(userLoginForm);
    if (isRememberUser && username) {
      const loginData = JSON.stringify({ username: username });
      localStorage.setItem("login", loginData);
    } else {
      localStorage.removeItem("login");
    }
  };
  const onEnterSubmit = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const savedUserForm = localStorage.getItem("login");
    if (savedUserForm) {
      const parsedData = JSON.parse(savedUserForm);
      if (parsedData) {
        setUsername(parsedData.username);
        setUserLoginForm((preState) => ({
          ...preState,
          username: parsedData.username,
        }));
      }
    }
  }, []);
  useEffect(() => {
    if (loginPending) {
      setPassword("");
    }
  }, [loginPending]);

  return (
    <Grid
      container
      spacing={2}
      flex
      sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Grid item xs={12}>
        <Button
          variant="text"
          size="small"
          color="primary"
          style={{ fontWeight: 600 }}
          href="/"
        >
          <ArrowBackIos /> Back to Home
        </Button>
      </Grid>
      <Grid
        item
        className="slideIn-toLeft"
        xs={12}
        md={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component={Paper}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 600,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h3"
            component={"h3"}
            fontSize={{ xs: "2rem", md: "2.5rem", lg: "3rem" }}
          >
            Login
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sign in to track your orders, save your favorite product lists, and
            unlock exclusive deals.
          </Typography>
          <TextFieldComponent
            fullWidth
            label="Username or Email"
            margin="normal"
            name="username-or-email"
            variant="outlined"
            value={username}
            onChange={onUsernameChange}
            onKeyPress={onEnterSubmit}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextFieldComponent
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onPasswordChange}
            onKeyPress={onEnterSubmit}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRememberUser}
                onChange={onRememberUserChange}
              />
            }
            label="Remember me?"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5, fontWeight: "bold", mt: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Typography variant="body2" align="left" sx={{ my: 2 }}>
            <a href="#/">Forgot Password?</a>
          </Typography>
          <Divider sx={{ my: 2 }}>
            <Typography
              variant="body2"
              style={{ textTransform: "uppercase" }}
              color="text.secondary"
            >
              or
            </Typography>
          </Divider>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <IconButton href="#/">
              <Avatar alt="" src={require("../../assets/images/google.png")} />
            </IconButton>
            <IconButton href="#/">
              <Avatar
                alt=""
                src={require("../../assets/images/facebook.png")}
              />
            </IconButton>
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="body2" color="text.secondary">
              Don't have an account?
            </Typography>
            <Link to={"/sign-up"}>
              <Button
                variant="text"
                color="primary"
                style={{ fontWeight: 600 }}
              >
                Sign up now
              </Button>
            </Link>
          </Stack>
        </Box>
      </Grid>
      <Grid
        item
        className="slideIn-toRight"
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://cdn.divineshop.vn/static/368e705d45bfc8742aa9d20dbcf4c78c.svg"
          alt="Login Visual"
          style={{ width: "100%", objectFit: "cover" }}
        />
      </Grid>
    </Grid>
  );
};
