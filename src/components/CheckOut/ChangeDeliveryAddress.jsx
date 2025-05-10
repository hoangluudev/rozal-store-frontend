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
import { useDispatch } from "react-redux";
import { ButtonComponent } from "../common/UI";
import DeliveryAddressCard from "./components/DeliveryAddressCard";
import AddDeliveryAddressDropdown from "./AddDeliveryAddress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChangeDeliveryAddress = ({
  options = [],
  value,
  onChange,
  onSubmitChange,
  pending = false,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOnChange = (value) => {
    onChange(value);
  };
  const handleSubmit = () => {
    onSubmitChange(value);
    handleCloseModal();
  };

  React.useEffect(() => {
    if (pending) {
      handleCloseModal();
    }
  }, [dispatch, pending]);
  return (
    <React.Fragment>
      <ButtonComponent
        variant="text"
        size="small"
        tooltip="Change Address"
        onClick={handleClickOpenModal}
        sx={{ textTransform: "capitalize" }}
      >
        Change
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
            {options.map((address) => (
              <DeliveryAddressCard
                key={address._id}
                addressData={address}
                selectedAddressId={value}
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
