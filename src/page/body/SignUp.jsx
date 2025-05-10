import React, { useState } from "react";
import {
  Grid,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Visibility,
  VisibilityOff,
  ArrowBackIos,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TextFieldComponent } from "../../components/common/Input";
import { useUserAuthApi } from "../../hooks/api";

export const SignUpPage = () => {
  const { onUserSignUp } = useUserAuthApi();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onUserSignUp(formData);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Grid item xs={12}>
        <Button
          variant="text"
          size="small"
          color="primary"
          style={{ fontWeight: 600 }}
          component={Link}
          to="/login"
        >
          <ArrowBackIos /> Back to Login
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        className="slideIn-toLeft"
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          className="w-100 object-fit-cover"
          src="https://cdn.divineshop.vn/static/235dccb09069e3d4eebc6227236f9dc2.svg"
          alt=""
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        className="slideIn-toRight"
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
            component="h3"
            fontSize={{ xs: "2rem", md: "2.5rem", lg: "3rem" }}
          >
            Sign Up
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Sign up to track your orders, save your favorite product lists, and
            unlock exclusive deals.
          </Typography>
          <TextFieldComponent
            fullWidth
            label="Username"
            margin="normal"
            name="username"
            variant="outlined"
            value={formData.username}
            onChange={(value) => handleChange("username", value)}
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
            label="Email"
            margin="normal"
            name="email"
            variant="outlined"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Email />
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
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextFieldComponent
            fullWidth
            label="Confirm Password"
            margin="normal"
            name="confirm-password"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={(value) => handleChange("confirmPassword", value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5, fontWeight: "bold", mt: 2 }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            By creating an account, you agree to our{" "}
            <a href="#/">Terms of Service</a>.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
