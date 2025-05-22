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
  styled,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  createFilterOptions,
  Chip,
  Switch,
  Typography,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { ProductFormDescription } from "../../product_props/props/ProductDescription.component";
import { useProductManagementApi } from "@/hooks/api";

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

export const EditProductForm = ({ onChange, selectedProductData }) => {
  const { productCategoryLists, productBrandLists } =
    useProductManagementApi().state;

  const gSelectedProduct = selectedProductData || {};

  const initialCategoryList = productCategoryLists || [];
  const initialBrandList = productBrandLists || [];

  const filter = createFilterOptions();

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");

  const [stockQuantity, setStockQuantity] = React.useState("");
  const [stockStatus, setStockStatus] = React.useState("Out Of Stock");
  const [buyPrice, setBuyPrice] = React.useState("");
  const [promotionPrice, setPromotionPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [forGender, setForGender] = React.useState("");
  const [isPopular, setIsPopular] = React.useState(false);
  const [sizes, setSizes] = React.useState([]);
  const [colors, setColors] = React.useState([]);

  const [isOnPromotion, setIsOnPromotion] = React.useState(false);
  const [isUseURLImage, setIsUseURLImage] = React.useState(false);

  const onChangeImageURL = (event) => {
    let value = event.target.value;
    setImgUrl(value);
    onChange((prevState) => ({
      ...prevState,
      imgUrl: value,
    }));
  };
  const onChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
        onChange((preState) => ({
          ...preState,
          imgUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const onNameChange = (event) => {
    let value = event.target.value;
    setName(value);
    onChange((prevState) => ({
      ...prevState,
      name: value,
    }));
  };
  const onCategoryChange = (newValue) => {
    if (!newValue) {
      setCategory(newValue);
      onChange((prevState) => ({
        ...prevState,
        category: "",
      }));
      return;
    }
    setCategory(newValue);
    onChange((prevState) => ({
      ...prevState,
      category: newValue,
    }));
  };
  const onBrandChange = (newValue) => {
    if (!newValue) {
      setBrand(newValue);
      onChange((prevState) => ({
        ...prevState,
        brand: "",
      }));
      return;
    }
    setBrand(newValue);
    onChange((prevState) => ({
      ...prevState,
      brand: newValue,
    }));
  };
  const onStockQuantityChange = (event) => {
    let value = event.target.value;
    if (!value) {
      setStockQuantity(value);
      onChange((prevState) => ({
        ...prevState,
        stockQuantity: "",
      }));
      return;
    }
    let gFormatValue = parseFloat(value);
    setStockQuantity(gFormatValue);
    onChange((prevState) => ({
      ...prevState,
      stockQuantity: gFormatValue,
    }));
  };
  const onStockStatusChange = (event) => {
    let value = event.target.value;
    setStockStatus(value);
    onChange((prevState) => ({
      ...prevState,
      stockStatus: value,
    }));
  };
  const onBuyPriceChange = (event) => {
    let value = event.target.value;
    if (!value) {
      if (isOnPromotion === false) {
        setPromotionPrice(value);
        onChange((prevState) => ({
          ...prevState,
          promotionPrice: isOnPromotion === false ? "" : promotionPrice,
        }));
      }
      setBuyPrice(value);
      onChange((prevState) => ({
        ...prevState,
        buyPrice: "",
      }));
      return;
    }
    let gFormatValue = parseFloat(value);
    setBuyPrice(gFormatValue);
    onChange((prevState) => ({
      ...prevState,
      buyPrice: gFormatValue,
    }));
    if (isOnPromotion === false) {
      setPromotionPrice(value);
      onChange((prevState) => ({
        ...prevState,
        promotionPrice: isOnPromotion === false ? gFormatValue : promotionPrice,
      }));
    }
  };
  const onPromotionPriceChange = (event) => {
    let value = event.target.value;
    if (!value) {
      setPromotionPrice(value);
      onChange((prevState) => ({
        ...prevState,
        promotionPrice: "",
      }));
      return;
    }
    let gFormatValue = parseFloat(value);
    setPromotionPrice(gFormatValue);
    onChange((prevState) => ({
      ...prevState,
      promotionPrice: gFormatValue,
    }));
  };
  const onDescriptionChange = (data) => {
    setDescription(data);
    onChange((prevState) => ({
      ...prevState,
      description: data,
    }));
  };
  const onGenderChange = (event) => {
    let value = event.target.value;
    setForGender(value);
    onChange((prevState) => ({
      ...prevState,
      forGender: value,
    }));
  };
  const onIsPopularChange = (event) => {
    let value = event.target.checked;
    setIsPopular(value);
    onChange((prevState) => ({
      ...prevState,
      isPopular: value,
    }));
  };
  const onSizeChange = (newValue) => {
    if (!newValue) {
      setSizes(newValue);
      onChange((prevState) => ({
        ...prevState,
        size: "",
      }));
      return;
    }
    setSizes(newValue);
    onChange((prevState) => ({
      ...prevState,
      size: newValue,
    }));
  };
  const onColorChange = (newValue) => {
    if (!newValue) {
      setColors(newValue);
      onChange((prevState) => ({
        ...prevState,
        color: "",
      }));
      return;
    }
    setColors(newValue);
    onChange((prevState) => ({
      ...prevState,
      color: newValue,
    }));
  };

  React.useEffect(() => {
    if (selectedProductData) {
      setName(gSelectedProduct.name);
      setCategory(gSelectedProduct.category);
      setBrand(gSelectedProduct.brand);
      setImgUrl(gSelectedProduct.imgUrl);
      setStockQuantity(gSelectedProduct.stockQuantity);
      setStockStatus(gSelectedProduct.stockStatus);
      setBuyPrice(gSelectedProduct.buyPrice);
      setPromotionPrice(gSelectedProduct.promotionPrice);
      setDescription(gSelectedProduct.description);
      setForGender(gSelectedProduct.forGender);
      setSizes(gSelectedProduct.size);
      setColors(gSelectedProduct.color);
      setIsPopular(gSelectedProduct.isPopular);
    }
    if (gSelectedProduct.promotionPrice !== gSelectedProduct.buyPrice) {
      setIsOnPromotion(true);
    }
  }, [
    gSelectedProduct.brand,
    gSelectedProduct.buyPrice,
    gSelectedProduct.category,
    gSelectedProduct.color,
    gSelectedProduct.description,
    gSelectedProduct.forGender,
    gSelectedProduct.imgUrl,
    gSelectedProduct.isPopular,
    gSelectedProduct.name,
    gSelectedProduct.promotionPrice,
    gSelectedProduct.size,
    gSelectedProduct.stockQuantity,
    gSelectedProduct.stockStatus,
    selectedProductData,
  ]);

  return (
    <Grid
      style={{ marginTop: "1rem" }}
      container
      item
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid container item xs={12} md={12} spacing={3}>
        <Grid
          container
          item
          xs={12}
          md={6}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <FormControlLabel
            control={
              <Switch
                color="warning"
                onChange={() => {
                  setIsUseURLImage(!isUseURLImage);
                  setImgUrl("");
                }}
              />
            }
            label="Use URL Image instead?"
          />
          <Avatar
            alt=""
            src={
              imgUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }
            variant="square"
            sx={{ width: 150, height: 150 }}
          />
          {isUseURLImage ? (
            <TextField
              className="mt-3"
              value={imgUrl}
              name="imageURL"
              onChange={onChangeImageURL}
              fullWidth
              label="Image URL"
              size="small"
              variant="filled"
            />
          ) : (
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
                onChange={onChangeImage}
              />
            </Button>
          )}
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              error={!name ? true : false}
              helperText={!name ? "*required" : ""}
              value={name}
              name="productName"
              onChange={onNameChange}
              fullWidth
              label="Name"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Autocomplete
              freeSolo
              options={initialCategoryList || []}
              value={category}
              name="category"
              getOptionLabel={(string) => string.toUpperCase()}
              onChange={(event, value) => {
                let gValue = value || "";
                onCategoryChange(gValue.toUpperCase());
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="filled"
                  error={!category ? true : false}
                  helperText={!category ? "*required" : ""}
                />
              )}
              filterOptions={(options, params) => {
                const { inputValue } = params;
                const filtered = filter(options, params);
                if (inputValue !== "" && filtered.length === 0) {
                  return [inputValue];
                }
                return filtered;
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              freeSolo
              options={initialBrandList || []}
              value={brand}
              name="category"
              getOptionLabel={(string) => string.toUpperCase()}
              onChange={(event, value) => {
                let gValue = value || "";
                onBrandChange(gValue.toUpperCase());
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="filled"
                  error={!brand ? true : false}
                  helperText={!brand ? "*required" : ""}
                />
              )}
              filterOptions={(options, params) => {
                const { inputValue } = params;
                const filtered = filter(options, params);
                if (inputValue !== "" && filtered.length === 0) {
                  return [inputValue];
                }
                return filtered;
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={forGender}
                label="Gender"
                onChange={onGenderChange}
              >
                <MenuItem value={"men"}>Men</MenuItem>
                <MenuItem value={"women"}>Women</MenuItem>
                <MenuItem value={"unisex"}>Unisex</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            error={!buyPrice ? true : false}
            helperText={!buyPrice ? "*required" : ""}
            value={buyPrice}
            name="buyPrice"
            onChange={onBuyPriceChange}
            fullWidth
            type="number"
            label="Buy Price"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isOnPromotion}
                onChange={() => {
                  setIsOnPromotion(!isOnPromotion);
                  setPromotionPrice("");
                  onChange((prevState) => ({
                    ...prevState,
                    promotionPrice: buyPrice,
                  }));
                }}
              />
            }
            label="Is On Promotion ?"
          />
          <TextField
            disabled={isOnPromotion ? false : true}
            value={promotionPrice}
            name="promotionPrice"
            onChange={onPromotionPriceChange}
            fullWidth
            type="number"
            label="Promotion Price"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            error={stockQuantity === "" ? true : false}
            helperText={stockQuantity === "" ? "*required" : ""}
            value={stockQuantity}
            name="stockQuantity"
            onChange={onStockQuantityChange}
            fullWidth
            type="number"
            label="Stock Quantity"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Stock Status</InputLabel>
            <Select
              value={stockStatus}
              label="Stock Status"
              onChange={onStockStatusChange}
            >
              <MenuItem value={"In Stock"}>In Stock</MenuItem>
              <MenuItem value={"Out Of Stock"}>Out Of Stock</MenuItem>
              <MenuItem value={"Low On Stock"}>Low On Stock</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            fullWidth
            value={sizes}
            options={["S", "M", "L", "XL"].map((string) => string)}
            freeSolo
            onChange={(event, value) => {
              const uppercaseValue = value.map((option) =>
                option.toUpperCase()
              );
              onSizeChange(uppercaseValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Sizes"
                placeholder="more sizes..."
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            fullWidth
            value={colors}
            options={[""].map((string) => string)}
            freeSolo
            onChange={(event, value) => {
              const uppercaseValue = value.map((option) =>
                option.toUpperCase()
              );
              onColorChange(uppercaseValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Colors"
                placeholder="more colors..."
              />
            )}
          />
        </Grid>
        <Grid container item xs={12}>
          <ProductFormDescription
            editorData={description}
            onChange={onDescriptionChange}
          />
          {!description ? (
            <Typography color="error">*required</Typography>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox checked={isPopular} onChange={onIsPopularChange} />
            }
            label="Is Popular"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
