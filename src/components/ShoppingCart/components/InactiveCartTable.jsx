import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Typography,
  Chip,
  Button,
  Table,
  styled,
  tableCellClasses,
  TableContainer,
} from "@mui/material";
import { convertToCurrency } from "../../../utils/formatting";
import { AvatarComponent, LinkComponent } from "../../common/UI";
import { DeleteOneConfirmComponent } from "../../common/Dialog/DeleteConfirm/SingleDeleteConfirm";

const CustomTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}:first-of-type`]: {
    opacity: 1,
  },
  [`&.${tableCellClasses.body}:last-of-type`]: {
    opacity: 1,
  },
  whiteSpace: "nowrap",
  overflow: "hidden",
  maxWidth: "200px",
  opacity: 0.3,
  padding: "4px",
}));

const InactiveCartTable = ({
  cartData = [],
  productDetailUrl,
  onDelete,
  pending,
}) => {
  const calculateTotal = (price, quantity) => price * quantity;

  return (
    <TableContainer>
      <Table sx={{ width: "100%" }}>
        <TableBody>
          {cartData.map((item) => (
            <TableRow key={item?._id}>
              <CustomTableCell>
                <Stack flexDirection="row" alignItems="center" columnGap={1}>
                  <Chip label={item?.status} color="default" size="small" />
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    columnGap={1}
                    sx={{
                      opacity: 0.3,
                    }}
                  >
                    <AvatarComponent
                      src={item?.image}
                      sx={{ width: 80, height: 80 }}
                    />
                    <Stack
                      flexDirection="column"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <LinkComponent to={productDetailUrl + item?.productCode}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
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
                  </Stack>
                </Stack>
              </CustomTableCell>
              <CustomTableCell>
                {item?.price && item?.comparePrice ? (
                  item?.comparePrice !== item?.price ? (
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      columnGap={1}
                    >
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
              </CustomTableCell>
              <CustomTableCell>{item?.quantity}</CustomTableCell>
              <CustomTableCell>
                <Typography fontSize="0.8rem" fontWeight={600} color="error">
                  {item?.price && item?.quantity
                    ? convertToCurrency(
                        calculateTotal(item?.price, item?.quantity)
                      )
                    : 0}
                </Typography>
              </CustomTableCell>
              <CustomTableCell>
                <Stack flexDirection="row" alignItems="center">
                  <DeleteOneConfirmComponent
                    handleSubmit={() => onDelete(item?._id)}
                    pending={pending}
                  />
                </Stack>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InactiveCartTable;
