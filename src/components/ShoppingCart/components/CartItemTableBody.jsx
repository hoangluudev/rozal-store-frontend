import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Typography,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import { convertToCurrency } from "../../../utils/formatting";
import { AvatarComponent, LinkComponent } from "../../common/UI";
import QuantityAdjustToggle from "../../Product/ProductDetail/QuantityAdjustToggle";
import { DeleteOneConfirmComponent } from "../../common/Dialog/DeleteConfirm/SingleDeleteConfirm";

const CartItemTableBody = ({
  cartData = [],
  productDetailUrl,
  onQuantityChange,
  onSelectChange,
  onDelete,
  pending,
}) => {
  const calculateTotal = (price, quantity) => price * quantity;

  return (
    <TableBody>
      {cartData.map((item) => (
        <TableRow key={item?._id}>
          <TableCell padding="checkbox">
            <Checkbox
              checked={item?.isSelected}
              onChange={(e) => onSelectChange(item?._id, e.target.checked)}
              disabled={pending}
            />
          </TableCell>
          <TableCell>
            <Stack flexDirection="row" alignItems="flex-start" columnGap={1}>
              <AvatarComponent
                src={item?.image}
                sx={{ width: 80, height: 80 }}
              />
              <Box>
                <Stack flexDirection="column">
                  <LinkComponent to={productDetailUrl + item?.productCode}>
                    <Typography fontSize="14px" fontWeight={600}>
                      {item?.name}
                    </Typography>
                  </LinkComponent>
                  {item?.variants.length > 0 && (
                    <Button
                      variant="text"
                      color="inherit"
                      size="small"
                      sx={{
                        minWidth: "auto",
                        width: "max-content",
                        padding: 0,
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          color: "text.secondary",
                          textTransform: "none",
                        }}
                        fontSize="0.9rem"
                      >
                        {item?.variants
                          .map((variant) => variant.value)
                          .join(", ")}
                      </Typography>
                    </Button>
                  )}
                </Stack>
              </Box>
            </Stack>
          </TableCell>
          <TableCell>
            {item?.price && item?.comparePrice ? (
              item?.comparePrice !== item?.price ? (
                <Stack flexDirection="row" alignItems="center" columnGap={1}>
                  <Typography
                    fontSize="0.8rem"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                    }}
                  >
                    {convertToCurrency(item?.comparePrice)}
                  </Typography>
                  <Typography fontSize="0.8rem">
                    {convertToCurrency(item?.price)}
                  </Typography>
                </Stack>
              ) : (
                <Typography fontSize="0.8rem">
                  {convertToCurrency(item?.price)}
                </Typography>
              )
            ) : (
              0
            )}
          </TableCell>
          <TableCell>
            <QuantityAdjustToggle
              value={item?.quantity}
              onChange={(newQuantity) => onQuantityChange(item, newQuantity)}
              maxStock={item?.stock}
              pending={pending}
            />
          </TableCell>
          <TableCell>
            <Typography fontSize="0.8rem" fontWeight={600} color="error">
              {item?.price && item?.quantity
                ? convertToCurrency(calculateTotal(item?.price, item?.quantity))
                : 0}
            </Typography>
          </TableCell>
          <TableCell>
            <Stack flexDirection="row" alignItems="center">
              <DeleteOneConfirmComponent
                handleSubmit={() => onDelete(item?._id)}
                pending={pending}
              />
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CartItemTableBody;
