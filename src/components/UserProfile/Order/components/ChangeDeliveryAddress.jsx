import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeliveryAddressCard from "../../../CheckOut/components/DeliveryAddressCard";
import AddDeliveryAddressDropdown from "../../../CheckOut/AddDeliveryAddress";
import { ButtonComponent } from "../../../common/UI";
import { useCurrentUserApi, useOrderApi } from "../../../../hooks/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChangeDeliveryAddress = ({
  orderCode,
  currentDeliveryAddressId,
  ButtonProps = {},
}) => {
  const { fetchUserAddress } = useCurrentUserApi();
  const { updateOrderDeliveryAddress } = useOrderApi();

  const {
    currentUserData,
    userAddressData,
    createUserAddressSuccess,
    updateUserAddressSuccess,
  } = useCurrentUserApi().state;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));

  const [openModal, setOpenModal] = React.useState(false);
  const [requestDataObj, setRequestDataObj] = React.useState({
    newAddressId: "",
  });

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOnChange = (value) => {
    setRequestDataObj({ newAddressId: value });
  };
  const handleSubmit = () => {
    updateOrderDeliveryAddress(requestDataObj, orderCode);
    handleCloseModal();
  };

  React.useEffect(() => {
    if (currentDeliveryAddressId) {
      handleOnChange(currentDeliveryAddressId);
    }
  }, [currentDeliveryAddressId]);
  React.useEffect(() => {
    if (createUserAddressSuccess || updateUserAddressSuccess) {
      handleCloseModal();
    }
  }, [createUserAddressSuccess, updateUserAddressSuccess]);
  React.useEffect(() => {
    if (
      openModal &&
      (currentUserData || createUserAddressSuccess || updateUserAddressSuccess)
    ) {
      fetchUserAddress();
    }
  }, [
    fetchUserAddress,
    currentUserData,
    createUserAddressSuccess,
    updateUserAddressSuccess,
    openModal,
  ]);
  return (
    <React.Fragment>
      <ButtonComponent
        variant="outlined"
        color="error"
        size="small"
        onClick={handleClickOpenModal}
        sx={{ textTransform: "capitalize" }}
        {...ButtonProps}
      >
        Change Address
      </ButtonComponent>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        fullScreen={!isTablet}
        disableScrollLock
        onClose={handleCloseModal}
      >
        <DialogTitle>Change Delivery Address</DialogTitle>
        <DialogContent>
          <Stack flexDirection="column" rowGap={2}>
            {userAddressData.map((address) => (
              <DeliveryAddressCard
                key={address._id}
                addressData={address}
                selectedAddressId={requestDataObj.newAddressId}
                onChangeAddress={() => handleOnChange(address._id)}
              />
            ))}
            <AddDeliveryAddressDropdown />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            color="inherit"
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="error"
            sx={{ textTransform: "capitalize" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default ChangeDeliveryAddress;
