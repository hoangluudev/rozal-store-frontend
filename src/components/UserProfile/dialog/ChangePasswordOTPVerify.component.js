import * as React from "react";
import {
  Dialog,
  DialogContent,
  Slide,
  Button,
  Stack,
  Typography,
  Link,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useCurrentUserApi } from "@/hooks/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ChangePasswordOTP = ({
  onSubmitSendOTPRequest,
  onOTPCodeChange,
  onVerifyOTPRequest,
}) => {
  const { requestChangePasswordResponse, isVerifyOTPChangePasswordValid } =
    useCurrentUserApi().state;

  const [isOpenModal, setOpenModal] = React.useState(false);

  const theme = useTheme();
  const isSMViewportUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [otpCode, setOtpCode] = React.useState("");
  const [expireTime, setExpireTime] = React.useState(300);

  const handleOTPChange = (newValue) => {
    setOtpCode(newValue);
    onOTPCodeChange(newValue);
  };
  const handleSubmitRequestOTP = () => {
    onSubmitSendOTPRequest();
  };
  const handleResendOTPCode = () => {
    onSubmitSendOTPRequest();
  };
  const handleVerifyOTPCode = () => {
    onVerifyOTPRequest();
  };

  React.useEffect(() => {
    if (requestChangePasswordResponse) {
      let interval;
      if (expireTime > 0) {
        interval = setInterval(() => {
          setExpireTime((prev) => prev - 1);
        }, 1000);
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [requestChangePasswordResponse, expireTime]);

  React.useEffect(() => {
    if (requestChangePasswordResponse) {
      handleOpenModal();
      setExpireTime(requestChangePasswordResponse.expiredIn);
    }
    if (isVerifyOTPChangePasswordValid) {
      setOtpCode("");
      handleCloseModal();
    }
  }, [isVerifyOTPChangePasswordValid, requestChangePasswordResponse]);
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "1rem" }}
        onClick={handleSubmitRequestOTP}
      >
        Save Change
      </Button>
      <Dialog
        open={isOpenModal}
        fullWidth
        maxWidth={"xs"}
        disableScrollLock={true}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="change-password-verification"
      >
        <DialogContent style={{ padding: isSMViewportUp ? "3rem" : "1rem" }}>
          <Container>
            <Stack flexDirection={"column"} alignItems={"center"} spacing={2}>
              <Typography
                variant="h5"
                component={"h5"}
                fontSize={{ xs: "1rem", sm: "1.2rem", lg: "1.5rem" }}
                style={{ fontWeight: 600 }}
              >
                Enter Verification Code
              </Typography>
              <Typography variant="body1" color="textSecondary" align="center">
                {requestChangePasswordResponse &&
                requestChangePasswordResponse.message
                  ? requestChangePasswordResponse.message
                  : "Loading..."}
              </Typography>
              <MuiOtpInput
                value={otpCode}
                length={6}
                autoFocus
                TextFieldsProps={{
                  type: "number",
                  inputProps: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  },
                }}
                style={{ gap: "5px" }}
                onChange={handleOTPChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleVerifyOTPCode}
              >
                Verify
              </Button>
              <Typography variant="body2" color="textSecondary">
                Didn't receive the code?{" "}
                <Link href="#" onClick={handleResendOTPCode}>
                  Send code again
                </Link>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {expireTime === 0 ? (
                  <>OTP code has expired!</>
                ) : (
                  <>
                    Expired in: <b>{expireTime}s</b>
                  </>
                )}
              </Typography>
            </Stack>
          </Container>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
