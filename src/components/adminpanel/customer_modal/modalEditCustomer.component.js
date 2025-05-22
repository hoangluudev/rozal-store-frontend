import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  Avatar,
} from "@mui/material";
import { EditNote, CloudUpload } from "@mui/icons-material";
import useUserManagementApi from "@/hooks/api/useUserManagementApi";

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

export const ModalEditCustomer = ({ userData }) => {
  const { updateUserByID } = useUserManagementApi();
  const { updateCustomerPending } = useUserManagementApi().state;

  const gSelectedUser = userData || {};
  const [openModal, setOpenModal] = React.useState(false);
  const [userFormData, setUserFormData] = React.useState({});

  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setUserFormData((preState) => ({
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
    setUserFormData((preState) => ({
      ...preState,
      fullName: gValue,
    }));
  };
  const onEmailChange = (event) => {
    let gValue = event.target.value;
    setEmail(event.target.value);
    setUserFormData((preState) => ({
      ...preState,
      email: gValue,
    }));
  };
  const onPhoneChange = (event) => {
    let gValue = event.target.value;
    setPhone(event.target.value);
    setUserFormData((preState) => ({
      ...preState,
      phone: gValue,
    }));
  };
  const onGenderChange = (event) => {
    let gValue = event.target.value;
    setGender(event.target.value);
    setUserFormData((preState) => ({
      ...preState,
      gender: gValue,
    }));
  };

  const handleSubmit = () => {
    updateUserByID(userFormData, gSelectedUser.id);
  };
  React.useEffect(() => {
    if (userData) {
      setProfileImage(gSelectedUser.profileImage);
      setGender(gSelectedUser.gender);
      setFullname(gSelectedUser.fullName);
      setEmail(gSelectedUser.email);
      setPhone(gSelectedUser.phone);
    }
  }, [
    gSelectedUser.email,
    gSelectedUser.fullName,
    gSelectedUser.gender,
    gSelectedUser.phone,
    gSelectedUser.profileImage,
    userData,
  ]);
  React.useEffect(() => {
    if (updateCustomerPending) {
      handleCloseModal();
    }
  }, [updateCustomerPending]);

  return (
    <React.Fragment>
      <Button variant="contained" color="info" onClick={handleClickOpenModal}>
        <EditNote />
      </Button>
      <Dialog fullWidth open={openModal} onClose={handleCloseModal}>
        <DialogTitle className="text-center">
          <Typography variant="h5" component={"div"}>
            Edit Customer Info
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container style={{ marginTop: "1rem" }} spacing={3}>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid container item xs={12} justifyContent={"center"}>
                <Avatar
                  alt=""
                  src={profileImage}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={fullname}
                onChange={onFullnameChange}
                fullWidth
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
                <Select value={gender} label="Gender" onChange={onGenderChange}>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
