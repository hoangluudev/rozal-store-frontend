import * as React from "react";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";
import { CloudUpload, Visibility, VisibilityOff } from "@mui/icons-material";

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
const textFieldStyles = {
  "& .MuiInputBase-input": {
    fontSize: { xs: "0.875rem", md: "1.125rem" },
  },
  "& .MuiInputLabel-root": {
    fontSize: { xs: "0.875rem", md: "1rem" },
  },
  "& .MuiFormHelperText-root": {
    fontSize: { xs: "0.625rem", md: "0.875rem" },
  },
};

export const CreateFormInput = ({ onChange, formSubmitted }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [fullName, setFullname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setBirthDate("");
    setFullname("");
    setGender("");
    setPhone("");
    setProfileImage("");
    setShowPassword(false);
  };

  React.useEffect(() => {
    if (!formSubmitted) {
      resetForm();
    }
  }, [formSubmitted]);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        onChange((prevState) => ({
          ...prevState,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (setter, name) => (event) => {
    const { value } = event.target;
    setter(value);
    onChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={3} sx={{ marginTop: 2 }}>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid
          container
          item
          xs={12}
          md={6}
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            alt=""
            src={profileImage}
            sx={{
              width: { xs: 100, md: 150 },
              height: { xs: 100, md: 150 },
            }}
          />
          <Button
            className="mt-3"
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
        <Grid container item xs={12} md={6} spacing={3}>
          <Grid item xs={12}>
            <TextField
              error={!username && formSubmitted}
              helperText={!username && formSubmitted ? "*required" : ""}
              value={username}
              name="username"
              onChange={handleChange(setUsername, "username")}
              fullWidth
              label="Username"
              variant="outlined"
              sx={textFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!email && formSubmitted}
              helperText={!email && formSubmitted ? "*required" : ""}
              value={email}
              name="email"
              onChange={handleChange(setEmail, "email")}
              fullWidth
              label="Email"
              variant="outlined"
              sx={textFieldStyles}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!password && formSubmitted}
              helperText={!password && formSubmitted ? "*required" : ""}
              value={password}
              name="password"
              onChange={handleChange(setPassword, "password")}
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="start"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          error={!fullName && formSubmitted}
          helperText={!fullName && formSubmitted ? "*required" : ""}
          value={fullName}
          name="fullName"
          onChange={handleChange(setFullname, "fullName")}
          fullWidth
          label="Full Name"
          variant="outlined"
          sx={textFieldStyles}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          error={!phone && formSubmitted}
          helperText={!phone && formSubmitted ? "*required" : ""}
          value={phone}
          name="phone"
          onChange={handleChange(setPhone, "phone")}
          fullWidth
          label="Phone"
          variant="outlined"
          sx={textFieldStyles}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          type="date"
          value={birthDate}
          name="birthDate"
          onChange={handleChange(setBirthDate, "birthDate")}
          fullWidth
          label="Birth Date"
          sx={textFieldStyles}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel sx={textFieldStyles}>Gender</InputLabel>
          <Select
            value={gender}
            name="gender"
            label="Gender"
            onChange={handleChange(setGender, "gender")}
            sx={textFieldStyles}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
