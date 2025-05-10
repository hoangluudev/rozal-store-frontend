import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Divider,
  IconButton,
  InputAdornment,
  Container,
  Avatar,
  Stack,
} from "@mui/material";
import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import { ChangePasswordOTP } from "./dialog/ChangePasswordOTPVerify.component";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordRequestOTP,
  verifyOTPChangePassword,
} from "../../actions/userProfile.action";

export const UserSecurity = () => {
  const dispatch = useDispatch();

  const { isVerifyOTPChangePasswordValid } = useSelector(
    (reduxData) => reduxData.USER_PROFILE_REDUCERS
  );

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    noSpaces: false,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setNewPassword(value);
    validatePassword(value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validatePassword = (password) => {
    const length = password.length >= 8 && password.length <= 30;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const noSpaces = !/\s/.test(password);

    setValidation({ length, uppercase, lowercase, number, noSpaces });
  };

  const handleSubmitSendOTP = () => {
    setFormSubmitted(true);
    dispatch(changePasswordRequestOTP(newPassword, confirmPassword));
  };
  const handleSubmitVerifyOTP = () => {
    dispatch(verifyOTPChangePassword(newPassword, otpCode));
  };

  const getAvatarColor = (isValid) => {
    return isValid ? "#4BB543" : "#E0E0E0";
  };

  React.useEffect(() => {
    if (isVerifyOTPChangePasswordValid) {
      setFormSubmitted(false);
      setNewPassword("");
      setConfirmPassword("");
      setValidation({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        noSpaces: false,
      });
    }
  }, [isVerifyOTPChangePasswordValid]);
  return (
    <Box>
      <Typography className="fw-bold" variant="h6" component="h6">
        Security
      </Typography>
      <Divider style={{ margin: "1rem 0", opacity: 1 }} />
      <Box>
        <Typography
          variant="h6"
          component="h6"
          style={{ fontSize: 16, fontWeight: 700 }}
        >
          Change Password
        </Typography>
        <Grid container flexDirection={"row"} spacing={2}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              error={!newPassword && formSubmitted}
              helperText={!newPassword && formSubmitted ? "*Required" : ""}
              label="New Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              size="small"
              value={newPassword}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              size="small"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ChangePasswordOTP
              onSubmitSendOTPRequest={handleSubmitSendOTP}
              onOTPCodeChange={setOtpCode}
              onVerifyOTPRequest={handleSubmitVerifyOTP}
            />
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            style={{ padding: "0 1rem", opacity: 1 }}
            flexItem
          />
          <Grid item xs={12} sm={5}>
            <Typography
              variant="body1"
              style={{ fontSize: 14, fontWeight: 700 }}
              gutterBottom
            >
              Your password must :
            </Typography>
            <Container style={{ textTransform: "capitalize" }}>
              {[
                {
                  label: "at least 8 characters long",
                  isValid: validation.length,
                },
                {
                  label: "at least one uppercase letter",
                  isValid: validation.uppercase,
                },
                {
                  label: "at least one lowercase letter",
                  isValid: validation.lowercase,
                },
                { label: "at least one number", isValid: validation.number },
                {
                  label: "not contain any spaces",
                  isValid: validation.noSpaces,
                },
              ].map((item, index) => (
                <Stack
                  key={index}
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={1}
                  style={{ paddingBottom: 10 }}
                >
                  <Avatar
                    sx={{
                      width: 26,
                      height: 26,
                      bgcolor: getAvatarColor(item.isValid),
                    }}
                  >
                    <Check />
                  </Avatar>
                  <Typography
                    variant="body1"
                    style={{ fontSize: 14, fontWeight: 700 }}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              ))}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
