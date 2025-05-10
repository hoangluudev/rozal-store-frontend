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
  Box,
  Typography,
} from "@mui/material";
import { ButtonComponent } from "../common/UI";
import ShippingCard from "./components/ShippingCard";
import { convertToCurrency } from "../../utils/formatting";

import { LocalShipping } from "@mui/icons-material";
import { NoDataComponent } from "../misc/DataNotFound.component";
import { LoadingElementSmallComponent } from "../misc/LoadingElementSmall.component";
import { useCustomSearchParams } from "../../hooks/useSearchParams";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChangeShippingOption = ({
  value,
  options = [],
  selectedValue,
  onChange,
  onSubmitChange,
  pending = false,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const { setSearchParamURL } = useCustomSearchParams();
  const updateSearchParams = (newParams) => {
    setSearchParamURL(newParams);
  };
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    onSubmitChange(selectedValue);
    updateSearchParams({ selectedShippingOption: selectedValue });
    handleCloseModal();
  };

  const selectedShipping = options.find((option) => option.value === value);

  return (
    <React.Fragment>
      <Box width="100%">
        {pending || !selectedShipping ? (
          <LoadingElementSmallComponent />
        ) : options.length > 0 ? (
          <Stack flexDirection="column">
            <Stack flexDirection="row" alignItems="center" columnGap={1}>
              <LocalShipping />
              <Typography>{selectedShipping?.title}</Typography>
            </Stack>
            <Typography variant="body2" color="textSecondary">
              {`Cost: ${convertToCurrency(selectedShipping?.costPrice || 0)}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {`Delivery: ${selectedShipping?.estimatedTime?.minDay} - ${selectedShipping?.estimatedTime?.maxDay} days`}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {selectedShipping?.description}
            </Typography>
          </Stack>
        ) : (
          <NoDataComponent />
        )}

        <ButtonComponent
          fullWidth
          variant="outlined"
          size="small"
          tooltip="Change Shipping Option"
          onClick={handleClickOpenModal}
          sx={{ textTransform: "capitalize" }}
          disabled={pending || options.length === 0}
        >
          Change
        </ButtonComponent>
      </Box>

      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        fullScreen={!isTablet}
        disableScrollLock
        onClose={handleCloseModal}
      >
        <DialogTitle>Change Shipping Option</DialogTitle>
        <DialogContent
          sx={{
            px: { xs: 1, sm: 2 },
          }}
        >
          <Stack flexDirection="column" rowGap={2}>
            {options.map((option) => (
              <ShippingCard
                key={option.value}
                shippingData={option}
                selectedShippingOption={selectedValue}
                onChange={() => onChange(option.value)}
              />
            ))}
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

export default ChangeShippingOption;
