import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { IconButtonComponent } from "../../common/UI";
import AddressForm from "../forms/AddressForm.component";
import { isEmptyObj } from "../../../utils/formatting";
import { useCurrentUserApi, useLocationApi } from "@/hooks/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditUserAddressDialog = ({ selectedAddressData }) => {
  const { fetchCity, fetchDistrict, fetchWard } = useLocationApi();
  const { updateUserAddress } = useCurrentUserApi();
  const { updateUserAddressPending } = useCurrentUserApi().state;

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
    updateUserAddress(requestData, selectedAddressData._id);
  };

  React.useEffect(() => {
    if (updateUserAddressPending) {
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
  }, [updateUserAddressPending]);
  React.useEffect(() => {
    if (isOpenDialog) {
      fetchCity();
    }
  }, [fetchCity, isOpenDialog]);
  React.useEffect(() => {
    if (!isEmptyObj(selectedAddressData)) {
      setFormData(selectedAddressData);
      setAddressData({
        province_name: selectedAddressData ? selectedAddressData.city : "",
        district_name: selectedAddressData ? selectedAddressData.district : "",
        ward_name: selectedAddressData ? selectedAddressData.ward : "",
      });
    }
  }, [selectedAddressData]);
  return (
    <React.Fragment>
      <IconButtonComponent
        icon={<EditOutlined />}
        hoverColor="primary"
        onClick={handleOpenDialog}
        tooltipTitle="Edit"
        sx={{
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      />
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
          Edit address
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditUserAddressDialog;
