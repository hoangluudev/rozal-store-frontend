import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Rating,
  useTheme,
  useMediaQuery,
  Paper,
  Checkbox,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  CardMediaComponent,
  DividerComponent,
  LinkComponent,
} from "../../../common/UI";
import { getRatingColor } from "../../../../utils/helperFunctions";
import { formatDatetime } from "../../../../utils/formatting";
import { useRatingApi } from "../../../../hooks/api";

export const ViewProductRatingDialog = ({
  open,
  onClose,
  ratingData,
  item,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Product Rating</DialogTitle>
      <DialogContent>
        <ProductItem itemData={item} />
        <DividerComponent
          sx={{
            my: 2,
          }}
        />
        <Box
          sx={{
            p: 1,
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            columnGap={1}
            sx={{
              maxWidth: "100%",
            }}
          >
            <Avatar alt="" src={item?.user?.profileImage} />
            <Typography
              fontSize={{ xs: "12px", sm: "14px" }}
              fontWeight={600}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              maxWidth={200}
            >
              {ratingData.isAnonymous
                ? getAnonymousUsername(item?.user?.username || "")
                : item?.user?.username}
            </Typography>
          </Stack>
          <Stack flexDirection={"row"} alignItems="center" columnGap={2}>
            <Rating
              name="read-only"
              value={ratingData.score}
              size="small"
              readOnly
            />

            <Typography
              sx={{
                fontSize: 10,
                color: "text.secondary",
              }}
            >
              {formatDatetime(ratingData.updatedAt)}
            </Typography>
          </Stack>

          <Typography sx={{ fontSize: 12 }}>{ratingData.content}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export const ProductRatingDialog = ({
  open,
  onClose,
  item = null,
  orderCode = "",
}) => {
  const theme = useTheme();

  const { createProductRating } = useRatingApi();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [requestDataObj, setRequestDataObj] = React.useState({
    orderCode: orderCode,
    score: 5,
    content: "",
    isAnonymous: false,
  });

  const handleDataChange = (name, value) => {
    setRequestDataObj((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("requestDataObj: ", requestDataObj);
    // onClose();
    // createProductRating(requestDataObj, item.productCode);
  };
  // console.log("orderCode: ", orderCode);
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={fullScreen}>
      <DialogContent>
        <ProductItem itemData={item} />
        <HoverRating
          value={requestDataObj.score}
          onChange={(value) => handleDataChange("score", value)}
        />
        <Paper
          sx={{
            p: 2,
            bgcolor: "#f2f2f2",
          }}
        >
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={8}
            placeholder="Share more thoughts on the product to help other buyers."
            value={requestDataObj.content}
            onChange={(e) => handleDataChange("content", e.target.value)}
            color="success"
            inputProps={{
              maxLength: 500,
              sx: {
                "&::placeholder": {
                  fontSize: "14px",
                },
              },
            }}
          />
        </Paper>
        <FormControlLabel
          control={
            <Checkbox
              checked={requestDataObj.isAnonymous}
              onChange={(e) =>
                handleDataChange("isAnonymous", e.target.checked)
              }
              color="primary"
            />
          }
          label={
            <div>
              <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
                Show username on your review
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "12px",
                }}
              >
                {` Your username will be shown as ${
                  requestDataObj.isAnonymous
                    ? getAnonymousUsername(item?.user?.username || "")
                    : item?.user?.username
                }`}
              </Typography>
            </div>
          }
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProductItem = ({ itemData = null, productDetailUrl = "" }) => {
  return (
    <Stack flexDirection="row" columnGap={2}>
      <CardMediaComponent
        image={itemData?.image}
        title={itemData?.name}
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: "0.5rem",
          maxWidth: "60px",
          maxHeight: "60px",
        }}
      />
      <Box width="100%">
        <Stack
          flexDirection="row"
          alignItems={{ xs: "flex-start", sm: "center" }}
          columnGap={1}
        >
          <LinkComponent
            to={productDetailUrl + itemData?.productCode}
            underline="hover"
          >
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: 600,
              }}
            >
              {itemData?.name}
            </Typography>
          </LinkComponent>
        </Stack>

        <Button
          variant="text"
          size="small"
          color="inherit"
          sx={{ textTransform: "capitalize", textAlign: "left" }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
            }}
          >
            {"Variations: " +
              itemData?.variants
                ?.map((variant) => `${variant.value}`)
                .join(", ")}
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};
const HoverRating = ({ value = 0, onChange = null }) => {
  const [hover, setHover] = React.useState(-1);

  return (
    <Stack flexDirection="row" alignItems="center" sx={{ my: 2 }}>
      <Typography
        fontSize={{ xs: "12px", sm: "14px" }}
        sx={{
          minWidth: { sm: "200px" },
        }}
      >
        Product quality:
      </Typography>
      <Stack flexDirection="row" justifyContent="center" alignItems="center">
        <Rating
          name="hover-feedback"
          size="small"
          value={value}
          precision={1}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          icon={
            <StarIcon
              fontSize="inherit"
              sx={{
                color: getRatingColor(hover !== -1 ? hover : value),
              }}
            />
          }
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Typography
            fontSize={{ xs: "12px", sm: "14px" }}
            color={getRatingColor(hover !== -1 ? hover : value)}
            sx={{ fontWeight: 600, ml: 2 }}
          >
            {labels[hover !== -1 ? hover : value]}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
const labels = {
  1: "Terrible",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Amazing",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
function getAnonymousUsername(str) {
  if (str.length === 0) return "";
  return `${str.charAt(0)}******${str.charAt(str.length - 1)}`;
}
