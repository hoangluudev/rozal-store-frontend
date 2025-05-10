import React from "react";
import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import useToast from "../../../hooks/useNotifications";
import {
  TypographyComponent,
  MediaCarousel,
  PaperComponent,
} from "../../common/UI";
import { FormFieldComponent } from "../../common/Layout";
import { useVariations } from "../../../hooks/useVariation";
import VariantRadioButton from "./VariantRadioButton";
import QuantityAdjustToggle from "./QuantityAdjustToggle";
import ProductRateAndSoldInfo from "./RateAndSoldCount";
import ProductLoading from "./ProductLoading";
import {
  convertToCurrency,
  getDiscountPercenage,
  isEmptyObj,
} from "../../../utils/formatting";
import { useShoppingCartApi } from "../../../hooks/api";

const ProductDetailSection = ({
  selectedProductData,
  shoppingCartUrl = "#",
}) => {
  const { createCartItem } = useShoppingCartApi();
  const { addCartItemSuccess } = useShoppingCartApi().state;

  const { sendMsgInfo } = useToast();
  const [variantOptions, selectedVariant, setSelectedVariant] =
    useVariations(selectedProductData);

  let initialCartData = {
    variants: [],
    quantity: 1,
    price: 0,
    comparePrice: 0,
    stock: 0,
  };

  const [formData, setFormData] = React.useState(initialCartData);
  const [requestDataObj, setRequestDataObj] = React.useState({
    productCode: "",
    quantity: 1,
  });
  const [isSelectedAllVariants, setIsSelectedVariants] = React.useState(false);
  const [isActionBuyButton, setActionBuyButton] = React.useState(false);

  const handleVariantChange = (index, optionName, optionValue) => {
    const initializedVariants = selectedProductData.variantOptions.map(
      (option) => ({
        name: option.optionName,
        value: "",
      })
    );
    const updatedVariants = initializedVariants.map((variant, i) =>
      i === index
        ? { name: optionName, value: optionValue }
        : formData.variants[i] || variant
    );

    setFormData((prevState) => ({
      ...prevState,
      variants: updatedVariants,
      quantity: 1,
    }));
    setRequestDataObj((prevState) => ({
      ...prevState,
      variants: updatedVariants,
      quantity: 1,
    }));

    const isSelectVariantEmpty = updatedVariants.some(
      (variant) => variant.value === ""
    );

    let isSelectAllVariants =
      updatedVariants.length === selectedProductData.variantOptions.length &&
      !isSelectVariantEmpty;

    if (isSelectAllVariants) {
      const matchedVariation = selectedProductData.variations.find(
        (variation) =>
          variation.variants.every(
            (variant, index) =>
              variant.name === updatedVariants[index].name &&
              variant.value === updatedVariants[index].value
          )
      );

      if (matchedVariation) {
        setFormData((prevState) => ({
          ...prevState,
          price: matchedVariation.price,
          comparePrice: matchedVariation.comparePrice,
          image: matchedVariation.image,
          stock: matchedVariation.quantity,
        }));
      }
    }
  };
  const onVariationChange = (name, value) => {
    const newState = {
      ...selectedVariant,
      [name]: { name: name, value: value },
    };

    if (!value) {
      delete newState[name];
    }

    setSelectedVariant(newState);
  };
  const handleQuantityChange = (qty) => {
    let stockQuantity = formData.stock;
    let newQuantity = qty;
    if (qty > 0 && qty <= stockQuantity) {
      setFormData((prevState) => ({
        ...prevState,
        quantity: newQuantity,
      }));
      setRequestDataObj((prevState) => ({
        ...prevState,
        quantity: newQuantity,
      }));
    }
  };
  const handleSubmitAddToCart = () => {
    if (!isSelectedAllVariants) {
      sendMsgInfo("Please select variants!");
      return;
    }
    createCartItem(requestDataObj);
  };
  const handleSubmitBuytNow = () => {
    handleSubmitAddToCart();
    setActionBuyButton(true);
  };
  React.useEffect(() => {
    if (selectedProductData && selectedProductData.variantOptions) {
      const isSelectVariantEmpty = formData.variants.some(
        (variant) => variant.value === ""
      );

      let isSelectAllVariants =
        formData.variants.length ===
          selectedProductData.variantOptions.length && !isSelectVariantEmpty;

      setIsSelectedVariants(isSelectAllVariants);
    }
  }, [formData.variants, selectedProductData]);
  React.useEffect(() => {
    if (!isSelectedAllVariants) {
      setFormData((prevState) => ({
        ...prevState,
        price: selectedProductData?.prices?.price || 0,
        comparePrice: selectedProductData?.prices?.comparePrice || 0,
        stock: selectedProductData?.stock || 0,
      }));
    }
  }, [isSelectedAllVariants, selectedProductData]);
  React.useEffect(() => {
    if (selectedProductData) {
      setRequestDataObj((prevState) => ({
        ...prevState,
        productCode: selectedProductData?.productCode || "",
      }));
    }
  }, [selectedProductData]);
  React.useEffect(() => {
    if (isActionBuyButton && addCartItemSuccess) {
      window.location.href = shoppingCartUrl;
    }
  }, [addCartItemSuccess, isActionBuyButton, shoppingCartUrl]);
  return (
    <React.Fragment>
      {isEmptyObj(selectedProductData) ? (
        <ProductLoading />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <MediaCarousel
              images={
                selectedProductData &&
                selectedProductData.avatarImage &&
                selectedProductData.images
                  ? [
                      selectedProductData.avatarImage,
                      ...selectedProductData.images,
                    ]
                  : []
              }
              imageProps={{
                sx: {
                  maxHeight: { xs: 300, sm: 400 },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <TypographyComponent
              xs="1rem"
              sm="1.2rem"
              md="1.4rem"
              sx={{ fontWeight: 600 }}
            >
              {selectedProductData?.name ? selectedProductData.name : "..."}
            </TypographyComponent>
            <ProductRateAndSoldInfo
              rateScore={selectedProductData?.rate?.score}
              rateCount={selectedProductData?.rate?.count}
              soldCount={selectedProductData?.sale}
            />
            <PaperComponent color={"action"} spacing={2}>
              {formData.comparePrice !== formData.price &&
              selectedProductData?.prices ? (
                <Stack
                  flexDirection={{ sx: "column", sm: "row" }}
                  alignItems={{ sx: "flex-start", sm: "center" }}
                  columnGap={1}
                >
                  <TypographyComponent
                    xs="0.7rem"
                    sm="0.8rem"
                    md="0.9rem"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                    }}
                  >
                    {convertToCurrency(formData.comparePrice)}
                  </TypographyComponent>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    columnGap={1}
                  >
                    <TypographyComponent
                      xs="1rem"
                      sm="1.2rem"
                      md="1.4rem"
                      color="error"
                      sx={{ fontWeight: 600 }}
                    >
                      {convertToCurrency(formData.price)}
                    </TypographyComponent>
                    <Chip
                      label={`${getDiscountPercenage(
                        formData.price,
                        formData.comparePrice
                      )} OFF`}
                      variant="filled"
                      color="error"
                      size="small"
                      sx={{ fontSize: "12px", fontWeight: 700 }}
                    />
                  </Stack>
                </Stack>
              ) : (
                <TypographyComponent
                  xs="1rem"
                  sm="1.2rem"
                  md="1.4rem"
                  color="error"
                  sx={{ fontWeight: 600 }}
                >
                  {convertToCurrency(formData.price)}
                </TypographyComponent>
              )}
            </PaperComponent>

            {["Sold Out", "Discontinued", "Coming Soon"].includes(
              selectedProductData.status
            ) ? (
              <>
                {selectedProductData.status === "Sold Out" && (
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "error",
                    }}
                  >
                    Sold out
                  </Typography>
                )}
                {selectedProductData.status === "Discontinued" && (
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "error",
                    }}
                  >
                    Discontinued
                  </Typography>
                )}
                {selectedProductData.status === "Coming Soon" && (
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "text.secondary",
                    }}
                  >
                    Coming soon
                  </Typography>
                )}
              </>
            ) : (
              <>
                {selectedProductData &&
                  variantOptions &&
                  Object.keys(variantOptions).map((optionName, index) => (
                    <FormFieldComponent
                      label={optionName}
                      isColumn
                      my={1}
                      titleProps={{
                        style: {
                          fontSize: "14px",
                          fontWeight: 600,
                        },
                      }}
                      key={index}
                    >
                      <VariantRadioButton
                        isArrayString={true}
                        value={formData?.variants[index]?.value || ""}
                        onChange={(value) => {
                          handleVariantChange(index, optionName, value);
                          onVariationChange(optionName, value);
                        }}
                        options={variantOptions[optionName].options}
                      />
                    </FormFieldComponent>
                  ))}
                <FormFieldComponent
                  label={"Quantity"}
                  isColumn
                  my={1}
                  titleProps={{
                    style: {
                      fontSize: "14px",
                      fontWeight: 600,
                    },
                  }}
                >
                  <Grid container alignItems={"center"} columnGap={1}>
                    <Grid item xs="auto">
                      <QuantityAdjustToggle
                        value={formData.quantity}
                        onChange={handleQuantityChange}
                        maxStock={formData.stock}
                      />
                    </Grid>
                    <Grid item xs="auto">
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "text.secondary",
                        }}
                      >
                        {formData.stock + " pieces available"}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormFieldComponent>

                {/* Buttons */}
                <Grid container mt={3}>
                  <Grid container item xs={12} sm={"auto"} gap={2}>
                    <Grid container item xs={12}>
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        width={"100%"}
                        columnGap={1}
                      >
                        <Button
                          fullWidth
                          variant="outlined"
                          color="error"
                          onClick={handleSubmitAddToCart}
                          startIcon={<AddShoppingCartOutlined />}
                        >
                          Add to Cart
                        </Button>
                        <Button variant="outlined" color="error">
                          <FavoriteBorder color="error" />
                        </Button>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={handleSubmitBuytNow}
                        startIcon={<ShoppingCartCheckout />}
                      >
                        Buy Now
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default ProductDetailSection;
