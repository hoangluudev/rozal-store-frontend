import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  styled,
} from "@mui/material";
import { EditNote, CloudUpload } from "@mui/icons-material";
import { useCurrentUserApi } from "../../../hooks/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const EditUserInfoModal = ({ userData, onChange, onClickSubmit }) => {
  const { currentUserData, updateUserInfoPending } = useCurrentUserApi().state;

  const UserInfo = userData || {};

  const [openUserDialog, setOpenUserDialog] = React.useState(false);

  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");

  const handleClickOpenDialog = () => {
    setOpenUserDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenUserDialog(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        onChange((preState) => ({
          ...preState,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const onFullnameChange = (event) => {
    let gValue = event.target.value;
    setFullname(event.target.value);
    onChange((preState) => ({
      ...preState,
      fullName: gValue,
    }));
  };
  const onEmailChange = (event) => {
    let gValue = event.target.value;
    setEmail(event.target.value);
    onChange((preState) => ({
      ...preState,
      email: gValue,
    }));
  };
  const onPhoneChange = (event) => {
    let gValue = event.target.value;
    setPhone(event.target.value);
    onChange((preState) => ({
      ...preState,
      phone: gValue,
    }));
  };
  const onGenderChange = (event) => {
    let gValue = event.target.value;
    setGender(event.target.value);
    onChange((preState) => ({
      ...preState,
      gender: gValue,
    }));
  };
  const onBirthDateChange = (event) => {
    let gValue = event.target.value;
    setBirthDate(event.target.value);
    onChange((preState) => ({
      ...preState,
      birthDate: gValue,
    }));
  };

  const handleSubmitUpdate = () => {
    onClickSubmit();
  };
  React.useEffect(() => {
    if (currentUserData) {
      setGender(UserInfo.gender);
      setFullname(UserInfo.fullName);
      setProfileImage(UserInfo.profileImage);
      setEmail(UserInfo.email);
      setPhone(UserInfo.phone);
      setBirthDate(UserInfo.birthDate);
    }
  }, [
    UserInfo.birthDate,
    UserInfo.email,
    UserInfo.fullName,
    UserInfo.gender,
    UserInfo.phone,
    UserInfo.profileImage,
    currentUserData,
  ]);
  React.useEffect(() => {
    if (updateUserInfoPending) {
      handleCloseDialog();
    }
  }, [updateUserInfoPending]);
  return (
    <React.Fragment>
      <Button
        fullWidth
        variant="outlined"
        color="error"
        onClick={handleClickOpenDialog}
      >
        <EditNote />
        <span style={{ marginLeft: "1rem" }}>Edit info</span>
      </Button>
      <Dialog
        open={openUserDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        disableScrollLock={true}
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          className="text-capitalize"
          textAlign={"center"}
          fontWeight={"bold"}
        >
          {"Update account information"}
        </DialogTitle>
        <DialogContent>
          <Grid container style={{ marginTop: "1rem" }} spacing={3}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid container item xs={12} justifyContent={"center"}>
                <Avatar
                  alt=""
                  src={profileImage || ""}
                  sx={{ width: 150, height: 150 }}
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} textAlign="center"></Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={fullname}
                onChange={onFullnameChange}
                fullWidth
                name="fullname"
                label="Full Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={email}
                onChange={onEmailChange}
                fullWidth
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="phone"
                value={phone}
                onChange={onPhoneChange}
                autoFocus
                fullWidth
                label="Phone"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  name="gender"
                  label="Gender"
                  onChange={onGenderChange}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="birthdate"
                type="date"
                autoFocus
                value={birthDate || ""}
                onChange={onBirthDateChange}
                fullWidth
                label="Birth Date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleSubmitUpdate}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
