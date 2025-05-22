import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import AddressForm from "../UserProfile/forms/AddressForm.component";
import { useCurrentUserApi, useLocationApi } from "@/hooks/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddDeliveryAddressDropdown = () => {
  const { fetchCity, fetchDistrict, fetchWard } = useLocationApi();
  const { createUserAddress } = useCurrentUserApi();
  const { createUserAddressSuccess } = useCurrentUserApi().state;

  const [isOpenDialog, setOpenDialog] = React.useState(false);
  const initialFormData = {
    fullName: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    label: "",
    isDefault: false,
  };
  const initialAddress = {
    province_name: "",
    district_name: "",
    ward_name: "",
  };

  const [requestData, setRequestData] = React.useState({});
  const [formData, setFormData] = React.useState(initialFormData);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [addressData, setAddressData] = React.useState(initialAddress);

  const onInputChange = (data) => {
    setRequestData(data);
    setFormData(data);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onAddressChange = (name, value) => {
    switch (name) {
      case "city":
        onInputChange((prevState) => ({
          ...prevState,
          city: value ? value.province_name : "",
          district: "",
          ward: "",
        }));
        setAddressData({
          province_name: value ? value.province_name : "",
          district_name: "",
          ward_name: "",
        });
        if (value) {
          fetchDistrict(value);
        }
        break;
      case "district":
        onInputChange((prevState) => ({
          ...prevState,
          district: value ? value.district_name : "",
          ward: "",
        }));
        setAddressData((prevData) => ({
          ...prevData,
          district_name: value ? value.district_name : "",
          ward_name: "",
        }));
        if (value) {
          fetchWard(value);
        }
        break;
      case "ward":
        onInputChange((prevState) => ({
          ...prevState,
          ward: value ? value.ward_name : "",
        }));
        setAddressData((prevData) => ({
          ...prevData,
          ward_name: value ? value.ward_name : "",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    createUserAddress(requestData);
  };

  React.useEffect(() => {
    if (createUserAddressSuccess) {
      setRequestData({});
      setFormData({
        fullName: "",
        phone: "",
        city: "",
        district: "",
        ward: "",
        address: "",
        label: "",
        isDefault: false,
      });
      setAddressData({ province_name: "", district_name: "", ward_name: "" });
      setFormSubmitted(false);
      handleCloseDialog();
    }
  }, [createUserAddressSuccess]);
  React.useEffect(() => {
    if (isOpenDialog) {
      fetchCity();
    }
  }, [fetchCity, isOpenDialog]);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<Add />}
        onClick={handleOpenDialog}
        sx={{
          textTransform: "capitalize",
        }}
      >
        Add New Address
      </Button>
      <Dialog
        open={isOpenDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        disableScrollLock
        maxWidth={"sm"}
        onClose={handleCloseDialog}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          New address
        </DialogTitle>
        <DialogContent>
          <AddressForm
            formData={formData}
            formSubmitted={formSubmitted}
            onChange={onInputChange}
            addressData={addressData}
            onAddressChange={onAddressChange}
            isDialogOpen={isOpenDialog}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddDeliveryAddressDropdown;
