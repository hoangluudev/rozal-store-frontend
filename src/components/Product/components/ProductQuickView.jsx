import React from "react";
import { IconButtonComponent } from "../../common/UI";
import { Close, NavigateNext, Search } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductDetailSection from "../ProductDetail";

const ProductQuickView = ({
  product = {},
  productDetailUrl,
  handleHideOverlay,
}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isLaptopBp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClickOpen = () => {
    setOpen(true);
    handleHideOverlay();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButtonComponent
        icon={<Search />}
        hoverColor="primary"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        disableScrollLock
        fullScreen={!isLaptopBp}
        maxWidth="md"
      >
        <DialogTitle>
          <Typography>Product Detail</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ scrollbarWidth: "thin" }}>
          <ProductDetailSection
            selectedProductData={product}
            shoppingCartUrl="/shopping-cart"
          />
        </DialogContent>
        <DialogActions>
          <Link href={productDetailUrl + product?.productCode}>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Typography>View full product details</Typography>
              <NavigateNext color="primary" />
            </Stack>
          </Link>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductQuickView;
