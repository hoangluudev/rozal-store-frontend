import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
} from "@mui/material";
import { convertToCurrency } from "../../../../utils/formatting";

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "12px",
  padding: "8px",
  color: theme.palette.text.primary,
}));

const OrderSummary = ({ orderData }) => {
  const subtotal = orderData?.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = orderData?.shipping?.method?.cost || 0;

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <CustomTableCell>
              {`Merchandise Subtotal (${orderData?.items?.length} items)`}
            </CustomTableCell>
            <CustomTableCell align="right">
              {convertToCurrency(subtotal || 0)}
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell>Shipping Fee</CustomTableCell>
            <CustomTableCell align="right">
              {convertToCurrency(shippingFee)}
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CustomTableCell style={{ fontWeight: "bold" }}>
              Total
            </CustomTableCell>
            <CustomTableCell align="right" style={{ fontWeight: "bold" }}>
              {convertToCurrency(orderData?.totalAmount || 0)}
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderSummary;
