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
import { useSelector } from "react-redux";
import { ProductFormDescription } from "./ProductDescription.component";

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

export const CreateProductForm = ({ onChange, formSubmitted }) => {
  const { productCategoryLists, productBrandLists, createProductResponse } =
    useSelector((reduxData) => reduxData.PRODUCTS_ADMIN_REDUCERS);
  const initialCategoryList = productCategoryLists || [];
  const initialBrandList = productBrandLists || [];

  const filter = createFilterOptions();

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");

  const [stockQuantity, setStockQuantity] = React.useState(0);
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

  const resetForm = () => {
    setName("");
    setCategory("");
    setBrand("");
    setImgUrl("");
    setStockQuantity(0);
    setStockStatus("Out Of Stock");
    setBuyPrice("");
    setPromotionPrice("");
    setDescription("");
    setForGender("");
    setIsPopular(false);
    setSizes([]);
    setColors([]);
    setIsOnPromotion(false);
    setIsUseURLImage(false);
  };
  React.useEffect(() => {
    if (!formSubmitted && createProductResponse) {
      resetForm();
    }
  }, [createProductResponse, formSubmitted]);
  return (
    <Grid container spacing={2}>
      <Grid
        container
        item
        xs={12}
        md={6}
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <Grid item>
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
        </Grid>
        <Grid item>
          <Avatar
            alt=""
            src={
              imgUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }
            variant="square"
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item>
          {!imgUrl && formSubmitted && (
            <Typography color="error" fontSize="12px">
              *required
            </Typography>
          )}
        </Grid>
        <Grid item>
          {isUseURLImage ? (
            <TextField
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
      </Grid>
      <Grid container item xs={12} md={6} spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={!name && formSubmitted}
            helperText={!name && formSubmitted ? "*required" : ""}
            value={name}
            name="productName"
            onChange={onNameChange}
            fullWidth
            label="Name"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={initialCategoryList}
            value={category}
            onChange={(event, value) =>
              onCategoryChange(value ? value.toUpperCase() : "")
            }
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="filled"
                error={!category && formSubmitted}
                helperText={!category && formSubmitted ? "*required" : ""}
              />
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
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
            options={initialBrandList}
            value={brand}
            onChange={(event, value) =>
              onBrandChange(value ? value.toUpperCase() : "")
            }
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brand"
                variant="filled"
                error={!brand && formSubmitted}
                helperText={!brand && formSubmitted ? "*required" : ""}
              />
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
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
            <Select value={forGender} label="Gender" onChange={onGenderChange}>
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="unisex">Unisex</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            error={!buyPrice && formSubmitted}
            helperText={!buyPrice && formSubmitted ? "*required" : ""}
            value={buyPrice}
            name="buyPrice"
            onChange={onBuyPriceChange}
            fullWidth
            type="number"
            label="Buy Price"
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
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Out Of Stock">Out Of Stock</MenuItem>
              <MenuItem value="Low On Stock">Low On Stock</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isOnPromotion}
                onChange={() => {
                  setIsOnPromotion(!isOnPromotion);
                  setPromotionPrice("");
                  onChange((prevState) => ({
                    ...prevState,
                    promotionPrice: "",
                  }));
                }}
              />
            }
            label="Is On Promotion ?"
          />
          <TextField
            disabled={!isOnPromotion}
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
            error={!stockQuantity && formSubmitted}
            helperText={!stockQuantity && formSubmitted ? "*required" : ""}
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
          <Autocomplete
            multiple
            fullWidth
            value={sizes}
            options={["S", "M", "L", "XL"]}
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
            options={[]}
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
      </Grid>
      <Grid container item xs={12}>
        <ProductFormDescription
          editorData={description}
          onChange={onDescriptionChange}
        />
        {!description && formSubmitted ? (
          <Typography color="error">*required</Typography>
        ) : (
          <></>
        )}
      </Grid>
      <Grid container item xs={12} spacing={2}>
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
